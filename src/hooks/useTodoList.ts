import { useEffect, useState } from "react"
import { useStorage } from "@capacitor-community/storage-react";

const TODOS_STORAGE = "yet-another-todo-list";

export enum TODOS_TYPE {
  ALL = "ALL",
  COMPLETED = "COMPLETED",
  UNCOMPLETED = "UNCOMPLETED",
}

export function useTodoList () {
  const { get, set } = useStorage()
  const [ list, setList ] = useState<Todo[]>([])

  useEffect(() => {
    const loadSaved = async () => {
      const todosString = await get(TODOS_STORAGE)
      const todo = (todosString ? JSON.parse(todosString) : []) as Todo[]
      setList(todo)
    }
    loadSaved()
  }, [get, set])

  const add = function (label: string) {
    let id = -1
    if (list.length > 0) {
      const ids = list.map(({ id }) => id)
      id = Math.max(...ids)
    }
    const newTodo = [...list, { id: id + 1, label, completed: false }]

    setList(newTodo)
    set(TODOS_STORAGE, JSON.stringify(newTodo))
  }

  const remove = function (id: number) {
    const newTodo = list.filter(todo => todo.id !== id)

    setList(newTodo)
    set(TODOS_STORAGE, JSON.stringify(newTodo))
  }

  const update = function (
    id: number,
    update: { label?: string; completed?: boolean }
  ) {
    const newTodo = list.map(todo => {
      if (id === todo.id) return { ...todo, ...update }
      return todo
    })

    setList(newTodo)
    set(TODOS_STORAGE, JSON.stringify(newTodo))
  }

  const toggle = function (id: number) {
    const todo = list.find(todo => todo.id === id)
    if (typeof todo != "undefined") {
      update(id, { completed: !todo.completed })
    }
  }

  const clear = function (type: string = TODOS_TYPE.ALL) {
    let newTodo: Todo[] = []
    switch (type) {
      case TODOS_TYPE.COMPLETED:
        newTodo = list.filter(todo => !todo.completed)
        break
      case TODOS_TYPE.UNCOMPLETED:
        newTodo = list.filter(todo => todo.completed)
        break
      case TODOS_TYPE.ALL:
      default:
        newTodo = []
        break
    }
    setList(newTodo)
    set(TODOS_STORAGE, JSON.stringify(newTodo))
  }

  return { list, add, remove, update, toggle, clear }
}

export interface Todo {
  id: number
  label: string
  completed?: boolean
}


  
  

