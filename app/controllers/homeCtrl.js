app.controller('homeCtrl', function($scope, $location, authFactory, concertFactory, posts, user) {

  $scope.all = posts

  // create score
  for (obj in $scope.all) {
    let u;
    let d;
    if ($scope.all[obj].upvotes === undefined) {
      u = 0;
    } else {
      u = Object.keys($scope.all[obj].upvotes).length;
    }
    if ($scope.all[obj].downvotes === undefined) {
      d = 0;
    } else {
      d = Object.keys($scope.all[obj].downvotes).length;
    }
    let score = u - d
    let key = obj
    concertFactory.updateScore(key, score)
  }

  // copy post key into post
  for (key in $scope.all) {
    if ($scope.all[key].postKey === undefined) {
      concertFactory.copyKey(key, key);
    }
  }

  // get users then loop through post and if they match then patch the username to the post
  concertFactory.getUsers()
    .then((allUsers) => {
      $scope.users = allUsers.data;
    }).then(() => {
      for (key in $scope.all) {
        for (k in $scope.users) {
          // see if post has a first name already. if so do nothing
          if ($scope.all[key].firstName === undefined) {
            if ($scope.all[key].uid === $scope.users[k].uid) {
              console.log("Tis a match!", key)
                // if match then post the firstName, lastName to the post
              let postFLName = { "firstName": $scope.users[k].firstName, "lastName": $scope.users[k].lastName };
              // patch the users first and last name to the database
              concertFactory.patchName(key, postFLName);
            }
          }
        }
      }
    })

  // onclick post the result to firebase
  $scope.upVote = (postkey) => {
    console.log('postKey', postkey)
      // get current user
    let voted = false;
    let uid;
    concertFactory.getPosts()
      .then((allPosts) => {
        $scope.all = allPosts
          // console.log("posts", $scope.all)
      })
      .then(() => {
        authFactory
          .getUser()
          .then((e) => {
            uid = e.uid;
          })
          .then(() => {
            // see if user has already upvoted or downvoted
            // loop through the postkey passed from click to find the post
            for (key in $scope.all) {
              // when the keys match, loop through the post and get the upvotes & downvotes
              if (key === postkey) {
                let obj = $scope.all[key];
                for (k1 in obj.upvotes) {
                  // console.log('k1', obj.upvotes[k1], 'uid', uid)
                  // if user upvoted then do nothing
                  if (uid === obj.upvotes[k1]) {
                    console.log('this guy already upvoted')
                    return voted = true;
                  }
                }
                for (k2 in obj.downvotes) {
                  console.log('k2', obj.downvotes[k2], 'uid', uid)
                    // if the user wants to change their downvote to an upvote then delete the downvote and add an upvote
                  if (uid === obj.downvotes[k2]) { // upvoters uid will be obj.upvotes[k]
                    console.log('delete the downvote and add an upvote, postkey & key match, k2 dv', postkey, key, k2);
                    // delete downvote
                    concertFactory.removeDownvotes(key, k2);
                    // add upvote
                    concertFactory.addUpvotes(key, uid);
                    return voted = true;
                  }
                }
              }
            }
          })
          // if user has not voted then add upvote.
          .then(() => {
            // the response will be true if user has already voted, false if they haven't
            if (voted === false) {
              for (key in $scope.all) {
                // when the keys match, loop through the post and get the upvotes & downvotes
                if (key === postkey) {
                  // console.log('keys match', key, postkey)
                  concertFactory.addUpvotes(key, uid)
                }
              }
            }
          })
      })
  };


  $scope.downVote = (postkey) => {
    console.log('postKey', postkey)
    let voted = false;
    let uid;
    concertFactory.getPosts()
      .then((allPosts) => {
        $scope.all = allPosts
          // console.log("posts", $scope.all)
      })
      .then(() => {

        authFactory
          .getUser()
          .then((e) => {
            uid = e.uid;
          })
          .then(() => {
            // see if user has already upvoted or downvoted
            // loop through the postkey passed from click to find the post
            for (key in $scope.all) {
              // when the keys match, loop through the post and get the upvotes & downvotes
              if (key === postkey) {
                let obj = $scope.all[key];
                for (k1 in obj.downvotes) {
                  // if user downvoted then do nothing
                  if (uid === obj.downvotes[k1]) {
                    console.log('this guy already downvoted')
                    return voted = true;
                  }
                }
                for (k2 in obj.upvotes) {
                  // if the user wants to change their downvote to an upvote then delete the downvote and add an upvote
                  if (uid === obj.upvotes[k2]) { // upvoters uid will be obj.upvotes[k]
                    console.log('delete the upvote and add a downvote, postkey & key match, k2 dv', postkey, key, k2);
                    // delete upvote
                    concertFactory.removeUpvotes(key, k2);
                    // add downvote
                    concertFactory.addDownvotes(key, uid);
                    return voted = true;
                  }
                }
              }
            }
          })
          // if user has not voted then add downvote.
          .then(() => {
            // the response will be true if user has already voted, false if they haven't
            if (voted === false) {
              console.log('user has not yet voted so begin the vote')
              for (key in $scope.all) {
                // when the keys match, loop through the post and get the upvotes & downvotes
                if (key === postkey) {
                  console.log('keys match', key, postkey)
                  concertFactory.addDownvotes(key, uid)
                }
              }
            }
          })
      })
  }


  //materialize Modals below
  $('#loginButton').click(() => {
    $('#loginModal').modal('open')
  })

  $('.registerButton').click(() => {
    $('#registerModal').modal('open')
  })

  $('#newPost').click(() => {
    $('#postModal').modal('open')
  })
})
