app.factory('saveFactory', ($q, authFactory, $http) => {
	return {
    savePost(title, date) {
      console.log('NEW POST')
      return authFactory.getUser()
        .then((user) => {
          return $http.post(`https://capstonecharliesconcertcrock.firebaseio.com/userPosts.json`, {
            uid: user.uid,
            title: title,
            date: date,
          })
        })
            loadinMyShows : (user)=>{
            return $http
            .get(`https://capstonecharliesconcertcrock.firebaseio.com/userPosts.json`)
            .then((data)=>{
                return data;
            })
            .catch((data)=>{
                console.error(data);
            })
        }
}
}
});
