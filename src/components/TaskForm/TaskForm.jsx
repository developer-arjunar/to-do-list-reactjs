import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import {v4 as uuid4} from "uuid";

function TaskForm() {
    const [message, setMessage] = useState('');

    const initialValues = {
        taskName: '',
        taskDescription: '',
        startDate: ''
    }

    const onSubmit = (values, {resetForm}) => {
        const taskId = uuid4();

        const apiUrl = `https://to-do-list-3bd59-default-rtdb.asia-southeast1.firebasedatabase.app/task-list/${taskId}.json`;
    
        const task = {...values, taskId: taskId, status: 'Not Started', createdDate: new Date()};

        axios.put(apiUrl, task).then((response) => {
            if (response.status === 200) {
                setMessage('Task has been saved')
                resetForm({values: ''})
            }
        }).catch((error) => {
            setMessage('There was an error while saving data')
        });
    }

    const validate = (values) => {
      let errors = {};

      if (!values.taskName) {
        errors.taskName = "Task Name cannot be empty";
      }

      if (!values.taskDescription) {
        errors.taskDescription = "Task Description cannot be empty";
      }

      if (!values.startDate) {
        errors.startDate = "Start Date cannot be empty";
      } else if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(values.startDate)) {
        errors.startDate = "Date must be dd/mm/yyyy format";
      }

      return errors;
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

    return (
      <div className="container mt-4">
        <h4 className="mb-4">New Task</h4>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="taskName" className="form-label">Task Name</label>
            <input
              type="text"
              className="form-control"
              id="taskName"
              name="taskName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.taskName}
            />
            {formik.touched.taskName && formik.errors.taskName ? <div className="small text-danger">{formik.errors.taskName}</div> : null}
          </div>
          <div className="form-group">
            <label htmlFor="taskDescription" className="form-label">Task Description</label>
            <textarea
              rows="3"
              type="text"
              className="form-control"
              id="taskDescription"
              name="taskDescription"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.taskDescription}
            />
            {formik.touched.taskDescription && formik.errors.taskDescription ? <div className="small text-danger">{formik.errors.taskDescription}</div> : null}
          </div>
          <div className="form-group">
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input
              type="text"
              className="form-control"
              id="startDate"
              name="startDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startDate}
            />
            {formik.touched.startDate && formik.errors.startDate ? <div className="small text-danger">{formik.errors.startDate}</div> : null}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {message ? <div className="alert alert-primary mt-4">{message}</div> : null}
      </div>
    );
}

export default TaskForm;