app.controller('postCtrl', function($scope, $location, authFactory, concertFactory) {
  // use postid to name file
  $scope.newPost = () => {
    // get user
    // new post
    concertFactory.newPost($scope.Link, $scope.Title)
      .then((user) => {
        let userId = users.data.email
        let toPost = {"uid": userId, "first": $scope.firstName, "last": $scope.lastName}
        console.log('toPost', toPost);
        concertFactory.handleFiles(userId);
        console.log("great success")
      })
      .catch(() => $location.path('/login'))
    // put response.data.name (postkey) onto the post
  }

  $('#postModal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .3, // Opacity of modal background
    inDuration: 700, // Transition in duration
    outDuration: 700, // Transition out duration
    startingTop: '0%', // Starting top style attribute
    endingTop: '20%', // Ending top style attribute
    ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.

      // console.log(modal, trigger);
    },
    // complete: function() { console.log('Closed'); } // Callback for Modal close
  });
})
