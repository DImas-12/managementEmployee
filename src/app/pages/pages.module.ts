import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { SharedModule } from '../shared/shared.module';
import { TableComponent } from './employee-list/table/table.component';

@NgModule({
  declarations: [
    TableComponent,
    LoginComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
    EmployeeDetailComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
})
export class PagesModule {}
