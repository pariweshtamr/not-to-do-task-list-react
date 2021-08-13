import React, {useState} from 'react'

import { Form, Row, Col, Button } from 'react-bootstrap';


const initialForm = {
    task:"Coding",
    hr:10,
};

export const AddTaskForm = ({addTaskList}) => {

    const [frmData, setFrmData] = useState(initialForm);

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setFrmData({
            ...frmData,
            [name]: value,
        });
    };

    const handleOnSubmit = e => {
        e.preventDefault();
        addTaskList(frmData);
    };

    return (  
   <Form onSubmit={handleOnSubmit}>
    <Row>
      <Col>
        <Form.Control 
        name="task" 
        onChange = {handleOnChange}
        value ={frmData.task}
        maxLength = "30"
        required
        placeholder="Task" />
      </Col>
      <Col>
        <Form.Control 
        name="hr" 
        type = "number"
        onChange = {handleOnChange}
        value ={frmData.hr}
        required
        placeholder="Hours" />
      </Col>
      <Col>
      <Button type="submit" variant="primary">Add Task</Button>{' '}
      </Col>
    </Row>
  </Form>
    ) 
};
