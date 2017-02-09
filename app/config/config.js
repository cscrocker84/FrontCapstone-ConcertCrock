app.config(($routeProvider, $locationProvider) => {

	// Initialize Firebase
  $locationProvider.hashPrefix('');
    firebase.initializeApp({
    apiKey: "AIzaSyDtdHAH3kQCS2jdHV96Gl7-Gsbz5FaXwu8",
    authDomain: "capstonecharliesconcertcrock.firebaseapp.com",
    databaseURL: "https://capstonecharliesconcertcrock.firebaseio.com",
    storageBucket: "capstonecharliesconcertcrock.appspot.com",
    messagingSenderId: "325860455476"
})

  $locationProvider.hashPrefix("")
  $routeProvider
  .when('/main', {
    controller: 'homeCtrl',
    templateUrl: '/app/controllers/homeView.html',
    resolve: {
      // authentication resolves from factories
    }
  })
})
