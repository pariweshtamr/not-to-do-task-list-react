import { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { AddTaskForm } from './components/form/AddTaskForm';

import { NotToDoList } from "./components/task-list/NotToDoList";
import { TaskList } from "./components/task-list/TaskList";

import './App.css';


const hrPwk = 168;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [badTasks, setBadTasks] = useState([]);
  const [error, setError] = useState(false);

  const taskHrs = tasks.reduce((subttl, itm) => subttl + +itm.hr, 0);
  const badHours = badTasks.reduce((subttl, itm) => subttl + +itm.hr, 0);
  const totalHrs = taskHrs + badHours;


const addTaskList = frmData => {
  if (totalHrs > hrPwk) {
    setError(true);
  }
  else {
    error && setError(false);
    setTasks([...tasks,frmData]);
  }
};

//1. create a function and pass to taskList compoenent
//2. on button click, grab the index and pass the index to a function in the parent component

const markAsBadList = i => {

  //3. take the task out of the task[] based on the index value we received

const tempTasks = [...tasks]

const badTask = tempTasks.splice(i, 1)[0];

//4. put the taken out task item to the badTask[]

setBadTasks([...badTasks, badTask]);
setTasks(tempTasks);
}; 

//5. pass the badTask[] down to badList component as props

//6. In the badList component, loop through the badTask[] that we just sent

const markAsToDo = (i) => {

  const tempBadList = [...badTasks]

  const goodTask = tempBadList.splice(i, 1)[0];

  setTasks([...tasks, goodTask]);
  setBadTasks(tempBadList);
};

  return (
  <div className="main">
    <Container>
  <Row>
    <Col>
    <h1 className="text-center mt-5">Not To Do Task List</h1>
    </Col>
  </Row>
  <hr />
  <Row>
    <Col>
    {error && (<Alert variant ="danger">
     You have exceeded the number of hours per week
    </Alert>
      )}
    </Col>
  </Row>
  <AddTaskForm addTaskList={addTaskList}/>
  <hr />
  <Row>
    <Col><TaskList tasks={tasks} markAsBadList={markAsBadList}/></Col>
    <Col><NotToDoList badTasks={badTasks} markAsToDo={markAsToDo} badHours={badHours}/></Col>
  </Row>

  <Row>
    <Col>
    <Alert variant ="warning">
      Your Total Allocated Hours: {totalHrs} / 168 Hours per week
    </Alert>
    </Col>
  </Row>
</Container>
    </div>
  ); 
}

export default App;
