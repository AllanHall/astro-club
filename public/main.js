const main = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(resp => {
      return resp.json()
    })
    .then(api => {
      console.log(api.url)
      document.querySelector('.explore').style.backgroundImage = `url(${
        api.url
      })`
    })
}
document.addEventListener('DOMContentLoaded', main)
