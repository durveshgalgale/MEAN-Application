import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
     private router: Router, public actrouter: ActivatedRoute) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      // fname: ['', Validators.required]
    });

    this.actrouter.params.subscribe((params: { [x: string]: any; }) => {
      let id = params['id'];
      console.log(`${id}`);
      if(id) {
        this.apiService.getEmployee(id).subscribe(data => {

          this.loginForm.setValue({fname: data.fname, lname: data.lname, email: data.email, phoneNumber: data.phoneNumber});

        });
      }    
      });
  }

  get f() {
    return this.loginForm.controls;
  }

  submitDetails() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return false;
    } else {
      this.apiService.createEmployee(this.loginForm.value).subscribe(
        (res) => {
          console.log('Employee successfully created!')
          this.router.navigate(['/list-employee']);
        }, (error) => {
          console.log(error);
        });
    }
  }

}
