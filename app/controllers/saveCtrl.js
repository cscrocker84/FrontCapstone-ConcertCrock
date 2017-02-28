app.controller('saveCtrl', function($scope, $location, authFactory, saveFactory, concertFactory) {
  // use postid to name file
  $scope.savePost = () => {
    // get user
    // new post
    saveFactory.savePost($scope.title, $scope.date)
      .then((user) => {
        let userId = user.data.name
        let toPost = {"uid": userId, "title": $scope.firstName, "last": $scope.lastName}
        console.log('toPost', toPost);
        concertFactory.handleFiles(userId);
        console.log("great success")
      })
  }

  $('#saveModal').modal({
    dismissible: true,
    opacity: .3,
    inDuration: 700,
    outDuration: 700,
    startingTop: '0%',
    endingTop: '20%',
    ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
    },
    // complete: function() { console.log('Closed'); } // Callback for Modal close
  });
})
