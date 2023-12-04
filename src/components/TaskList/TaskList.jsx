import React, { useEffect, useState } from "react";
import axios from "axios";

import TaskItem from "./TaskItem";

function TaskList() {
    const [tasks, setTasks] = useState([]);

    const [taskUpdated, setTaskUpdated] = useState(false);

    useEffect(() => {
      const apiUrl = `https://to-do-list-3bd59-default-rtdb.asia-southeast1.firebasedatabase.app/task-list.json`;

      axios.get(apiUrl).then((response) => {
        if (response.data) {
          setTasks(Object.values(response.data));
        }
      });
    }, [taskUpdated]);

    const handleComplete = (taskId) => {
        const apiUrl = `https://to-do-list-3bd59-default-rtdb.asia-southeast1.firebasedatabase.app/task-list/${taskId}.json`;

        axios.patch(apiUrl, {status: 'Completed'}).then(response => {
            setTaskUpdated(!taskUpdated);
        })
    };

    const handleDelete = (taskId) => {
        const apiUrl = `https://to-do-list-3bd59-default-rtdb.asia-southeast1.firebasedatabase.app/task-list/${taskId}.json`;

        axios.delete(apiUrl).then(response => {
            setTaskUpdated(!taskUpdated);
        })
    };

    const displayTasks = () => {
      return tasks.map((task) => {
        return <TaskItem key={task.taskId} taskInfo={task} onComplete={handleComplete} onDelete={handleDelete} />;
      });
    };

    return (
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-3">{displayTasks()}</div>
      </div>
    );
}

export default TaskList;