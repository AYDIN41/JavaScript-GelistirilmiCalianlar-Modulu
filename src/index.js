import { Request } from "./requests";
import { UI } from "./ui";
// Elementleri Seçme

const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");
const filtInput = document.getElementById("filt");
const filtButton = document.getElementById("filter");
const deleteAll = document.getElementById("deleteAll");
const salaryUp = document.getElementById("salaryUppp");

const request = new Request("http://localhost:3000/employees");
const ui = new UI();



let updateState = null;
let raiseState = null;

eventListeners();

function eventListeners(){
    document.addEventListener("DOMContentLoaded",getAllEmployees);
    form.addEventListener("submit",addEmployee);
    employeesList.addEventListener("click",updateOrdelete)
    updateEmployeeButton.addEventListener("click",updateEmployee);
    filtButton.addEventListener("click",filterEmployee);
    deleteAll.addEventListener("click",deleteAllEmployee);
    salaryUp.addEventListener("click",salaryUpp);
}

function getAllEmployees(){
    request.get()
    .then(employees => {
        ui.addAllEmployeesToUI(employees);
    })
    .catch(err => console.log(err))
}

function addEmployee(e){

    const employeeName = nameInput.value.trim();
    const employeeDepartment = departmentInput.value.trim();
    const employeeSalary = salaryInput.value.trim();

    if(employeeName === "" || employeeSalary === "" || employeeDepartment === ""){
        if(employeeName === "" && employeeSalary!=="" && employeeDepartment!==""){
            alert("Lütfen İsim giriniz");
        }else if(employeeSalary === "" && employeeName!=="" && employeeDepartment!==""){
            alert("Lütfen Maaşınızı giriniz");
        }else if(employeeDepartment === "" && employeeSalary!=="" && employeeName!==""){
            alert("Lütfen Departmanınızı giriniz");
        }else{
            alert("Lütfen boş alanları doldurunuz");
        }
        
    }else{
        request.post({name:employeeName,department: employeeDepartment,salary:Number(employeeSalary)})
        .then(employee => {
            ui.addEmployeeToUI(employee);
        })
        .catch(err => console.log(err))
    }

    ui.clearInput();
    e.preventDefault();
}
function updateOrdelete(e){
    if(e.target.id === "delete-employee"){
        // Silme
        deleteEmployee(e.target);
    }else if(e.target.id === "update-employee"){
        // Günceleme
        updateEmployeeController(e.target.parentElement.parentElement);
        
    }else if(e.target.id === "salaryUp"){
        assistSalary(e.target.parentElement.parentElement);

    }
}
function deleteEmployee(targetEmployee){
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;

    request.delete(id)
    .then(message => {
        ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
    })
    .catch(err => console.log(err))
}
function updateEmployeeController(targetEmployee){
    ui.toggleUpdateButton(targetEmployee);

    if (updateState === null){
        updateState = {
            updateID : targetEmployee.children[3].textContent,
            updateParent : targetEmployee
        };
    }else{
        updateState = null;
    }
}

function updateEmployee(){
    const data = {name: nameInput.value.trim(),department: departmentInput.value.trim(),salary: Number(salaryInput.value.trim())}
    request.put(updateState.updateID,data)
    .then(updatedEmployee =>{
        ui.updateEmployeeOnUI(updatedEmployee,updateState.updateParent);
        
        
    })
    .catch(err => console.log(err));
}
function filterEmployee(e){
    
    const filterData = filtInput.value.trim();
    const tbody = document.getElementById("employees");
    const tr = tbody.getElementsByTagName('tr');
    for(let i = 0; i <tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[0];
        let tdDepartment = tr[i].getElementsByTagName('td')[1];
        let tdSalary = tr[i].getElementsByTagName('td')[2];
        
        if(filterData === td.textContent || filterData === tdDepartment.textContent || filterData == tdSalary.textContent) {
            if(filterData === td.textContent){
                ui.showFilter(td.parentElement);
            }else if(filterData === tdDepartment.textContent){
                ui.showFilter(tdDepartment.parentElement);
            }else if(filterData === tdSalary.textContent){
                ui.showFilter(td.parentElement);
            }
            // request.get()
            // .then(employee => {
            //     ui.showFilter(employee)
            // })
            // .catch(err => console.log(err));
            // console.log(filterData);
            console.log(tdDepartment.parentElement.firstElementChild);
    }
           
        }
        

    // if(filterData === namee || filterData === departmentt || filterData == salaryy ){
    //     request.get()
    //     .then(result =>{
    //         console.log(result);
    //     })
    //     .catch(err => console.log(err));
    // }

    e.preventDefault();
}
function deleteAllEmployee(e){
    request.get()
    .then(result => {
        
        result.forEach(results=>{
            assistDelete(results.id);
            ui.deleteAllPeople();
        })
    })

}
function assistDelete(id){
    request.delete(id)
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
}
function salaryUpp(targett){
    // console.log(e.target.textContent);
    // ui.toggleUpdateButton(e.target)
    // console.log(salaryInput);
    let realInput = Number(salaryInput.value.trim()) + 100;
    console.log(realInput);
    const data = {name: nameInput.value.trim(),department: departmentInput.value.trim(),salary: realInput}
    request.put(raiseState.raiseID,data)
    .then(raisedEmployee =>{
        ui.raiseSalary(raisedEmployee,raiseState.raiseParent);
        
        
    })
    .catch(err => console.log(err));
}
function assistSalary(salary){
    // console.log(salary.firstElementChild.nextElementSibling.nextElementSibling.textContent);
    let salaryy = Number(salary.firstElementChild.nextElementSibling.nextElementSibling.textContent) + 100;
    // console.log(salaryy);
    // ui.raiseSalary(salaryy);
    ui.toggleUpdateButton(salary);
    if (raiseState === null){
        raiseState = {
            raiseID : salary.children[3].textContent,
            raiseParent : salary
        };
    }else{
        raiseState = null;
    }
}





// request.get()
// .then(employees => console.log(employees))
// .catch(err => console.log(err));

// request.post({name:"Kenan Çakmak",department: "Malzeme Mühendisliği",salary : 5500})
// .then(result => console.log(result))
// .catch(err => console.log(err));

// request.put(3,{name : "Erhan Kemal Kargı",department : "Paramedik",salary : 4300})
// .then(employee => console.log(employee))
// .catch(err => console.log(err));

// request.delete(3)
// .then(employee => console.log(employee))
// .catch(err => console.log(err));
