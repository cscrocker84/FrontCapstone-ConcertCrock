app.controller('searchCtrl', function ($scope, $location, searchFactory, authFactory) {
    console.log('I am a RootCtrl')
    console.log('Current user', firebase.auth().currentUser)
    $scope.getShows = () => searchFactory.getShows($scope.zipCode)
    .then((response)=>{
            console.log("response", response);
             $scope.eventsArray = response;

        })
})

// artist: response.Events.Artists.Name,
//               date: response.Events.Date,
//               venue: response.Events.Venue.Name,
//               city: response.Events.Venue.City,
