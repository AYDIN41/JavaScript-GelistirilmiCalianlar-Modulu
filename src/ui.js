export class UI{
    constructor(){
        this.employeesList = document.getElementById("employees");
        this.updateButton = document.getElementById("update");
        this.nameInput = document.getElementById("name");
        this.departmentInput = document.getElementById("department");
        this.salaryInput = document.getElementById("salary");

    }
    addAllEmployeesToUI(employees){
        // <tr>
                                            
        //        <td>Mustafa Murat Coşkun</td>
        //          <td>Bilişim</td>
        //         <td>4000</td>
        //         <td>1</td>
        //         <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        //        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        //     </tr>

        let result = "";

        employees.forEach(employee => {
            result += `
            <tr>
                                            
               <td>${employee.name}</td>
                 <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
               <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
               <td> <a href="#" id = "salaryUp" class= "btn btn-danger">Maaş Artır</a></td>
            </tr>
            
            `;
        });
        this.employeesList.innerHTML = result;
        
    }
    clearInput(){
        this.nameInput.value = "";
        this.departmentInput.value = "";
        this.salaryInput.value = "";
    }
    addEmployeeToUI(employee){
        this.employeesList.innerHTML += `
        <tr>
                                        
           <td>${employee.name}</td>
             <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td>${employee.id}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
           <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
           <td> <a href="#" id = "salaryUp" class= "btn btn-danger">Maaş Artır</a></td>
        </tr>
        
        `;
    }
    deleteEmployeeFromUI(element){
        element.remove();
    }
    toggleUpdateButton(target){
        if(this.updateButton.style.display === "none"){
            this.updateButton.style.display = "block";
            this.addEmployeeInfoToInputs(target);
        }else{
            this.updateButton.style.display = "none";
            this.clearInput();
        }
    }
    addEmployeeInfoToInputs(target){
        const children = target.children;

        this.nameInput.value = children[0].textContent;
        this.departmentInput.value = children[1].textContent;
        this.salaryInput.value = children[2].textContent;  
    }
    updateEmployeeOnUI(employee,parent){
        parent.innerHTML = `

        <tr>
                                            
               <td>${employee.name}</td>
                 <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
               <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
               <td> <a href="#" id = "salaryUp" class= "btn btn-danger">Maaş Artır</a></td>
            </tr>

        `;
        this.clearInput();
    }
    showFilter(element){
        this.employeesList.innerHTML = `
        <tr>
                                        
           <td>${element.firstElementChild.textContent}</td>
             <td>${element.firstElementChild.nextElementSibling.textContent}</td>
            <td>${element.firstElementChild.nextElementSibling.nextElementSibling.textContent}</td>
            <td>${element.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
           <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
           <td> <a href="#" id = "salaryUp" class= "btn btn-danger">Maaş Artır</a></td>
        </tr>
        
        `;



    }
    deleteAllPeople(){
        this.employeesList.innerHTML = "";
    }
    raiseSalary(employe,parentt){
        parentt.innerHTML = `

        <tr>
                                            
               <td>${employe.name}</td>
                 <td>${employe.department}</td>
                <td>${employe.salary}</td>
                <td>${employe.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
               <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
               <td> <a href="#" id = "salaryUp" class= "btn btn-danger">Maaş Artır</a></td>
            </tr>

        `;
        this.clearInput();

    }
    
}