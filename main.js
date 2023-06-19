let taskInput = document.getElementById("task-input");
taskInput.addEventListener("input", render);

let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList =[];
let mode = "";
let filterList = [];
let underLine = document.getElementById("under-line");

addButton.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        filter(event);
    });
}

function addTask() {
    let task = {
        taskContent: taskInput.value,
        isComplete: false,
        id: randomIDGenerate(),
    };
    taskList.push(task);
    
    saveTasks();
    
    console.log(taskList);
    render();
    taskInput.value = "";
}

function render() {
    let list = [];
    
    if (mode === "all") {
        list = taskList;
    } else if (mode === "word-practice") {
        list = taskList;
    }
    
    let resultHTML = ``;
    for (let i = 0; i < list.length; i++) {
        const taskContent = list[i].taskContent;
        const taskId = list[i].id;
        const taskURL = `word_page_url?id=${taskId}`;
        
        resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="correctionTask('${list[i].id}')">수정</button>
                <button onclick="deleteTask('${list[i].id}')">삭제</button>
            </div>
        </div>`;
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function filter(event) {
    mode = event.target.id;
    render();
    updateUnderline(event.target);
}

filter({ target: { id: "all" } });

function updateUnderline(target) {
    const tabsContainer = document.querySelector(".task-tabs");
    const underLine = document.getElementById("under-line");
    const targetRect = target.getBoundingClientRect();
    const containerRect = tabsContainer.getBoundingClientRect();
    const left = targetRect.left - containerRect.left;
    const top = target.offsetTop + target.offsetHeight - 4;

    underLine.style.width = target.offsetWidth + "px";
    underLine.style.left = left + "px";
    underLine.style.top = top + "px";
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 16);
}

function correctionTask(id){
    const taskURL = `wordDepth.html?id=${id}`;
    window.location.href = taskURL;
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
}

function saveTasks() {
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

function retrieveTasks() {
    const savedTasks = localStorage.getItem("taskList");
    
    if (savedTasks) {
        taskList = JSON.parse(savedTasks);
    }
}

window.addEventListener("load", function(){
    retrieveTasks()
    render();
});


