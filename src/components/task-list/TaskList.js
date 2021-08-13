import React from 'react'
import { Button, Table } from 'react-bootstrap'

export const TaskList = ({tasks}) => {
    return (
        <div>
            <h2>Task List</h2>
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
      tasks.map((itm, i)=>{
        return (
          <tr>
          <td>
            <input type="checkbox" /> <label>  {itm.task}</label>
          </td>
          <td>{itm.hr}</td>
          <td>
              <Button>Mark as Bad</Button>
          </td>
        </tr>
    
        );
      })
    }
  </tbody>
</Table>
        </div>
    )
}
