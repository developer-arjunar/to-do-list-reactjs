import React from "react";

function TaskItem(props) {
    const borderColor =
      props.taskInfo.status === "Completed" ? "border-success" : "";
    return (
      <div className="col mb-2">
        <div className={"card border " + borderColor}>
          <div className="card-header">
            <span className="card-title">{props.taskInfo.taskName}</span>
            <br />
            <span className="badge badge-pill badge-primary">
              {props.taskInfo.startDate}
            </span>
          </div>
          <div className="card-body d-flex flex-column">
            <p className="card-text">{props.taskInfo.taskDescription}</p>
            <div className="mt-auto text-right">
              <button className="btn btn-danger btn-sm mr-2" onClick={() => props.onDelete(props.taskInfo.taskId)}>Delete</button>
              <button className="btn btn-success btn-sm" onClick={() => props.onComplete(props.taskInfo.taskId)}>Complete</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default TaskItem;