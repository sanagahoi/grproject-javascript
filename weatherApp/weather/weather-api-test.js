import { WeatherApi } from "./weather-api.js";

async function testInvoke() {

    const weatherApi = new WeatherApi("India");
    weatherApi.buildUrl();

    const responseinJSON = await weatherApi.invoke();

    console.log(responseinJSON);
}
testInvoke();