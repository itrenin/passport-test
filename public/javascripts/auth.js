//import axios from 'axios'

//const { post } = require('../../app')

// console.log('АХИОХ!')

const baseUrl = 'http://localhost:3000/auth'

// let response
// async () =>{
//     await fetch(baseUrl)
// }

let username = document.querySelector('#login')
let password = document.querySelector('#password')
const submitButton = document.querySelector('#login-button')
const googleButton = document.querySelector('#google-button')
const vkButton = document.querySelector('#vk-button')
const ghButton = document.querySelector('#github-button')

submitButton.addEventListener('click', (e) => {
  e.preventDefault()
  console.log(username.value)
  console.log(password.value)
  sendUser(username.value, password.value, baseUrl)
  .then(setTimeout(()=>{
    window.location.href = `${baseUrl}/user`
  }),500)
})

googleButton.addEventListener('click', (e) => {
  e.preventDefault()
  console.log(e.target)
})
vkButton.addEventListener('click', (e) => {
  e.preventDefault()
  console.log(e.target)
})
ghButton.addEventListener('click', (e) => {
  e.preventDefault()
  console.log(e.target)
})

async function sendUser(log, pas, url) {
  const user = {
    email: log,
    password: pas,
  }
  await fetch(url+'/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  })
}
