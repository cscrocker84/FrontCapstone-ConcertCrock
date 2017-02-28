app.controller('searchCtrl', function ($scope, $location, searchFactory, authFactory) {
    console.log('I am a RootCtrl')
    console.log('Current user', firebase.auth().currentUser)
    $scope.getShows = () => searchFactory.getShows($scope.zipCode)
    .then((response)=>{
            console.log("response", response);
             $scope.eventsArray = response;

        })
})
//materialize Modals below
  $('#saveButton').click(() => {
    $('#saveModal').modal('open')
  })
