import React, { useState } from "react"
import { getAuthHref, formatTracks } from "./spotify"
import { camelize, removeHash } from "./utils"

const { accessToken, tokenType } = window.location.hash
  .substring(1)
  .split("&")
  .reduce((values, item) => {
    if (item) {
      const parts = item.split("=")
      values[camelize(parts[0])] = decodeURIComponent(parts[1])
    }
    return values
  }, {})

removeHash()

function App() {
  const [playlist, setPlaylist] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [input, setInput] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setFetching(true)

    const playlistId = input.split(":")[2]

    const fetchedPlaylist = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        method: "GET",
        headers: { Authorization: `${tokenType} ${accessToken}` },
      }
    ).then((res) => res.json())

    let res = fetchedPlaylist.tracks

    while (res.next) {
      res = await fetch(res.next, {
        method: "GET",
        headers: { Authorization: `${tokenType} ${accessToken}` },
      }).then((res) => res.json())

      fetchedPlaylist.tracks.items = [
        ...fetchedPlaylist.tracks.items,
        ...res.items,
      ]
    }

    setPlaylist(fetchedPlaylist)
    setInput("")
    setFetching(false)
  }

  // spotify:playlist:6zWsEoJ3ziANLkqqMIUhEU

  function getCsvHref(tracks) {
    return (
      "data:text/plain;charset=utf-8," +
      encodeURIComponent(
        "Title\tArtist\tCode\n" +
          tracks.map(({ name, artists }) => `${name}\t${artists}\t\n`).join("")
      )
    )
  }

  const formattedTracks = playlist ? formatTracks(playlist.tracks) : null

  return !accessToken ? (
    <div>
      <h1>Authorize with spotify</h1>
      <a href={getAuthHref()}>Click to authorize</a>
    </div>
  ) : (
    <div>
      <form type="submit" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="playlist-input">
          Input spotify URI:
          <input
            id="playlist-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
        </label>
        <button disabled={fetching}>Fetch playlist!</button>
      </form>
      {playlist ? (
        <div>
          <h2>{playlist.name}</h2>
          <a
            href={getCsvHref(formattedTracks)}
            download={`${playlist.name}.csv`}
          >
            Download csv
          </a>
          <table>
            <thead>
              <tr>
                <th>Song title</th>
                <th>Artists</th>
              </tr>
            </thead>
            <tbody>
              {formattedTracks.map((track, index) => (
                <tr key={index}>
                  <td>{track.name}</td>
                  <td>{track.artists}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  )
}

export default App
