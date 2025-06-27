let taskList=[];
let timerInterval;
let timeLeft=25 * 60;
let isRunning=false;
let cycle=0;


window.onload=function(){
    const stored=JSON.parse(localStorage.getItem('tasks')) || [];//retrieves saved tasks from local storage 
    taskList=stored;
    provideTasks();
}
function addTask(){
    const taskInput=document.getElementById("taskInput");
    const task=taskInput.value.trim(); //trim for removing spaces
    if(task){
        taskList.push({text:task,completed:false});
        taskInput.value="";
        saveAndprovide();
    }
}
function toggleTask(idx){
    taskList[idx].completed=!taskList[idx].completed;
    saveAndprovide();
}
function deleteTask(idx){
    taskList.splice(idx,1);
    saveAndprovide();
}
function saveAndprovide(){
    localStorage.setItem('tasks',JSON.stringify(taskList));
    provideTasks();
}
function provideTasks(){
    
}