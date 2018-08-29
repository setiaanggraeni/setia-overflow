var firebase = require('firebase')

var config = {
  apiKey: 'AIzaSyAoyqyolmiDNyvNb3-U8h_okzMR1CE4iTI',
  authDomain: 'hacktiv-overflow-setia.firebaseapp.com',
  databaseURL: 'https://hacktiv-overflow-setia.firebaseio.com',
  projectId: 'hacktiv-overflow-setia',
  storageBucket: '',
  messagingSenderId: '507184334936'
}
firebase.initializeApp(config)

var provider = new firebase.auth.FacebookAuthProvider()

var auth = firebase.auth()

export {provider, auth}
