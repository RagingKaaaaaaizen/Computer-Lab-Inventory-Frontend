import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ConfirmationData } from '../_components/confirmation-dialog.component';

export interface ConfirmationRequest {
  id: string;
  data: ConfirmationData;
  resolve: (result: boolean) => void;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private confirmationSubject = new Subject<ConfirmationRequest>();
  private currentRequest: ConfirmationRequest | null = null;

  // Observable for components to subscribe to
  confirmation$ = this.confirmationSubject.asObservable();

  /**
   * Show a confirmation dialog
   * @param data The confirmation dialog data
   * @returns Promise that resolves to true if confirmed, false if cancelled
   */
  confirm(data: ConfirmationData): Promise<boolean> {
    return new Promise((resolve) => {
      const id = this.generateId();
      const request: ConfirmationRequest = {
        id,
        data,
        resolve
      };

      this.currentRequest = request;
      this.confirmationSubject.next(request);
    });
  }

  /**
   * Confirm the current dialog
   */
  confirmCurrent(): void {
    if (this.currentRequest) {
      this.currentRequest.resolve(true);
      this.currentRequest = null;
    }
  }

  /**
   * Cancel the current dialog
   */
  cancelCurrent(): void {
    if (this.currentRequest) {
      this.currentRequest.resolve(false);
      this.currentRequest = null;
    }
  }

  /**
   * Quick confirmation for delete actions
   * @param itemName The name of the item being deleted
   * @param itemType The type of item (e.g., 'employee', 'stock item')
   * @returns Promise that resolves to true if confirmed, false if cancelled
   */
  confirmDelete(itemName: string, itemType: string = 'item'): Promise<boolean> {
    return this.confirm({
      title: `Delete ${itemType}`,
      message: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      type: 'danger',
      icon: 'fas fa-trash-alt'
    });
  }

  /**
   * Quick confirmation for dangerous actions
   * @param action The action being performed
   * @param description Additional description of the action
   * @returns Promise that resolves to true if confirmed, false if cancelled
   */
  confirmDangerous(action: string, description?: string): Promise<boolean> {
    return this.confirm({
      title: `Confirm ${action}`,
      message: description || `Are you sure you want to ${action.toLowerCase()}? This action may not be reversible.`,
      confirmText: 'Proceed',
      cancelText: 'Cancel',
      type: 'danger'
    });
  }

  /**
   * Quick confirmation for leaving unsaved changes
   * @returns Promise that resolves to true if confirmed, false if cancelled
   */
  confirmUnsavedChanges(): Promise<boolean> {
    return this.confirm({
      title: 'Unsaved Changes',
      message: 'You have unsaved changes. Are you sure you want to leave this page? Your changes will be lost.',
      confirmText: 'Leave Page',
      cancelText: 'Stay',
      type: 'warning',
      icon: 'fas fa-exclamation-triangle'
    });
  }

  /**
   * Quick confirmation for logout
   * @returns Promise that resolves to true if confirmed, false if cancelled
   */
  confirmLogout(): Promise<boolean> {
    return this.confirm({
      title: 'Sign Out',
      message: 'Are you sure you want to sign out of your account?',
      confirmText: 'Sign Out',
      cancelText: 'Cancel',
      type: 'info',
      icon: 'fas fa-sign-out-alt'
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}