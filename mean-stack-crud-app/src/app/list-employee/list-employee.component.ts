import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  Employee:any = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.readEmployee();
  }

  readEmployee(){
    this.apiService.getEmployees().subscribe((data) => {
      console.log('Data', data);
     this.Employee = data;
    })    
  }

  deleteEmployee(id: any) {
    this.apiService.deleteEmployee(id).subscribe((data) => {
      this.readEmployee();
      console.log('Data', data);
    })
  }
}
