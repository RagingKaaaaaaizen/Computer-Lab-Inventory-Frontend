import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component'
import { DepartmentsRoutingModule } from './departments-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DepartmentsRoutingModule,
        ListComponent,
        AddEditComponent
    ]
})
export class DepartmentsModule { }