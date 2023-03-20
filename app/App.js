import { InspireController } from "./Controllers/InspireController.js";
import { ToDoController } from "./Controllers/ToDoController.js";
// import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  // valuesController = new ValuesController();

  toDoController = new ToDoController()

  inspireController = new InspireController() 
}

window["app"] = new App();
