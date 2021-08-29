import React from 'react'
import { Alert, Button, Table } from 'react-bootstrap';

export const NotToDoList = ({badTasks, markAsToDo, badHours, handleOnBadTaskClicked, badTaskToDelete}) => {
    return (
        <div>
        <h2>Not-to-do List</h2>
        <Table striped bordered hover size="sm">
<thead>
<tr>
  <th>Tasks</th>
  <th>Hours</th>
  <th>Action</th>
</tr>
</thead>
<tbody>

{
  badTasks.map((itm, i)=>{
    return (
      <tr key={i}>
      <td>
        <input type="checkbox" defaultValue = {i} checked = {badTaskToDelete.includes(i)} onChange={handleOnBadTaskClicked} /> <label>  {itm.task}</label>
      </td>
      <td>{itm.hr}</td>
      <td>
          <Button onClick ={() => markAsToDo(itm._id)}>Mark To-do</Button>
      </td>
    </tr>

    );
  })
}
</tbody>
</Table>

<Alert variant ="warning">
      You have saved: {badHours} / 168 Hours per week
    </Alert>
    </div>
    )
}
