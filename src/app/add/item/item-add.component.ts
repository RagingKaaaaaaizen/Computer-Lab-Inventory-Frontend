import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ItemService } from '../../_services/item.service';
import { CategoryService } from '../../_services/category.service';
import { BrandService } from '../../_services/brand.service';
import { StorageLocationService } from '../../_services/storage-location.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    .form-container {
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
      gap: 15px;
    }

    .header-title i {
      font-size: 2.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .page-title {
      font-size: 2.5rem;
      font-weight: bold;
      color: #333;
      margin: 0 0 5px 0;
    }

    .page-subtitle {
      color: #666;
      font-size: 1.1rem;
      margin: 0;
    }

    .header-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .form-card {
      max-width: 800px;
      margin: 0 auto;
    }

    .card {
      border: none;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }

    .card:hover {
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      transform: translateY(-2px);
    }

    .card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px 12px 0 0 !important;
      padding: 20px;
      font-weight: 600;
    }

    .card-body {
      padding: 30px;
    }

    .item-form {
      max-width: 100%;
    }

    .form-group {
      margin-bottom: 25px;
    }

    .form-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }

    .form-label i {
      color: #667eea;
      font-size: 0.9rem;
    }

    .form-control {
      border: 2px solid #e9ecef;
      border-radius: 8px;
      padding: 12px 15px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    /* Ensure select elements have consistent height */
    select.form-control {
      height: 48px;
      line-height: 1.5;
      appearance: none;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 12px center;
      background-repeat: no-repeat;
      background-size: 16px 12px;
      padding-right: 40px;
    }

    .form-control:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    }

    .form-control.is-invalid {
      border-color: #dc3545;
    }

    .invalid-feedback {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 5px;
    }

    .form-row {
      display: flex;
      gap: 20px;
    }

    .form-row .form-group {
      flex: 1;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 15px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e9ecef;
    }

    .btn {
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
    }

    .btn-outline-secondary {
      border: 2px solid #6c757d;
      color: #6c757d;
    }

    .btn-outline-secondary:hover {
      background: #6c757d;
      color: white;
    }

    /* Quick Add Styles */
    .input-with-action {
      display: flex;
      gap: 8px;
      align-items: stretch;
    }

    .input-with-action .form-control {
      flex: 1;
    }

    /* Ensure select elements in input-with-action maintain consistent height */
    .input-with-action select.form-control {
      display: flex;
      align-items: center;
    }

    .quick-add-btn {
      padding: 12px 16px;
      min-width: 44px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      border: 2px solid #667eea;
      color: #667eea;
      background: white;
      transition: all 0.3s ease;
    }

    .quick-add-btn:hover {
      background: #667eea;
      color: white;
      transform: translateY(-1px);
    }

    .required-indicator {
      color: #dc3545;
      margin-left: 4px;
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.2s ease-out;
    }

    .modal-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      animation: slideIn 0.3s ease-out;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 25px;
      border-bottom: 1px solid #e9ecef;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px 12px 0 0;
    }

    .modal-header h4 {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .btn-close {
      background: none;
      border: none;
      color: white;
      font-size: 1.2rem;
      padding: 5px;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .btn-close:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .modal-body {
      padding: 25px;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e9ecef;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from { 
        opacity: 0;
        transform: scale(0.9) translateY(-20px);
      }
      to { 
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        align-items: stretch;
      }

      .header-actions {
        justify-content: center;
      }

      .form-row {
        flex-direction: column;
      }

      .form-actions {
        flex-direction: column;
      }

      .card-body {
        padding: 20px;
      }

      .input-with-action {
        flex-direction: column;
      }

      .quick-add-btn {
        width: 100%;
        justify-content: center;
      }

      .modal-container {
        width: 95%;
        margin: 10px;
      }

      .modal-header,
      .modal-body {
        padding: 20px;
      }

      .modal-actions {
        flex-direction: column-reverse;
      }

      .modal-actions .btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class ItemAddComponent implements OnInit {
  private itemService = inject(ItemService);
  private categoryService = inject(CategoryService);
  private brandService = inject(BrandService);
  private storageLocationService = inject(StorageLocationService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  model: any = {};
  categories: any[] = [];
  brands: any[] = [];
  storageLocations: any[] = [];
  loading = false;
  submitted = false;

  // Quick Add Modal Properties
  showQuickAddModal = false;
  quickAddType: 'category' | 'brand' | 'location' | null = null;
  quickAddData: any = {};
  quickAddLoading = false;

  ngOnInit() {
    this.loadCategories();
    this.loadBrands();
    this.loadStorageLocations();
  }

  loadCategories() {
    this.categoryService.getAll()
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (err) => {
          console.error('Failed to load categories', err);
          this.alertService.error('Failed to load categories');
        }
      });
  }

  loadBrands() {
    this.brandService.getAll()
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.brands = data;
        },
        error: (err) => {
          console.error('Failed to load brands', err);
          this.alertService.error('Failed to load brands');
        }
      });
  }

  loadStorageLocations() {
    this.storageLocationService.getAll()
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.storageLocations = data;
        },
        error: (err) => {
          console.error('Failed to load storage locations', err);
          this.alertService.error('Failed to load storage locations');
        }
      });
  }

  saveItem() {
    this.submitted = true;
    this.loading = true;

    console.log('Submitting payload:', this.model);

    if (!this.model.name || !this.model.categoryId || !this.model.brandId) {
      this.alertService.error('Item name, category, and brand are required');
      this.loading = false;
      return;
    }

    this.itemService.create(this.model)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Item saved successfully!');
          this.router.navigate(['/add/item']);
        },
        error: (err) => {
          console.error(err);
          this.alertService.error('Failed to save item');
          this.loading = false;
        }
      });
  }

  // Quick Add Modal Methods
  openQuickAddModal(type: 'category' | 'brand' | 'location') {
    this.quickAddType = type;
    this.quickAddData = { name: '', description: '' };
    this.showQuickAddModal = true;
    
    // Focus the input after modal opens
    setTimeout(() => {
      const input = document.querySelector('.modal-container input') as HTMLInputElement;
      if (input) input.focus();
    }, 100);
  }

  closeQuickAddModal() {
    this.showQuickAddModal = false;
    this.quickAddType = null;
    this.quickAddData = {};
    this.quickAddLoading = false;
  }

  async saveQuickAdd(form: any) {
    if (form.invalid || !this.quickAddData.name) {
      this.alertService.error('Name is required');
      return;
    }

    this.quickAddLoading = true;

    try {
      let newItem: any;
      
      switch (this.quickAddType) {
        case 'category':
          newItem = await this.categoryService.create(this.quickAddData).pipe(first()).toPromise();
          this.categories.push(newItem);
          this.model.categoryId = newItem.id;
          this.alertService.success('Category added successfully!');
          break;
          
        case 'brand':
          newItem = await this.brandService.create(this.quickAddData).pipe(first()).toPromise();
          this.brands.push(newItem);
          this.model.brandId = newItem.id;
          this.alertService.success('Brand added successfully!');
          break;
          
        case 'location':
          newItem = await this.storageLocationService.create(this.quickAddData).pipe(first()).toPromise();
          this.storageLocations.push(newItem);
          this.model.storageLocationId = newItem.id;
          this.alertService.success('Storage location added successfully!');
          break;
      }

      this.closeQuickAddModal();
    } catch (error) {
      console.error('Error adding item:', error);
      this.alertService.error(`Failed to add ${this.quickAddType}`);
      this.quickAddLoading = false;
    }
  }
}
