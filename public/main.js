// Global Variables
let i = 0
let countDown = null

// Fetching API Data
const render = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(resp => {
      return resp.json()
    })
    .then(data1 => {
      document.querySelector('.copyright').textContent =
        'copyright: ' + data1.copyright + ' | title: ' + data1.title
      document.querySelector('.explore').style.backgroundImage =
        'url(' + data1.url + ')'
    })
  fetch('https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming')
    .then(response => {
      return response.json()
    })
    .then(data2 => {
      let allMissions = data2
      missionControl(allMissions[0].launch_date_local)
      document.querySelector('.mission-name').textContent =
        allMissions[i].mission_name
      document.querySelector('.mission-details').textContent =
        allMissions[i].details
      document.querySelector('.launch-date').textContent =
        allMissions[i].launch_date_local
      document.querySelector('.launch-site').textContent =
        allMissions[i].launch_site.site_name_long
    })
}

const main = () => {
  render()
}

/*
const fixDescription = () => {
  if (allMissions[i].details = 'null')
    document.querySelector('.mission-details').textContent = 'No description yet available'
}
*/

const missionControl = apiDate => {
  const countDownDate = new Date(apiDate).getTime()
  clearInterval(countDown)
  countDown = setInterval(function() {
    let currentDate = new Date().getTime()
    let timeToLaunch = countDownDate - currentDate
    let secs = Math.floor((timeToLaunch % (1000 * 60)) / 1000)
    let mins = Math.floor((timeToLaunch % (1000 * 60 * 60)) / (1000 * 60))
    let hours = Math.floor(
      (timeToLaunch % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    let days = Math.floor(timeToLaunch / (1000 * 60 * 60 * 24))
    document.querySelector('.launch-date').textContent =
      days +
      ' days, ' +
      hours +
      ' hours, ' +
      mins +
      ' mins, ' +
      secs +
      ' seconds'
    if (timeToLaunch < 0) {
      clearInterval(countDown)
      document.querySelector('launch-date').textContent = 'Launched!'
    }
  }, 1000)
}

// Counter Buttons
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

// Event Listeners
document
  .querySelector('#button-right')
  .addEventListener('click', cycleMissionsForward)
document
  .querySelector('#button-left')
  .addEventListener('click', cycleMissionsBackward)
document.addEventListener('DOMContentLoaded', main)
