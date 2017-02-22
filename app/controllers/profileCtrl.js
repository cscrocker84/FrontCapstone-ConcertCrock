.controller('MyMediaCtrl',function($scope, firebaseFactory, concertFactory){
    //materialize modal
    $('#modal1').modal('');

    $scope.uid = firebase.auth().currentUser.uid;
    load()

    function load(){
         firebaseFactory.loadinMyMedia(firebase.auth().currentUser.uid)
        .then((res)=>{
            console.log("res", res);
            $scope.media = res.data
        })
    }
    $scope.userId = firebase.auth().currentUser.uid;

    $scope.movieId = (id, key)=>{
        console.log("id", key);
        guideboxMovieFactory.findMovieByID(id)
        .then((res)=>{
            //$scope.key = key;
            $scope.title = res.title;
            $scope.img = res.poster_240x342;
            $scope.frees = res.free_web_sources;
            $scope.subs = res.subscription_web_sources;
            $scope.purchases = res.purchase_web_sources;
            $('#modal1').modal('open')
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
