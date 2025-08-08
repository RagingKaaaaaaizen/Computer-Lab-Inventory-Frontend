import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import {
  EmployeeService,
  AlertService,
  AccountService,
  DepartmentService,
} from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private formBuilder = inject(UntypedFormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private accountService = inject(AccountService);
  private departmentService = inject(DepartmentService);

  form!: UntypedFormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  accounts: any[] = [];
  departments: any[] = [];

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    // Initialize form with default values
    this.form = this.formBuilder.group({
      userId: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
      position: ['', [Validators.required]],
      hireDate: ['', [Validators.required]],
      isActive: [true]
    });

    // Load accounts and departments
    this.loadAccounts();
    this.loadDepartments();

    if (!this.isAddMode) {
      this.loadEmployee();
    }
  }

  private loadAccounts() {
    this.accountService.getAll()
      .pipe(first())
      .subscribe({
        next: (accounts) => {
          this.accounts = accounts;
        },
        error: (error) => {
          this.alertService.error(error);
        }
      });
  }

  private loadDepartments() {
    this.departmentService.getAll()
      .pipe(first())
      .subscribe({
        next: (departments) => {
          this.departments = departments;
        },
        error: (error) => {
          this.alertService.error(error);
        }
      });
  }

  private loadEmployee() {
    this.employeeService.getById(this.id)
      .pipe(first())
      .subscribe({
        next: (employee) => {
          this.form.patchValue(employee);
        },
        error: (error) => {
          this.alertService.error(error);
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
    if (this.isAddMode) {
      this.createEmployee();
    } else {
      this.updateEmployee();
    }
  }

  private createEmployee() {
    this.employeeService.create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Employee created successfully', { keepAfterRouteChange: true });
          this.router.navigate(['/admin/employees']);
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private updateEmployee() {
    this.employeeService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['/admin/employees']);
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
