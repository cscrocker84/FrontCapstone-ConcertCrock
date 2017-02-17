app.controller('resultCtrl', function ($scope, searchFactory, authFactory) {
    console.log('Current user', user)

    $scope.artist = results.artist
    $scope.date = results.date
    $scope.venue = results.venue
    $scope.city = results.city
  })
