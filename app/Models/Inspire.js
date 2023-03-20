import { inspireService } from "../Services/InspireService.js"


export class Inspire {
  constructor(data) {
    this.largeImgUrl = data.largeImgUrl
    this.id = data._id
    this.content = data.content
    this.author = data.author
    this.date = new Date()
    // this.main = data['main']['temp'];
    this.main = data.main ? data.main.temp : null
    this.temperatureUnit = 'F'
  }

  get QuoteTemplate(){
    return `
    <div class="col-12 quote-text">
          <p class="quote">${this.content}</p>
          <p class="author">${this.author}</p>
        </div>`
  }
  
  get TemperatureTemplate() {
    return `
    <h1 class='text-light' onclick="app.inspireController.toggleTemperature()">${this.temperature}</h1>
    `
  }
  
get temperature() {
  let temp = this.main;
  if (this.temperatureUnit === "C") {
    temp = (temp - 273.15).toFixed(0); 
  } else {
    temp = ((temp - 273.15) * 1.8 + 32).toFixed(0); 
  }
  return `${temp}°${this.temperatureUnit}`;
}
// toggleTemperatureUnit() {
//   this.temperatureUnit = inspireService.toggleTemperatureUnit(this.temperatureUnit);
// }
}
