import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../Employee';

@Component({
  selector: 'app-add-emp',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-emp.component.html',
  styleUrl: './add-emp.component.css'
})
export class AddEmpComponent {
  name!: string;
  email!: string;
  mobile!: string;


  @Output() empAdd: EventEmitter<Employee> = new EventEmitter();
  onSubmit = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^\+?[0-9\s-]{10}$/


    if(this.name === null || this.name === "") {
        alert('Name must not be empty')
    }
    else if(!emailRegex.test(this.email)) {
        alert("Email is not in the correct format")
    }
    else if(!mobileRegex.test(this.mobile)) {
        alert("Phone number is not in the right format")
    }
    else {
      const emp = {
        name: this.name,
        email: this.email,
        mobile: this.mobile
      }
      this.name = ''
      this.email = ''
      this.mobile = ''
      this.empAdd.emit(emp)
        
    }
  }
}
