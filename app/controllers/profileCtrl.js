app.controller('profileCtrl',function($scope, firebaseFactory, searchFactory){
    //materialize modal
    // $('#modal1').modal('');

    $scope.userId = firebase.auth().currentUser.uid;
    load()

    function load(){
         firebaseFactory.loadinMyShows(firebase.auth().currentUser.uid)
        .then((response)=>{
            console.log("response", response);
            $scope.media = response.data
        })
    }
    // $scope.userId = firebase.auth().currentUser.uid;

    $scope.showId = (id, key)=>{
        console.log("id", key);
        searchFactory.getShows($scope.zipCode)
        .then((response)=>{
            $scope.key = key;
            $scope.title = response.title;
        })
    }

    $scope.deleteMedia = (id, content)=>{
        console.log("content", content);
        firebaseFactory.deleteMyMedia(id, content)
        .then((res)=>{
            console.log("text", res);
            load()
        })
    }
})

 //materialize Modals below
  $('#personalButton').click(() => {
    $('#personalModal').modal('open')
  })
