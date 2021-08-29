import axios from 'axios'

const rootUrl = "http://localhost:8000/"
const taskApi = rootUrl + "api/v1"
  //post data (POST)
  export const createTask = (frmData) => {
    return new Promise((resolve, reject)=>{
        axios
        .post(taskApi, frmData) 
        .then((response)=>{
        resolve(response.data)
        })
        .catch((error)=>{
        console.log(error)
        resolve(false)
        })
    })
}
//fetch all task (GET)
export const getTaskLists = () => {
    return new Promise(async resolve =>{
        try {
            const result = await axios.get(taskApi)
            resolve(result.data)
        } catch (error) {
            console.log(error)
            resolve(false)            
        }
    })
}
// switch task between to do and not to do (update data) (PATCH)
export const switchTask = (taskInfo) => {
    return new Promise(async resolve => {
        try {
            const { data }  = await axios.patch(taskApi, taskInfo)
            resolve(data)
        } catch (error) {
            console.log(error)
            resolve(false)            
        }
    })
}
//delete tasks from db
export const deleteTasks = (ids) => {
    return new Promise(async resolve => {
        try {
           const { data } = await axios.delete(taskApi, { data: ids })
           resolve(data)
        } catch (error) {
            console.log(error)
            resolve(false)          
        }
    })
}


