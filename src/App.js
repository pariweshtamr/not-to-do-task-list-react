import { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Button, Spinner } from "react-bootstrap";
import { AddTaskForm } from './components/form/AddTaskForm';
import { NotToDoList } from "./components/task-list/NotToDoList";
import { TaskList } from "./components/task-list/TaskList";
import { createTask, getTaskLists, switchTask } from './apis/taskApi'
import './App.css';

// const hrPwk = 168;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [badTasks, setBadTasks] = useState([]);
  const [error, setError] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState([]);
  const [badTaskToDelete, setBadTaskToDelete] = useState([]);

  const taskHrs = tasks.reduce((subttl, itm) => subttl + +itm.hr, 0);
  const badHours = badTasks.reduce((subttl, itm) => subttl + +itm.hr, 0);
  const totalHrs = taskHrs + badHours;

  useEffect(() => {
   // fetch all the tickets and set in the task []
   const fetchingAllTask = async () => {
    const { result } = await getTaskLists();
    setTasks(result)
   }
   fetchingAllTask()
  }, [])

const addTaskList = async frmData => {
  //sending form data to the server
  const result = await createTask(frmData)
  if(result._id){
    //new task has been added successfullu, now we can call api to fetch all data 
    const { result } = await getTaskLists();
    console.log(result)
    setTasks(result)
  } else {
      alert("unable to add the task at the moment, please try again later")
  }
  // Code for local state ONLY!!!

  // if (totalHrs + +frmData.hr > hrPwk) {
  //   setError(true);
  // }
  // else {
  //   error && setError(false);
  //   setTasks([...tasks,frmData]);
  // }
};
const markAsBadList = async (_id) => {
  const ntd = {
    id: _id,
    todo: false,
  }
  const res = await switchTask(ntd)
  console.log(res)
  if(res.result._id){
    const { result } = await getTaskLists();
    console.log(result)
    setTasks(result)

  }
}; 
const markAsToDo = async (_id) => {
  const td = {
    id: _id,
    todo: true,
  }
  const res = await switchTask(td)
  console.log(res)
  if(res.result._id){
    const { result } = await getTaskLists();
    console.log(result)
    setTasks(result)

  }
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

//task list only
const taskListsOnly = tasks.filter((item) => item.todo)
//badTask list only
const badTaskListsOnly = tasks.filter((item) => !item.todo)

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
    <Col>
    {!tasks.length && !badTasks.length && (<Spinner animation="border" variant="primary" />)}
    <TaskList 
    // tasks={tasks} 
    tasks={taskListsOnly} 
    markAsBadList={markAsBadList} handleOnTaskClicked={handleOnTaskClicked} taskToDelete={taskToDelete}/></Col>

    <Col><NotToDoList 
    // badTasks={badTasks}
    badTasks={badTaskListsOnly}
    markAsToDo={markAsToDo} badHours={badHours}
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