app.factory('firebaseFactory', function($http){
    return{
        saveToMyProfile : (user, content)=>{
            //
            return $http
            .post(`https://capstonecharliesconcertcrock.firebaseio.com/userPosts.json`, content)
            .then((data)=>{
                console.log("firebaseFactory data", res);
                return data;
            })
            .catch(()=>{
                console.error(data);
            })
        },
        loadinMyShows : (user)=>{
            return $http
            .get(`https://capstonecharliesconcertcrock.firebaseio.com/{user}.json`)
            .then((data)=>{
                console.log("firebaseFactory data", data);
                return data;
            })
            .catch((data)=>{
                console.error(data);
            })
        }
    }
})
