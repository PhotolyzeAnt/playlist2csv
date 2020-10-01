const authEndpoint = "https://accounts.spotify.com/authorize"
const clientId = "f10fc34ec54b46fc92b4086dd5d86fcd"
const redirectUri = "http://localhost:3000/"

const scopes = ["playlist-read-private"]

export function getAuthHref() {
  return `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token`
}

export function formatTracks(inputTracks) {
  const tracks = inputTracks.items
    .filter(({ track }) => track)
    .reduce((tracksArray, { track }) => {
      tracksArray.push({
        name: track.name,
        artists: formatArtists(track.artists),
      })
      return tracksArray
    }, [])
  return tracks
}

export function formatArtists(inputArtists) {
  const artists = inputArtists.map(({ name }) => name).join(", ")
  return artists
}
