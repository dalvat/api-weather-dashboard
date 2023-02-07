let searchButton = $('#search-button');
let searchHistoryDiv = $('#search-history');
let resultsH2 = $('#results-h2');
let forecastH2 = $('#forecast-h2');
let resultsDiv = $('#results')
let forecastDiv = $('#forecast')
let forecastCards = $('#forecast-cards')

let placeHistory = [];
let latHistory = [];
let lonHistory = [];

function init() {
  searchHistoryDiv.empty();
  let storedPlaces = JSON.parse(localStorage.getItem('search-names'));
  let storedLats = JSON.parse(localStorage.getItem('search-lats'));
  let storedLons = JSON.parse(localStorage.getItem('search-lons'));
  if(storedPlaces !== null) {
    placeHistory = storedPlaces;
    latHistory = storedLats;
    lonHistory = storedLons;
    for (let i = 0; i < 5; i++) {
      if (placeHistory[i] !== undefined) {
        let button = $('<button>');
        button.text(placeHistory[i]);
        $('#search-h3').removeClass('hide');
        button.addClass('btn');
        button.attr('id', 'history-button')
        button.attr('data-lat', latHistory[i]);
        button.attr('data-lon', lonHistory[i]);
        searchHistoryDiv.append(button);
      };
    }
  };
}

init();

searchButton.on('click', function(event) {
  event.preventDefault();

  let searchInput = $('#search-input').val();

  let queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&appid=b6c7b90383a5acddfe0378a95dc96066";
  
  $.ajax({
    type: "GET",
    url: queryURL,
    datatype: "json",
    async: false,
    success: dataRequest,
  }) .then(function(data) {
    console.log(data);
    let name = data[0].name;
    let lat = data[0].lat;
    let lon = data[0].lon;
    placeHistory.unshift(name);
    latHistory.unshift(lat);
    lonHistory.unshift(lon);
    localStorage.setItem('search-names', JSON.stringify(placeHistory));
    localStorage.setItem('search-lats', JSON.stringify(latHistory));
    localStorage.setItem('search-lons', JSON.stringify(lonHistory));
    init();
  })
})

function dataRequest(response){
  let lon = response[0].lon;
  let lat = response[0].lat;

  let queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?lat="
  + lat
  + "&lon="
  + lon
  + "&units=metric&appid=b6c7b90383a5acddfe0378a95dc96066";

  $.ajax({
    url: queryURL2,
    method: "GET"
  }) .then(function(response2) {
    resultsDiv.empty();
    console.log(response2);

    let h2 = $('<h2>');
    let iconDiv = $('<div>');
    let icon = $('<img>');
    let iconText1 = $('<p>');
    let iconText2 = $('<p>');
    let temp = $('<p>');
    let humidity = $('<p>');
    let windSpeed = $('<p>');
    let iconName = response2.list[0].weather[0].icon;
    let iconUrl = "http://openweathermap.org/img/wn/" + iconName + ".png";
    icon.attr('src', iconUrl);
    iconDiv.attr('id', 'icon-div');
    h2.text(response2.city.name + ", " + moment(response2.list[0].dt, "X").format("(DD/MM/YY)"));
    iconText1.text("Conditions:  ");
    iconText2.text(" " + response2.list[0].weather[0].description);
    temp.text("Temperature:  " + response2.list[0].main.temp + " °c");
    humidity.text("Humidity:  " + response2.list[0].main.humidity + " g/m³");
    windSpeed.text("Wind speed:  " + response2.list[0].wind.speed + " m/s");
    resultsDiv.append(h2);
    iconDiv.append(iconText1);
    iconDiv.append(icon);
    iconDiv.append(iconText2);
    resultsDiv.append(iconDiv);
    resultsDiv.append(temp);
    resultsDiv.append(humidity);
    resultsDiv.append(windSpeed);

    forecastCards.empty();

    let numberOfCards = [7, 15, 23, 31, 39];

    numberOfCards.forEach(function(number){
      let card = $('<div>');
      let cardBody = $('<div>');
      let cardTitle = $('<h4>');
      let cardIconDiv = $('<div>');
      let cardIcon = $('<img>');
      let cardIconText1 = $('<p>');
      let cardIconText2 = $('<p>');
      let cardTemp1 = $('<p>');
      let cardHumidity1 = $('<p>');
      let cardTemp2 = $('<p>');
      let cardHumidity2 = $('<p>');
      card.addClass('card');
      cardBody.addClass('card-body');
      cardTitle.addClass('card-title');
      cardIconText1.addClass('card-text');
      cardIconText2.addClass('card-text');
      cardTemp1.addClass('card-text');
      cardTemp2.addClass('card-text');
      cardHumidity1.addClass('card-text');
      cardHumidity2.addClass('card-text');
      cardIconDiv.attr('id', 'card-icon-div');
      cardIconText1.text("Conditions:  ");
      cardTemp1.text('Temperature:');
      cardHumidity1.text('Humidity:');

      if (number === 7) {
        cardTitle.text(moment(response2.list[7].dt, "X").format("DD/MM/YY"));
        cardIconText2.text(" " + response2.list[7].weather[0].description)
        cardTemp2.text(response2.list[7].main.temp + " °c");
        cardHumidity2.text(response2.list[7].main.humidity + " g/m³");
        let cardIconName = response2.list[7].weather[0].icon
        let cardIconUrl = "http://openweathermap.org/img/wn/" + cardIconName + ".png";
        cardIcon.attr('src', cardIconUrl);
      };

      if (number === 15) {
        cardTitle.text(moment(response2.list[15].dt, "X").format("DD/MM/YY"));
        cardIconText2.text(" " + response2.list[15].weather[0].description)
        cardTemp2.text(response2.list[15].main.temp + " °c");
        cardHumidity2.text(response2.list[15].main.humidity + " g/m³");
        let cardIconName = response2.list[15].weather[0].icon
        let cardIconUrl = "http://openweathermap.org/img/wn/" + cardIconName + ".png";
        cardIcon.attr('src', cardIconUrl);
      };

      if (number === 23) {
        cardTitle.text(moment(response2.list[23].dt, "X").format("DD/MM/YY"));
        cardIconText2.text(" " + response2.list[23].weather[0].description)
        cardTemp2.text(response2.list[23].main.temp + " °c");
        cardHumidity2.text(response2.list[23].main.humidity + " g/m³");
        let cardIconName = response2.list[23].weather[0].icon
        let cardIconUrl = "http://openweathermap.org/img/wn/" + cardIconName + ".png";
        cardIcon.attr('src', cardIconUrl);
      };

      if (number === 31) {
        cardTitle.text(moment(response2.list[31].dt, "X").format("DD/MM/YY"));
        cardIconText2.text(" " + response2.list[31].weather[0].description)
        cardTemp2.text(response2.list[31].main.temp + " °c");
        cardHumidity2.text(response2.list[31].main.humidity + " g/m³");
        let cardIconName = response2.list[31].weather[0].icon
        let cardIconUrl = "http://openweathermap.org/img/wn/" + cardIconName + ".png";
        cardIcon.attr('src', cardIconUrl);
      };

      if (number === 39) {
        cardTitle.text(moment(response2.list[39].dt, "X").format("DD/MM/YY"));
        cardIconText2.text(" " + response2.list[39].weather[0].description)
        cardTemp2.text(response2.list[39].main.temp + " °c");
        cardHumidity2.text(response2.list[39].main.humidity + " g/m³");
        let cardIconName = response2.list[39].weather[0].icon
        let cardIconUrl = "http://openweathermap.org/img/wn/" + cardIconName + ".png";
        cardIcon.attr('src', cardIconUrl);
      };

      cardIconDiv.append(cardIconText1);
      cardIconDiv.append(cardIcon);
      cardIconDiv.append(cardIconText2);
      card.append(cardTitle);
      cardBody.append(cardIconDiv);
      cardBody.append(cardTemp1);
      cardBody.append(cardTemp2);
      cardBody.append(cardHumidity1);
      cardBody.append(cardHumidity2);
      card.append(cardBody);
      forecastCards.append(card);

    });

  });
};