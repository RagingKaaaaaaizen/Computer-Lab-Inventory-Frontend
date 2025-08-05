import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ItemService } from '../../_services/item.service';
import { CategoryService } from '../../_services/category.service';
import { BrandService } from '../../_services/brand.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin-bottom: 20px;
      transition: all 0.3s ease;
    }

    .form-card:hover {
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      transform: translateY(-2px);
    }

    .card {
      border: none;
      border-radius: 12px;
      overflow: hidden;
    }

    .card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
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
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
      font-size: 0.95rem;
    }

    .form-label i {
      margin-right: 8px;
      color: #667eea;
      width: 16px;
    }

    .form-control {
      border: 2px solid #e9ecef;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background-color: #fff;
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
      outline: none;
    }

    .form-control.is-invalid {
      border-color: #dc3545;
      box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }

    .form-control:disabled,
    .form-control[readonly] {
      background-color: #f8f9fa;
      opacity: 0.8;
    }

    .form-row {
      display: flex;
      gap: 20px;
      margin-bottom: 25px;
    }

    .form-row .form-group {
      flex: 1;
      margin-bottom: 0;
    }

    .invalid-feedback {
      display: block;
      width: 100%;
      margin-top: 5px;
      font-size: 0.875rem;
      color: #dc3545;
    }

    .form-actions {
      display: flex;
      gap: 15px;
      justify-content: flex-end;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e9ecef;
    }

    .btn {
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-color: transparent;
      color: white;
    }

    .btn-primary:hover {
      background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
      color: white;
    }

    .btn-primary:disabled {
      background: #6c757d;
      opacity: 0.6;
      transform: none;
      box-shadow: none;
    }

    .btn-outline-secondary {
      border-color: #6c757d;
      color: #6c757d;
      background: transparent;
    }

    .btn-outline-secondary:hover {
      background: #6c757d;
      color: white;
    }

    .spinner-border-sm {
      width: 1rem;
      height: 1rem;
    }

    /* Autocomplete Styles */
    .autocomplete-container {
      position: relative;
    }

    .suggestions-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 2px solid #e9ecef;
      border-top: none;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      max-height: 200px;
      overflow-y: auto;
      z-index: 1000;
    }

    .suggestion-item {
      padding: 12px 15px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      border-bottom: 1px solid #f8f9fa;
    }

    .suggestion-item:hover {
      background-color: #f8f9fa;
    }

    .suggestion-item:last-child {
      border-bottom: none;
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
        gap: 0;
      }

      .form-actions {
        flex-direction: column;
        gap: 10px;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }

      .suggestions-dropdown {
        position: fixed;
        left: 10px;
        right: 10px;
        max-height: 150px;
      }
    }

    @media (max-width: 480px) {
      .page-title {
        font-size: 2rem;
      }

      .card-body {
        padding: 20px;
      }
    }
  `]
})
export class ItemEditComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private itemService = inject(ItemService);
  private categoryService = inject(CategoryService);
  private brandService = inject(BrandService);
  private alertService = inject(AlertService);

  form: FormGroup;
  id: number;
  isViewMode: boolean;
  loading = false;
  submitted = false;
  categories: any[] = [];
  brands: any[] = [];
  title: string;

  // Autocomplete properties
  filteredCategories: any[] = [];
  filteredBrands: any[] = [];
  showCategorySuggestions = false;
  showBrandSuggestions = false;

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isViewMode = this.route.snapshot.data['viewMode'] || false;
    this.title = this.isViewMode ? 'View Item' : (this.id ? 'Edit Item' : 'Add Item');

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      categoryId: [''],
      brandId: [''],
      categoryName: ['', Validators.required],
      brandName: ['', Validators.required],
      description: ['']
    });

    this.loadCategories();
    this.loadBrands();

    if (this.id) {
      this.loadItem();
    }
  }

  loadItem() {
    this.loading = true;
    this.itemService.getById(this.id)
      .pipe(first())
      .subscribe({
        next: (item) => {
          // Find category and brand names from IDs
          const category = this.categories.find(c => c.id === item.categoryId);
          const brand = this.brands.find(b => b.id === item.brandId);
          
          this.form.patchValue({
            name: item.name,
            categoryId: item.categoryId,
            brandId: item.brandId,
            categoryName: category ? category.name : '',
            brandName: brand ? brand.name : '',
            description: item.description
          });
          this.loading = false;
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  loadCategories() {
    this.categoryService.getAll()
      .pipe(first())
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          this.filteredCategories = categories;
        },
        error: error => {
          this.alertService.error(error);
        }
      });
  }

  loadBrands() {
    this.brandService.getAll()
      .pipe(first())
      .subscribe({
        next: (brands) => {
          this.brands = brands;
          this.filteredBrands = brands;
        },
        error: error => {
          this.alertService.error(error);
        }
      });
  }

  // Autocomplete Methods
  onCategoryInput(event: any) {
    const value = event.target.value.toLowerCase();
    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(value)
    );
    this.showCategorySuggestions = true;
  }

  onBrandInput(event: any) {
    const value = event.target.value.toLowerCase();
    this.filteredBrands = this.brands.filter(brand =>
      brand.name.toLowerCase().includes(value)
    );
    this.showBrandSuggestions = true;
  }

  selectCategory(category: any) {
    this.form.patchValue({
      categoryName: category.name,
      categoryId: category.id
    });
    this.showCategorySuggestions = false;
  }

  selectBrand(brand: any) {
    this.form.patchValue({
      brandName: brand.name,
      brandId: brand.id
    });
    this.showBrandSuggestions = false;
  }

  hideCategorySuggestions() {
    setTimeout(() => {
      this.showCategorySuggestions = false;
    }, 200);
  }

  hideBrandSuggestions() {
    setTimeout(() => {
      this.showBrandSuggestions = false;
    }, 200);
  }

  async save() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    try {
      const formValue = this.form.value;
      
      // Find or create category
      let categoryId = formValue.categoryId;
      if (!categoryId && formValue.categoryName) {
        const existingCategory = this.categories.find(cat => 
          cat.name.toLowerCase() === formValue.categoryName.toLowerCase()
        );
        
        if (existingCategory) {
          categoryId = existingCategory.id;
        } else {
          // Create new category
          const newCategory = await this.categoryService.create({
            name: formValue.categoryName,
            description: ''
          }).pipe(first()).toPromise();
          categoryId = newCategory.id;
          this.categories.push(newCategory);
          this.filteredCategories = this.categories;
        }
      }

      // Find or create brand
      let brandId = formValue.brandId;
      if (!brandId && formValue.brandName) {
        const existingBrand = this.brands.find(brand => 
          brand.name.toLowerCase() === formValue.brandName.toLowerCase()
        );
        
        if (existingBrand) {
          brandId = existingBrand.id;
        } else {
          // Create new brand
          const newBrand = await this.brandService.create({
            name: formValue.brandName,
            description: ''
          }).pipe(first()).toPromise();
          brandId = newBrand.id;
          this.brands.push(newBrand);
          this.filteredBrands = this.brands;
        }
      }

      // Create item data with resolved IDs
      const itemData = {
        name: formValue.name,
        categoryId: categoryId,
        brandId: brandId,
        description: formValue.description
      };

      if (this.id) {
        await this.itemService.update(this.id, itemData).pipe(first()).toPromise();
        this.alertService.success('Item updated successfully');
      } else {
        await this.itemService.create(itemData).pipe(first()).toPromise();
        this.alertService.success('Item created successfully');
      }
      
      this.router.navigate(['/add/item']);
    } catch (error) {
      console.error('Error saving item:', error);
      this.alertService.error('Failed to save item');
      this.loading = false;
    }
  }
}
