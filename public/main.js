let allMissions = []
let i = 0

const render = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(resp => {
      return resp.json()
    })
    .then(data1 => {
      document.querySelector('.copyright').textContent =
        'copyright: ' + data1.copyright + ' | title: ' + data1.title
      document.querySelector('.explore').style.backgroundImage = `url(${
        data1.url
      })`
    })
  fetch('https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming')
    .then(response => {
      return response.json()
    })
    .then(data2 => {
      let allMissions = data2
      document.querySelector('.mission-name').textContent =
        allMissions[i].mission_name
      document.querySelector('.mission-details').textContent =
        allMissions[i].details
      document.querySelector('.launch-date').textContent =
        allMissions[i].launch_date_utc
      document.querySelector('.launch-site').textContent =
        allMissions[i].launch_site.site_name_long
    })
}

const main = () => {
  render()
}

const cycleMissionsForward = () => {
  if (i <= 24) {
    i++
    render()
  } else {
    i = 0
    render()
  }
}

const cycleMissionsBackward = () => {
  if (i > 0) {
    i--
    render()
  } else {
    i = 24
    render()
  }
}

document
  .querySelector('#button-right')
  .addEventListener('click', cycleMissionsForward)
document
  .querySelector('#button-left')
  .addEventListener('click', cycleMissionsBackward)
document.addEventListener('DOMContentLoaded', main)
