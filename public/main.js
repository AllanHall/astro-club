const main = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(resp => {
      return resp.json()
    })
    .then(image => {
      document.querySelector('.explore').style.backgroundImage = `url(${
        image.url
      })`
    })
  fetch('https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming')
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
    })
}
document.addEventListener('DOMContentLoaded', main)
