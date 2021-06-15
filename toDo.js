//getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button")
const todoList = document.querySelector(".todoList")
const deleteAllBtn = document.querySelector(".footer button")


inputBox.onkeyup = () => {
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() !=0){
        addBtn.classList.add("active"); //active the button
    } else {
        addBtn.classList.remove("active"); //unactive the button
    }
}

showTasks (); //calling showTasks function

//if user click on the button
addBtn.onclick = () => {
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //localstorage
   
    if(getLocalStorage == null){ //if localStorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }
  
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json
    showTasks (); //calling showTasks function
    addBtn.classList.remove("active"); //unactive the button
}

//function to add task list inside ul
function showTasks (){
    let getLocalStorage = localStorage.getItem("New Todo"); //localstorage
    if(getLocalStorage == null){ //if localStorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; //passing the length value in pendingNumb
    if(listArr.length > 0) {
        deleteAllBtn.classList.add("active");  
    }else{
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick ="deleteTask()"; ><i class="fa fa-trash" aria-hidden="true"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //one task added live the input filed blank
}

//delete task function
 function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the particular indexed li
    // after remove the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json
    showTasks ();
 }

 //delete all tasks function
 deleteAllBtn.onclick = () => {
     listArr = []; //empty the array
      // after delete all tasks again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json
    showTasks ();
 }
