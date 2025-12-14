const apiKey = "a3eb3ed8a56efa39bb544bd314b1406d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cursor = document.querySelector(".cursor");
let timeout;

// Mouse stopped function (outside event listener)
function mouseStopped() {
    cursor.style.display = "none";
}

document.addEventListener("mousemove", (e) => {
    let x = e.pageX;
    let y = e.pageY;

    cursor.style.top = y + "px";
    cursor.style.left = x + "px";
    cursor.style.display = "block";

    // Clear existing timeout and set new one
    clearTimeout(timeout);
    timeout = setTimeout(mouseStopped, 1000);
});

document.addEventListener("mouseout", () => {
    cursor.style.display = "none";
});

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city.trim()) {
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status === 404) {
            alert("City not found! Please enter a valid city name.");
            return;
        }

        const data = await response.json();

        // Update weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon
        const weatherMain = data.weather[0].main;
        
        if (weatherMain === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherMain === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherMain === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherMain === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherMain === "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        // Show weather section
        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch weather data. Please try again.");
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});