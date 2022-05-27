import { useEffect, useState } from "react";
import { useStorage } from "@capacitor-community/storage-react/dist";

const STORAGE_KEY = "todo-list";

export function UseAddTodoList() {
  const [list, setTodo] = useState([]);
  const { get, set } = useStorage();

  useEffect(() => {
    async function run() {
      const storedList = await get(STORAGE_KEY);

      if (storedList) {
        try {
          const analysisList = JSON.parse(storedList);
          setTodo(analysisList);
        } catch {}
      }
    }
    run();
  }, [get, setTodo]);

  useEffect(() => {
    set(STORAGE_KEY, JSON.stringify(list));
  }, [set, list]);

  function addTodo(text) {
    setTodo((todo) => {
      console.log(text);
      console.log(todo);
      return [...todo, { text: text, done: false, id: generateId() }];
    });
  }

  function updateTodo(id, overrides) {
    setTodo((todo) => {
      return todo.map((item) => {
        if (item.id === id) {
          console.log(item);
          console.log(overrides);
          return {
            ...item,
            ...overrides,
          };
        }
        return item;
      });
    });
    window.location.reload();
  }

  function deleteTodo(id) {
    setTodo((todo) => {
      return todo.filter((item) => {
        if (item.id === id) {
          return false;
        }
        return true;
      });
    });
  }

  return { list, addTodo, updateTodo, deleteTodo };
}

function generateId() {
  return Date.now();
}



/*export function addTodoList () {
  const { get, set } = useStorage()

  useEffect(() => {
    const loadSaved = async () => {

    }
    loadSaved()
  }, [get, set])
} */

/*export interface Todo {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;   
  onAdd: (event: React.FormEvent<HTMLFormElement>) => void;   
*/