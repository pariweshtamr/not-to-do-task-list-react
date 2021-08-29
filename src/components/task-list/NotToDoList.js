import React from 'react'
import { Alert, Button, Table } from 'react-bootstrap';

export const NotToDoList = ({badTasks, markAsToDo, handleOnBadTaskClicked, badTaskToDelete}) => {

  const badHours = badTasks.reduce((subTtl, item) => subTtl + item.hr, 0)
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
        <input type="checkbox" defaultValue = {itm._id} checked = {badTaskToDelete.includes(itm._id)} onChange={handleOnBadTaskClicked} /> <label>  {itm.task}</label>
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
