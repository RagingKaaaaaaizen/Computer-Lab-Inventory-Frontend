import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ConfirmationData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  icon?: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dialog-overlay" 
         *ngIf="isVisible"
         (click)="onOverlayClick()"
         role="dialog"
         aria-modal="true"
         [attr.aria-labelledby]="'dialog-title'"
         [attr.aria-describedby]="'dialog-message'">
      
      <div class="dialog-container" 
           (click)="$event.stopPropagation()"
           [ngClass]="'dialog-' + (data.type || 'danger')">
        
        <!-- Dialog Header -->
        <div class="dialog-header">
          <div class="dialog-icon" 
               [attr.aria-label]="data.type + ' icon'">
            <i [class]="getIconClass()" aria-hidden="true"></i>
          </div>
          <h3 id="dialog-title" class="dialog-title">
            {{ data.title }}
          </h3>
        </div>

        <!-- Dialog Body -->
        <div class="dialog-body">
          <p id="dialog-message" class="dialog-message">
            {{ data.message }}
          </p>
        </div>

        <!-- Dialog Actions -->
        <div class="dialog-actions">
          <button type="button" 
                  class="btn btn-outline-secondary"
                  (click)="onCancel()"
                  [attr.aria-label]="'Cancel action'">
            {{ data.cancelText || 'Cancel' }}
          </button>
          <button type="button" 
                  class="btn"
                  [ngClass]="getConfirmButtonClass()"
                  (click)="onConfirm()"
                  [attr.aria-label]="data.confirmText || 'Confirm action'"
                  autofocus>
            {{ data.confirmText || 'Confirm' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay {
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

    .dialog-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      animation: slideIn 0.3s ease-out;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 25px 25px 15px;
    }

    .dialog-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: white;
    }

    .dialog-danger .dialog-icon {
      background: #dc3545;
    }

    .dialog-warning .dialog-icon {
      background: #ffc107;
      color: #856404;
    }

    .dialog-info .dialog-icon {
      background: #17a2b8;
    }

    .dialog-title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: #2c3e50;
    }

    .dialog-body {
      padding: 0 25px 20px;
    }

    .dialog-message {
      margin: 0;
      font-size: 1rem;
      line-height: 1.6;
      color: #6c757d;
    }

    .dialog-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      padding: 20px 25px 25px;
      border-top: 1px solid #e9ecef;
    }

    .btn {
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.9rem;
    }

    .btn-outline-secondary {
      background: transparent;
      border: 2px solid #6c757d;
      color: #6c757d;
    }

    .btn-outline-secondary:hover {
      background: #6c757d;
      color: white;
    }

    .btn-danger {
      background: #dc3545;
      color: white;
    }

    .btn-danger:hover {
      background: #c82333;
    }

    .btn-warning {
      background: #ffc107;
      color: #856404;
    }

    .btn-warning:hover {
      background: #e0a800;
    }

    .btn-info {
      background: #17a2b8;
      color: white;
    }

    .btn-info:hover {
      background: #138496;
    }

    .btn:focus {
      outline: 2px solid #667eea;
      outline-offset: 2px;
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
      .dialog-container {
        width: 95%;
        margin: 20px;
      }

      .dialog-header,
      .dialog-body,
      .dialog-actions {
        padding-left: 20px;
        padding-right: 20px;
      }

      .dialog-actions {
        flex-direction: column-reverse;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }
    }

    /* Accessibility for reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .dialog-overlay,
      .dialog-container {
        animation: none;
      }
    }
  `]
})
export class ConfirmationDialogComponent {
  @Input() isVisible = false;
  @Input() data: ConfirmationData = {
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?'
  };

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm() {
    this.confirmed.emit();
    this.isVisible = false;
  }

  onCancel() {
    this.cancelled.emit();
    this.isVisible = false;
  }

  onOverlayClick() {
    this.onCancel();
  }

  getIconClass(): string {
    const iconMap = {
      danger: 'fas fa-exclamation-triangle',
      warning: 'fas fa-exclamation-circle',
      info: 'fas fa-info-circle'
    };
    
    if (this.data.icon) {
      return this.data.icon;
    }
    
    return iconMap[this.data.type || 'danger'];
  }

  getConfirmButtonClass(): string {
    const classMap = {
      danger: 'btn-danger',
      warning: 'btn-warning',
      info: 'btn-info'
    };
    
    return classMap[this.data.type || 'danger'];
  }
}