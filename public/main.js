let allmissions = []

const main = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(resp => {
      return resp.json()
    })
    .then(data1 => {
      document.querySelector('.copyright').textContent =
        data1.copyright + ' | ' + data1.title
      document.querySelector('.explore').style.backgroundImage = `url(${
        data1.url
      })`
    })
  fetch('https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming')
    .then(response => {
      return response.json()
    })
    .then(data2 => {
      let allmissions = data2
      document.querySelector('.mission-name').textContent =
        allmissions[0].mission_name
      document.querySelector('.mission-details').textContent =
        allmissions[0].details
      document.querySelector('.launch-date').textContent =
        allmissions[0].launch_date_utc
      document.querySelector('.launch-site').textContent =
        allmissions[0].launch_site.site_name_long
    })
}

document.addEventListener('DOMContentLoaded', main)
