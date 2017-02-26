app.factory('firebaseFactory', function($http){
    return{
        saveToMyProfile : (user, content)=>{
            //
            return $http
            .post(`https://capstonecharliesconcertcrock.firebaseio.com/posts/${user}.json`, content)
            .then((response)=>{
                console.log("firebaseFactory response", res);
                return res;
            })
            .catch((res)=>{
                console.error(res);
            })
        },
        deleteMyShows : (user, content)=>{
            //
            return $http
            .delete(`https://capstonecharliesconcertcrock.firebaseio.com/${user}/${content}.json`)
            .catch((res)=>{
                console.error(res);
            })
        },
        //loads all users media they saved
        loadinMyShows : (user)=>{
            return $http
            .get(`https://capstonecharliesconcertcrock.firebaseio.com/posts/${user}.json`)
            .then((res)=>{
                console.log("firebaseFactory res", res);
                return res;
            })
            .catch((res)=>{
                console.error(res);
            })
        }
    }
})
