import { appState } from "../AppState.js";
import { ToDo } from "../Models/ToDo.js";
import { toDoService } from "../Services/ToDoService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML, setText } from "../Utils/Writer.js";

function _drawToDoes() {
  console.log("drawing todoes");
  const toDo = appState.toDoes;
  let template = "";
  toDo.forEach((td) => (template += td.ToDoTemplate));
  setHTML("todos", template);
  let uncompletedCount = appState.toDoes.filter((un) => !un.completed).length;
  setText("total", uncompletedCount);
}

export class ToDoController {
  constructor() {
    // console.log('hello');
    appState.on("toDoes", _drawToDoes);
    this.viewToDoes();
  }

  viewToDoes() {
    this.getToDoes();
    setHTML("form", ToDo.ToDoForm());
  }

  async getToDoes() {
    try {
      await toDoService.getToDoes();
    } catch (error) {
      console.error(error);
      Pop.error(error);
    }
  }

  async createToDo() {
    try {
      window.event.preventDefault();
      // console.log('creating to do')
      const form = window.event.target;
      const formData = {
        // @ts-ignore
        description: form.elements["add-to-do"].value,
        user: "anastasiia",
      };

      console.log(formData);
      await toDoService.createToDo(formData);
      // @ts-ignore
      form.reset();
      Pop.toast("Successfully created", "success", "top-start");
    } catch (error) {
      console.error(error);
      Pop.error(error);
    }
  }

  async deleteToDo(toDoId) {
    try {
      // Pop.confirm("Are you sure?");
      if (await Pop.confirm("Are you sure?")){
        await toDoService.deleteToDo(toDoId);
    }
    } catch (error) {
      console.error(error);
      Pop.error(error);
    }
  }

  async completeToDo(toDoId) {
    try {
      window.event.stopPropagation();
      toDoService.completeToDo(toDoId);
    } catch (error) {
      console.error(error);
      Pop.error(error);
    }
  }
}
