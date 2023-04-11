import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const TodoApp = () => {
  const initialState = {
    id: "",
    message: "",
  };

  const [newTodo, setNewTodo] = useState(initialState);
  const [todos, setTodos] = useState([]);

  const onNewTodoChange = useCallback(
    (event) => {
      setNewTodo({ message: event.target.value });
    },
    []
  );

  const formSubmitted = useCallback(
    (event) => {
      event.preventDefault();
      // if (!newTodo.trim()) return;
      setTodos([newTodo, ...todos]);

      axios
        .post("http://localhost:8888/todos", newTodo)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
      setNewTodo(initialState);
    },
    [newTodo, todos, initialState]
  );

  useEffect(() => {
    axios
      .get("http://localhost:8888/todos")
      .then((res) => {
        console.log(res.data);
        setTodos(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const addTodo = useCallback(
    (todo, index) => (event) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1, { ...todo, done: !todo.done });
      setTodos(newTodos);
    },
    [todos]
  );

  const removeTodo = useCallback(
    (id) => {
      axios
        .delete(`http://localhost:8888/todos/${id}`)
        .then((todo) => {
          console.log(todo);
          const nTodo = todos.filter((item) => {
            return item.id !== id;
          });
          setTodos(nTodo);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [todos]
  );

  const markAllDone = useCallback(() => {
    const updatedTodos = todos.map((todo) => {
      return {
        ...todo,
        done: true,
      };
    });
    setTodos(updatedTodos);
  }, [todos]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow border-0 ">
            <div className="card-body p-3">
              <h2 className="h4 mb-1">Todo List</h2>
              <div className="small text-muted font-italic mb-4">
                <form onSubmit={formSubmitted}>
                  <div className="d-flex">
                    <input
                      type="text"
                      id="newTodo"
                      name="newTodo"
                      value={newTodo.message}
                      onChange={onNewTodoChange}
                    />
                    <button className="ml-2 px-4" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              {todos.map((todo, index) => (
                <ul key={index} className="list-group">
                  <li className="list-item list-group-item rounded-0">
                    <div className="flex">
                      <input
                        checked={todo.done}
                        className="mr-3"
                        id="customCheck1"
                        type="checkbox"
                        onChange={addTodo(todo, index)}
                      />

                      <div className="d-flex font-italic d-block">
                        <samp className={todo.done ? "done" : ""}>
                          {todo.message}
                        </samp>
                      </div>
                    </div>
                    <i
                      onClick={() => removeTodo(todo.id)}
                      className="fa fa-times delete-button"
                      aria-hidden="true"
                    ></i>
                  </li>
                </ul>
              ))}
              <button className="btn-markAllDone" onClick={markAllDone}>
                Mark All
              </button>
              <button className="btn-markAllDone" onClick={markAllDone}>
                Delite All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
ReactDOM.render(<TodoApp />, document.getElementById("root"));
