let searchButton = $('#search-button');

searchButton.on('click', function(event) {
  event.preventDefault();

  let searchInput = $('#search-input').val();

  let queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&appid=b6c7b90383a5acddfe0378a95dc96066";

  $.ajax({
    url: queryURL,
    method: "GET"
  }) .then(function(response) {
  console.log(response);
    
  });

  // let queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?lat="
  // + 
  // + "&lon="
  // + 
  // + "&appid=b6c7b90383a5acddfe0378a95dc96066";

  // $.ajax({
  //   url: queryURL2,
  //   method: "GET"
  // }) .then(function(response2) {
  //   console.log(response2);
  // });
})