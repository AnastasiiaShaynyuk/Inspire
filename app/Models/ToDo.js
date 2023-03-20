export class ToDo {
  constructor(data) {
    this.id = data.id;
    this.completed = data.completed || false;
    this.description = data.description;
    this.user = data.user || "anastasiia";
  }

  get ToDoTemplate() {
    return `
    <div class="col-1">
      <input type="checkbox"  ${this.completed ? "checked" : ""} onclick="app.toDoController.completeToDo('${this.id}')">
    </div>
    <div class="col-9 text-start">
      <p>${this.description}</p>
    </div>
    <div class="col-2 text-center">
      <i class="mdi mdi-delete fs-3" onclick="app.toDoController.deleteToDo('${this.id}')" title="Delete"></i>
    </div>
    `;
  }

  static ToDoForm() {
    return `
    <div class="col-12" >
    <form class="text-start" onsubmit="app.toDoController.createToDo()">
    <label for="add-to-do" class="py-2">Add To Do</label>
    <div class="d-flex flex-row">
    <input type="text" class="form-control inline-input" name="add-to-do" id="add-to-do" required>
    <button type="submit" class="btn btn-add btn-outline-light" title="Add Task"><i class="mdi mdi-plus"></i></button>
    </div>
    </form>
    </div>`;
  }
}
