import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { EmployeeService } from '@app/_services/employee.service';
import { DepartmentService } from '@app/_services/department.service';
import { AlertService } from '@app/_services/alert.service';
import { Employee } from '@app/_models/employee';
import { Department } from '@app/_models/department';

@Component({
  selector: 'app-employee-transfer',
  templateUrl: './employee-transfer.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EmployeeTransferComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private alertService = inject(AlertService);

  form: FormGroup;
  loading = false;
  submitted = false;
  employees: Employee[] = [];
  departments: Department[] = [];
  selectedEmployee: Employee;

  ngOnInit() {
    this.form = this.formBuilder.group({
      employeeId: ['', Validators.required],
      departmentId: ['', Validators.required],
      reason: ['', Validators.required]
    });

    // Load employees and departments
    this.employeeService.getAll()
      .pipe(first())
      .subscribe(employees => {
        this.employees = employees;
      });

    this.departmentService.getAll()
      .pipe(first())
      .subscribe(departments => {
        this.departments = departments;
      });

    // Handle employee selection
    this.form.get('employeeId').valueChanges.subscribe(employeeId => {
      if (employeeId) {
        this.employeeService.getById(employeeId)
          .pipe(first())
          .subscribe(employee => {
            this.selectedEmployee = employee;
            // Pre-select current department
            this.form.patchValue({
              departmentId: employee.departmentId
            });
          });
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.employeeService.transferDepartment(
      this.f.employeeId.value,
      this.f.departmentId.value
    )
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Employee transferred successfully', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
} 