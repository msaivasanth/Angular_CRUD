import { Component } from '@angular/core';
import { Employee } from '../../Employee';
import { NgFor, NgIf } from '@angular/common';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [NgFor, NgIf, AddEmpComponent, FormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  emps!: Employee[]

  name!: string
  email!: string
  mobile!: string
  ind!: number

  search!: string

  constructor() {
    if(localStorage.getItem('employees') == null) {
      this.emps = []
    }
    else {
      this.emps = JSON.parse(localStorage.getItem('employees') !)
    }
    
  }

  deleteEmp = (emp: Employee) => {
    const ind = this.emps.indexOf(emp)
    this.emps.splice(ind, 1);
    localStorage.setItem('employees', JSON.stringify(this.emps))
  }

  addEmp = (emp: Employee) => {
    this.emps.push(emp)
    localStorage.setItem('employees', JSON.stringify(this.emps))
  }

  values = (emp: Employee) => {
    const ind = this.emps.indexOf(emp)
    this.name = this.emps[ind].name
    this.email = this.emps[ind].email
    this.mobile = this.emps[ind].mobile
    this.ind = ind;
  }
  empEdit = () => {
    
    this.emps[this.ind].name = this.name;
    this.emps[this.ind].email = this.email;
    this.emps[this.ind].mobile = this.mobile;

    localStorage.setItem('employees', JSON.stringify(this.emps))
  }

  onSearch = () => {
    // console.log(this.search)
    this.emps = JSON.parse(localStorage.getItem('employees') !)
    let searchRes = this.emps.filter((emp) => {
      return emp.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1
    })
    this.emps = searchRes
    this.search = ''
    // console.log(searchRes)
  }
}
