// 获取节点
const taskInput = document.querySelector("#task");
const addBtn = document.querySelector("#add-btn");
const filterInput = document.querySelector("#filter-task");
const clearBtn = document.querySelector("#clear-task");
const ulList = document.querySelector(".list");

// 加载所有事件监听

loadEventListeners();

function loadEventListeners() {
   document.addEventListener("DOMContentLoaded" , getTask);
   addBtn.addEventListener("click" , addTask);
   ulList.addEventListener('click', removeTask);
   clearBtn.addEventListener("click" , removeAllTask);
   filterInput.addEventListener('keyup' , filterTask);
}

function addTask() {
   if(taskInput.value === '') {
      alert("请输入Task！");
   }else {
      //创建li
      const li = document.createElement("li");
      const i = document.createElement('i');
      li.className = "item";
      // 将taskInput里的值放到li中
      li.appendChild(document.createTextNode(taskInput.value));
      i.className ="iconfont icon-10 delete-item";
      li.appendChild(i);
      ulList.appendChild(li);
      // 将每一项任务进行本地存储
      saveTask(taskInput.value);
      taskInput.value = "";
   }
}
function removeTask(e) {
   // console.log(e.target);
   if(e.target.classList.contains("delete-item")) {
      if(window.confirm("Are You Sure Delete?")) {
         e.target.parentElement.remove();
      }
   }
}

function removeAllTask() {
   // const h =  document.createElement("h2");
   // h.appendChild(document.createTextNode("No Task"));
   while(ulList.firstChild) {
      ulList.removeChild(ulList.firstChild);
   }
}

function filterTask(e){
   const val = e.target.value;
   // console.log(val);
   // console.log(ulList.getElementsByTagName('li'));
  document.querySelectorAll(".item").forEach((item)=> {
     // console.log(item);
     const itemVal = item.firstChild.textContent;
     // console.log(itemVal);
     if(itemVal.toLowerCase().indexOf(val) != -1) {
         item.style.display =  "block";
     }else {
         item.style.display = "none";
     }
  })
}

function saveTask(task) {
   let tasks = [];
   if(localStorage.getItem("tasks") === null) {
      let tasks = [];
   }else {
     tasks = JSON.parse(localStorage.getItem("tasks"));
   }
   tasks.push(task);
   localStorage.setItem("tasks" , JSON.stringify(tasks));
}

function getTask() {
   let tasks = [];
   if(localStorage.getItem("tasks") === null) {
      let tasks = [];
   }else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
   }
   console.log(tasks);
}