let allMissions = []

const main = () => {
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
        allMissions[0].mission_name
      document.querySelector('.mission-details').textContent =
        allMissions[0].details
      document.querySelector('.launch-date').textContent =
        allMissions[0].launch_date_utc
      document.querySelector('.launch-site').textContent =
        allMissions[0].launch_site.site_name_long
    })
}

const cycleMissionsForward = () => {
  for (let i = 0; i < allMissions.length; i++) {
    if (allMissions[i] <= 24) {
      allMissions[i] = allMissions[i++]
    } else {
      allMissions[i] = allMissions[0]
    }
  }
}

const cycleMissionsBackward = () => {
  for (let i = 0; i < allMissions.length; i++) {
    if (allMissions[i] > 0) {
      allMissions[i] = allMissions[i--]
    } else {
      allMissions[i] = allMissions[24]
    }
  }
}

document
  .querySelector('#button-left')
  .addEventListener('click', cycleMissionsBackward)
document
  .querySelector('#button-right')
  .addEventListener('click', cycleMissionsForward)
document.addEventListener('DOMContentLoaded', main)
