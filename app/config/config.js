app.config(($routeProvider, $locationProvider) => {
      firebase.initializeApp({
    apiKey: "AIzaSyDtdHAH3kQCS2jdHV96Gl7-Gsbz5FaXwu8",
    authDomain: "capstonecharliesconcertcrock.firebaseapp.com",
    databaseURL: "https://capstonecharliesconcertcrock.firebaseio.com",
    storageBucket: "capstonecharliesconcertcrock.appspot.com",
    messagingSenderId: "325860455476"
});
$locationProvider.hashPrefix("")
  $routeProvider
    .when('/main', {
      controller: 'homeCtrl',
      templateUrl: '/app/partials/homePage.html',
      resolve: {
          posts (concertFactory) {
            return concertFactory.getPosts()
          },
          user (authFactory, $location) {
            return authFactory.getUser().catch(() => {
                var $toastContent = $('<span>Please Register or Login to contribute to content </span>');
                // Materialize.toast($toastContent, 500);
                // $('#loginModal').modal('open');
              $location.url('/login')})
          },
      }
    })
    .when('/login', {
      controller: 'loginCtrl',
      templateUrl: '/app/partials/homePage.html',
    })
    .when('/register', {
      controller: 'registerCtrl',
      templateUrl: '/app/partials/homePage.html',
    })
    .when('/post', {
      controller: 'postCtrl',
      templateUrl: '/app/partials/homePage.html',
    })
      .when('/search', {
      controller: 'searchCtrl',
      templateUrl: '/app/partials/searchPage.html',
    })
      // .when('/results', {
      // controller: 'searchCtrl',
      // templateUrl: '/app/partials/results.html',
    //   // resolve: {
    //   //     results (searchFactory, $route) {
    //   //       return weatherFactory.getWeather($route.current.params.zipcode)
      //     },
    // })
      .when('/profile', {
      controller: 'profileCtrl',
      templateUrl: '/app/partials/profile.html',
    })
      .when('/logout', {
      controller: 'logoutCtrl',
      templateUrl: '/app/partials/homePage.html',
    })
    .otherwise({
      redirectTo: '/main'
    })
})
