import { appState } from "../AppState.js"
import { Inspire } from "../Models/Inspire.js"
import { sandboxApi } from "./AxiosService.js"


class InspireService {
  toggleTemperatureUnit() {
    const activeWeather = appState.activeWeather;
    if (activeWeather.temperatureUnit === "F") {
      activeWeather.temperatureUnit = "C";
    } else {
      activeWeather.temperatureUnit = "F";
    }
  }

  async getTemperature(city = 'Boise') {
    const res = await sandboxApi.get(`weather?city=${city}`)
    console.log('get temp', res.data);
    appState.activeWeather = new Inspire(res.data)
    console.log('appstate temp', appState.activeWeather)
  }
  async getImg() {
    const res = await sandboxApi.get('images')
    // console.log('get img', res.data)
    appState.activeImg = new Inspire(res.data)
    // console.log('appstate img', appState.activeImg)
  }
  
  async getQuote() {
    const res = await sandboxApi.get('quotes')
    appState.activeQuote = new Inspire(res.data)
    }
}

export const inspireService = new InspireService()
