import { WeatherApi } from "./weather-api.js";

class WeatherApp {

    init() {

        const searchBoxElement = document.querySelector(".search-box");

        searchBoxElement.addEventListener("keypress", this.handleSearch);

        searchBoxElement.param1 = this;
    }

    handleSearch(event) {
        if (event.keyCode == 13 || event.key == "Enter") {

            const eventTarget = event.target;
            const userData = eventTarget.value;

            const weatherObj = eventTarget.param1;

            const weatherApi = new WeatherApi(userData);

            weatherApi.buildUrl();

            weatherApi.invoke().then((response) => {

                console.log(`response is ${JSON.stringify(response)}`);

                weatherObj.updateUI(response);
            });
        }
    }

    //update UI

    updateUI(weatherResponse) {

        const cityElement = document.querySelector(".location .city");
        cityElement.innerText = `${weatherResponse.name}, ${weatherResponse.sys.country}`;


        const tempElement = document.querySelector(".current .temp");
        tempElement.innerText = `${weatherResponse.main.temp}°c`;

        const weatherStatusElement = document.querySelector(".current .weather");
        weatherStatusElement.innerText = `${weatherResponse.weather[0].main}`;

        const lowHighElement = document.querySelector(".current .low-high");
        lowHighElement.innerText = `${weatherResponse.main.temp_min}°c / ${weatherResponse.main.temp_max}°c`;

        const dateElement = document.querySelector(".location .date");
        dateElement.innerText = this.formateDate();
    }

    formateDate() {
        const today = new Date();
        const dateString = today.toLocaleDateString("en-US", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        return dateString;
    }

}
export { WeatherApp };