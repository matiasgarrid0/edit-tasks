import React, { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      console.log("empty element");
    }
    setTasks([
      ...tasks,
      {
        id: nanoid(10),
        taskName: task,
      },
    ]);
    setTask("");
  };
  const deleteTask = (id) => {
    const filteredArray = tasks.filter((e) => e.id !== id);
    setTasks(filteredArray);
  };
  const edit = (e) => {
    console.log(e);
    setEditMode(true);
    setTask(e.taskName);
    setId(e.id);
  };
  const editTask = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      console.log("empty element");
    }
    const editedArray = tasks.map((e) =>
      e.id === id ? { id, taskName: task } : e
    );
    setTasks(editedArray);
    setEditMode(false);
    setTask("");
    setId("");
  };

  return (
    <div className="App">
      <h1>Tasks</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Task List</h4>
          <ul className="list-group">
            {tasks.length === 0 ? (
              <li className="list-group-item mx-2 text-center text-danger bold fs-5 fw-bold">
                No tasks...
              </li>
            ) : (
              tasks?.map((e) => (
                <li className="list-group-item mx-2" key={e.id}>
                  <span className="lead">{e.taskName}</span>
                  <button
                    className="btn btn-danger btn-sm float-end mx-2"
                    onClick={() => deleteTask(e.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-end"
                    onClick={() => edit(e)}
                  >
                    Edit
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {editMode ? "Edit Task" : "Create Task"}
          </h4>
          <form onSubmit={editMode ? (e) => editTask(e) : (e) => addTask(e)}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter task"
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />
            {editMode ? (
              task.length === 0 ? 
              <></> 
              :
              <button className="btn btn-warning btn-block" type="submit">
                Edit
              </button>
            ) : task.length === 0 ? (
              <></>
            ) : (
              <button
                className="btn btn-dark btn-block"
                type={task.length !== 0 ? "submit" : null}
              >
                Add
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
