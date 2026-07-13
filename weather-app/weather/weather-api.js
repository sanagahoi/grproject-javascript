const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = "a608db5d6d2f226ec0b8dd58c367c54d";

class WeatherApi {

    constructor(userData) {

        this.userData = userData;
        this.apiURL = new URL(API_BASE_URL);
    }

    async invoke() {

        const urlString = this.apiURL.toString();

        const responseObj = await fetch(urlString);

        const responseinJSON = await responseObj.json();

        return responseinJSON;
    }

    buildUrl() {

        this.apiURL.searchParams.append("q", this.userData);
        this.apiURL.searchParams.append("units", "metrics");
        this.apiURL.searchParams.append("appid", API_KEY);

        console.log(`API URL is ${this.apiURL}`);
    }

}
export { WeatherApi };
