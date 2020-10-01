import React, { useEffect, useState } from "react"
import { getAuthHref, formatTracks } from "./spotify"
import { camelize, removeHash } from "./utils"

const { accessToken, tokenType, expiresIn } = window.location.hash
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
  const [idInput, setIdInput] = useState("")

  useEffect(() => {
    if (!accessToken) return
  }, [])

  async function getAllTracks() {
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${idInput}/tracks?`,
      {
        method: "GET",
        headers: { Authorization: `${tokenType} ${accessToken}` },
      }
    ).then((res) => res.json())
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFetching(true)
    const fetchedPlaylist = await fetch(
      `https://api.spotify.com/v1/playlists/${idInput}`,
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
      console.log(res)
      fetchedPlaylist.tracks.items = [
        ...fetchedPlaylist.tracks.items,
        ...res.items,
      ]
    }

    console.log(
      fetchedPlaylist.tracks.items,
      fetchedPlaylist.tracks.items.length
    )

    //console.log(res)
    setPlaylist(fetchedPlaylist)
    setIdInput("")
    setFetching(false)
  }

  // spotify:playlist:6zWsEoJ3ziANLkqqMIUhEU

  function getCsvHref(tracks) {
    return (
      "data:text/plain;charset=utf-8," +
      encodeURIComponent(
        "Title;Artist;Code\n" +
          tracks.map(({ name, artists }) => `${name};${artists};\n`).join("")
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
          Input playlist id:
          <input
            id="playlist-input"
            type="text"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
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
