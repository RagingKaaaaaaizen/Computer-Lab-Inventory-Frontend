import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

import { DepartmentService, AlertService } from '@app/_services';

@Component({ 
  templateUrl: 'add-edit.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddEditComponent implements OnInit {
  private formBuilder = inject(UntypedFormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private departmentService = inject(DepartmentService);
  private alertService = inject(AlertService);

  form: UntypedFormGroup
  id: string
  isAddMode: boolean
  loading = false
  submitted = false

  ngOnInit(){
    this.id = this.route.snapshot.params['id']
    this.isAddMode = !this.id
    
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })

    if(!this.isAddMode){
      this.departmentService.getById(this.id)  
        .pipe(first())
        .subscribe(x => this.form.patchValue(x))
    }
  }

  get f() { return this.form.controls}

  onSubmit(){
    
    this.submitted = true
    this.alertService.clear()

    if(this.form.invalid) return

    this.loading = true

    if(this.isAddMode){
      this.createDepartment()
    }
    else{
      this.editDepartment()
    }
  }

  private createDepartment(){
    this.departmentService.create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Department created succesfully', { keepAfterRouteChange: true})
          this.router.navigate(['/admin/departments'])
        },
        error: error => {
          this.alertService.error(error)
          console.log('error on department shi')
          this.loading = false
        }
      })
  }

  private editDepartment(){
    this.departmentService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                  console.log('success!')
                    this.alertService.success('Updated successful', { keepAfterRouteChange: true });
                    this.router.navigate(['/admin/departments']);
                },
                error: error => {
                  console.log('error!')
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
  }
}