function weatherData(cityName) {
  const apiKey = "4b5c9e30be2d6330c99893c75144aba1";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((response) => {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const now = new Date();
      document.getElementById("demoday").innerHTML = days[now.getDay()];
      document.getElementById("demomonth").innerHTML = months[now.getMonth()];
      document.getElementById("demodate").innerHTML = now.getDate();
      document.getElementById("demoyear").innerHTML = now.getFullYear();

      console.log(response);
      document.querySelector(".city").innerText = response.name;
      document.querySelector(".description").innerText =
        response.weather[0].description;

      document.querySelector(".temp").innerHTML =
        response.main.temp.toFixed(1) + "°C";

      document.querySelector(".iconurl").src =
        "https://openweathermap.org/img/wn/" +
        response.weather[0].icon +
        "@4x.png";

      document.querySelector(".pressure").innerText =
        response.main.pressure + " mbar";
      document.querySelector(".humidity").innerText =
        response.main.humidity + " %";
      document.querySelector(".wind").innerText = response.wind.speed + " km/h";

      // Store data in the local storage
      localStorage.city = response.name;
      localStorage.description = response.weather[0].description;
      localStorage.temp = response.main.temp + "°C";
      localStorage.iconurl =
        "https://openweathermap.org/img/wn/" +
        response.weather[0].icon +
        "@4x.png";
      localStorage.pressure = response.main.pressure + " mbar";
      localStorage.humidity = response.main.humidity + " %";
      localStorage.wind = response.wind.speed + " km/h";
      localStorage.when = Date.now();
    })
    .catch((err) => {
      console.error("Error fetching weather data:", err);
    });
}

function cityName() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").then(
        function (registration) {
          console.log("ServiceWorker registration successful");
        },
        function (err) {
          console.log("ServiceWorker registration failed:", err);
        }
      );
    });
  }

  // Retrieve the city name from the search bar
  let city = document.querySelector(".search-bar").value;
  if (city === "") {
    city = "panauti"; // Default city if search bar is empty
  }

  // Call the weatherData function with the city name
  weatherData(city);
}

// Initial call to display weather data for the default or entered city
cityName();

// Event listener for Enter key press in the search bar
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      cityName();
    }
  });

// Event listener for the search button click
document.querySelector(".search-button").addEventListener("click", cityName);
