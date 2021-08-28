import { useState } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { AddTaskForm } from './components/form/AddTaskForm';

import { NotToDoList } from "./components/task-list/NotToDoList";
import { TaskList } from "./components/task-list/TaskList";

import './App.css';


const hrPwk = 168;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [badTasks, setBadTasks] = useState([]);
  const [error, setError] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState([]);
  const [badTaskToDelete, setBadTaskToDelete] = useState([]);

  const taskHrs = tasks.reduce((subttl, itm) => subttl + +itm.hr, 0);
  const badHours = badTasks.reduce((subttl, itm) => subttl + +itm.hr, 0);
  const totalHrs = taskHrs + badHours;

const addTaskList = frmData => {
  if (totalHrs + +frmData.hr > hrPwk) {
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

// collect indices of the task list that is to be deleted

const handleOnTaskClicked = e => {
  const {checked, value} = e.target;

  if(checked) {
    setTaskToDelete([...taskToDelete, +value])
  }
  else {

  const filteredArg = taskToDelete.filter((item) => item !== +value)

   setTaskToDelete(filteredArg);
  }
};

// collect indices of the bad task list that is to be deleted

const handleOnBadTaskClicked = e => {
  const {checked, value} = e.target;

  if(checked) {
    setBadTaskToDelete([...badTaskToDelete, +value])
  }
  else {

  const filteredArg = badTaskToDelete.filter((item) => item !== +value)

   setBadTaskToDelete(filteredArg);
  }
};

//delete items from task list only
const deleteFromTaskList = () => {
  const newArg = tasks.filter((itm, i) => !taskToDelete.includes(i));
  setTaskToDelete([]);
  setTasks(newArg);
};

//delete items from bad list only
const deleteFromBadTaskList = () => {
  const newArg = badTasks.filter((itm, i) => !badTaskToDelete.includes(i));
  setBadTaskToDelete([]);
  setBadTasks(newArg);
};

//delete list from task list and bad list
const handleOnDeleteItems = () => {
  deleteFromTaskList();
  deleteFromBadTaskList();
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
    <Col><TaskList tasks={tasks} markAsBadList={markAsBadList} handleOnTaskClicked={handleOnTaskClicked} taskToDelete={taskToDelete}/></Col>

    <Col><NotToDoList badTasks={badTasks} markAsToDo={markAsToDo} badHours={badHours}
    handleOnBadTaskClicked={handleOnBadTaskClicked} badTaskToDelete={badTaskToDelete}/></Col>
  </Row>

  <Row>
    <Col>
    <Button variant="danger" onClick={handleOnDeleteItems}>DELETE</Button>
    </Col>
  </Row>
  <hr />

  <Row>
    <Col>
    <Alert variant ="info">
      Your Total Allocated Hours: {totalHrs} / 168 Hours per week
    </Alert>
    </Col>
  </Row>
</Container>
    </div>
  ); 
}

export default App;