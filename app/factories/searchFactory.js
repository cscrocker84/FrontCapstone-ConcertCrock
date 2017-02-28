app.factory('searchFactory', ($http) => {
    return {
      getShows (zipCode) {
        return $http
          .get(`http://api.jambase.com/events?zipCode=${zipCode}&api_key=4acu2b9j5h58qrc58trybpt7&o=json&limit25`)
          .then((response) => {
            console.log('response', response)
            return response.data.Events;
            // artist: response.Events.Artists.Name,
            // date: response.Events.Date,
            // venue: response.Events.Venue.Name,
            // city: response.Events.Venue.City,
}
          )},
        }
  })
