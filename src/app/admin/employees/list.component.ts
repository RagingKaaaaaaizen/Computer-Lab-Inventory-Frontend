import { Component, OnInit, inject } from "@angular/core";
import { DatePipe } from '@angular/common';
import { EmployeeService, ConfirmationService } from '@app/_services'
import { first } from "rxjs/operators";
import { Router } from '@angular/router';
import { AlertService } from '@app/_services';
import { Employee } from '@app/_models';

@Component({ 
  templateUrl: 'list.component.html', 
  providers: [DatePipe],
  styles: [`
    .list-container {
      padding: 20px 0;
    }

    .page-header {
      background: white;
      border-radius: 12px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .header-title i {
      font-size: 3rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .page-title {
      font-size: 2.5rem;
      font-weight: bold;
      color: #333;
      margin: 0;
    }

    .page-subtitle {
      color: #666;
      font-size: 1.1rem;
      margin: 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      text-align: center;
    }

    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }

    .stat-icon {
      font-size: 3rem;
      margin-bottom: 15px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }

    .stat-label {
      color: #666;
      font-size: 1rem;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .table-actions {
      display: flex;
      gap: 10px;
    }

    .employee-row:hover {
      background-color: #f8f9fa;
    }

    .employee-id-badge,
    .employee-number,
    .position-badge,
    .department-badge {
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .employee-id-badge {
      background: #e9ecef;
      color: #495057;
    }

    .employee-number {
      background: #d1ecf1;
      color: #0c5460;
    }

    .position-badge {
      background: #d4edda;
      color: #155724;
    }

    .department-badge {
      background: #fff3cd;
      color: #856404;
    }

    .user-info strong {
      color: #495057;
    }

    .hire-date {
      color: #6c757d;
      font-weight: 500;
    }

    .status-badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .badge-success {
      background: #d4edda;
      color: #155724;
    }

    .badge-danger {
      background: #f8d7da;
      color: #721c24;
    }

    .action-buttons {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
    }

    .action-buttons .btn {
      padding: 6px 10px;
      font-size: 0.8rem;
    }

    .loading-state,
    .empty-state {
      padding: 40px 20px;
      text-align: center;
    }

    .empty-state i {
      font-size: 4rem;
      color: #dee2e6;
      margin-bottom: 20px;
    }

    .empty-state h4 {
      color: #6c757d;
      margin-bottom: 10px;
    }

    .empty-state p {
      color: #adb5bd;
      margin-bottom: 20px;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        align-items: flex-start;
      }

      .page-title {
        font-size: 2rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .action-buttons {
        flex-direction: column;
        width: 100%;
      }

      .action-buttons .btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class ListComponent implements OnInit {
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  private alertService = inject(AlertService);
  private confirmationService = inject(ConfirmationService);

  employees: Employee[] = [];
  isDeleting = false;
  showTransferModal = false;
  selectedEmployee: Employee;
  showWorkflowModal = false;

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    console.log('Fetching updated employee list...'); // Debug log
    this.employeeService.getAll()
      .pipe(first())  
      .subscribe({
        next: (employees) => {
          console.log('Updated employees list:', employees); // Debug log
          this.employees = employees;
        },
        error: (error) => {
          console.error('Error fetching employees:', error); // Debug log
          this.alertService.error('Error fetching employees');
        }
      });
  }

  async deleteEmployee(id: string) {
    const employee = this.employees.find(x => x.id === id);
    if (!employee) return;

    const employeeName = employee.account?.email || employee.employeeId || 'Unknown Employee';
    
    try {
      const confirmed = await this.confirmationService.confirmDelete(employeeName, 'employee');
      if (!confirmed) return;

      this.isDeleting = true;
      this.employeeService.delete(id)
        .pipe(first())
        .subscribe({
          next: () => {
            this.employees = this.employees.filter(x => x.id !== id);
            this.alertService.success('Employee deleted successfully');
            this.isDeleting = false;
          },
          error: error => {
            this.alertService.error(error?.message || 'Error deleting employee');
            this.isDeleting = false;
          }
        });
    } catch (error) {
      console.error('Error with confirmation dialog:', error);
    }
  }

  openTransferModal(employee: Employee) {
    if (!employee || !employee.id) {
      this.alertService.error('Invalid employee data');
      return;
    }
    this.selectedEmployee = { ...employee }; // Create a copy of the employee object
    this.showTransferModal = true;
  }

  closeTransferModal() {
    this.showTransferModal = false;
    this.selectedEmployee = null;
  }

  onTransferComplete() {
    this.loadEmployees(); // Reload the list to show updated department
    this.closeTransferModal();
  }

  openWorkflowModal(employee: Employee) {
    console.log('Opening workflow modal for employee:', employee); // Debug log
    if (!employee || !employee.id) {
      console.error('Invalid employee data:', employee); // Debug log
      this.alertService.error('Invalid employee data');
      return;
    }
    console.log('Setting selected employee:', employee); // Debug log
    this.selectedEmployee = employee;
    console.log('Setting showWorkflowModal to true'); // Debug log
    this.showWorkflowModal = true;
    console.log('Modal state:', { showWorkflowModal: this.showWorkflowModal, selectedEmployee: this.selectedEmployee }); // Debug log
  }

  closeWorkflowModal() {
    this.showWorkflowModal = false;
    this.selectedEmployee = null;
  }
  
  refreshData() {
    this.loadEmployees();
  }
  
  trackEmployee(index: number, employee: Employee): any {
    return employee.id || index;
  }
  
  getActiveEmployeesCount(): number {
    return this.employees ? this.employees.filter(emp => emp.isActive).length : 0;
  }
  
  getInactiveEmployeesCount(): number {
    return this.employees ? this.employees.filter(emp => !emp.isActive).length : 0;
  }
  
  getDepartmentCount(): number {
    if (!this.employees) return 0;
    const departments = new Set(this.employees.map(emp => emp.department?.id).filter(id => id));
    return departments.size;
  }
}