import { appState } from "../AppState.js";
import { inspireService } from "../Services/InspireService.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML, setText } from "../Utils/Writer.js";

function _drawImg() {
  // console.log('drawing img')
  let img = appState.activeImg;
  document.body.style.backgroundImage = `url(${img.largeImgUrl})`;
}

function _drawQuotes() {
  let quote = appState.activeQuote
  setHTML('quote', quote.QuoteTemplate)
}

function _drawTemperature() {
  let temperature = appState.activeWeather
  setHTML('weather', temperature.TemperatureTemplate)
}

function _drawClock() {
  const currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes().toString().padStart(2, '0');
  let meridiem = "am";
  if (hours > 12) {
    hours = hours - 12;
    meridiem = "pm";
  }
  // @ts-ignore
  hours = hours.toString().padStart(2, '0');
  const timeString = `${hours}:${minutes} ${meridiem}`;
  setText('clock', timeString);
} 

export class InspireController {
  constructor() {
    // console.log('hello from inspire');
    this.getImg();
    this.getQuote()
    this.getTemperature()
    appState.on("activeImg", _drawImg);
    appState.on('activeQuote', _drawQuotes)
    appState.on('activeWeather', _drawTemperature)
    setInterval(_drawClock, 1000);
  }

  async getImg() {
    try {
      await inspireService.getImg();
    } catch (error) {
      Pop.error(error);
    }
  }

  async getQuote() {
    try {
      await inspireService.getQuote()
    } catch (error) {
      console.error(error);
      Pop.error(error);
    }
  }

  async getTemperature() {
    try {
      await inspireService.getTemperature()
    } catch (error) {
      console.error(error);
      Pop.error(error);
    }
  }

  toggleTemperature() {
    console.log('toggle')
    inspireService.toggleTemperatureUnit()
    _drawTemperature()
  }
}

