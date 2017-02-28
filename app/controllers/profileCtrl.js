app.controller('profileCtrl',function($scope, saveFactory, concertFactory){
    //materialize modal
    // $('#modal1').modal('');

    // $scope.userId = firebase.auth().currentUser.uid;
    // load();

    function load(){
         saveFactory.loadinMyShows(firebase.auth().currentUser.uid)
        .then((response)=>{
            console.log("response", response);
            $scope.title = response.title,
            $scope.date = response.date,
            $scope.userId = firebase.auth().currentUser.uid
            load()

        })
    }
})
