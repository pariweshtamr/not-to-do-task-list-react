import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AddTaskForm } from './components/form/AddTaskForm';


import { NotToDoList } from "./components/task-list/NotToDoList";
import { TaskList } from "./components/task-list/TaskList";
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
const addTaskList = frmData => {
  setTasks([
    ...tasks, frmData
  ])
}

  return (
  <div className="main">
    <Container>
  <Row>
    <Col>
    <h1 className="text-center mt-5">Not To Do Task List</h1>
    </Col>
  </Row>
  <hr />
  <AddTaskForm addTaskList={addTaskList}/>
  <hr />
  <Row>
    <Col><TaskList tasks={tasks}/></Col>
    <Col><NotToDoList /></Col>
  </Row>
</Container>
   
    </div>
  );
  
}

export default App;
