import { appState } from "../AppState.js"
import { ToDo } from "../Models/ToDo.js"
import { sandboxApi } from "./AxiosService.js"



class ToDoService {
  async createToDo(formData) {
    console.log('form data', formData)
    const res = await sandboxApi.post('anastasiia/todos', formData)
    console.log('creating to do', res.formData)
    const newToDo = new ToDo(res.data)
    appState.toDoes.push(newToDo)
    appState.emit('toDoes')
  }
  async getToDoes() {
    const res = await sandboxApi.get('anastasiia/todos')
    console.log('got to does', res.data)
    appState.toDoes = res.data.map(toDo => new ToDo(toDo))
    console.log(appState.toDoes)
  }

  async completeToDo(toDoId) {
    const toDo = appState.toDoes.find(td => td.id == toDoId)
    toDo.completed = !toDo.completed
    const res = await sandboxApi.put(`anastasiia/todos/${toDoId}`, toDo)
    console.log('completed!', res.data)
    appState.emit('toDoes')
  }
  
  async deleteToDo(toDoId) {
    const res = await sandboxApi.delete(`anastasiia/todos/${toDoId}`)
    // console.log('deleting to do', res.data)
    appState.toDoes = appState.toDoes.filter(td => td.id != toDoId)
  }
}

export const toDoService = new ToDoService()
