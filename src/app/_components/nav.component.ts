import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '@app/_services';
import { Role } from '@app/_models';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Mobile Overlay -->
    <div class="sidebar-overlay" 
         [class.active]="isMobileOpen" 
         (click)="closeMobileSidebar()"
         [attr.aria-hidden]="!isMobileOpen"
         role="button"
         tabindex="0"
         (keydown.escape)="closeMobileSidebar()"
         [attr.aria-label]="'Close navigation menu'"></div>
    
    <!-- Sidebar -->
    <nav class="sidebar" 
         [ngClass]="{ 
           'collapsed': isCollapsed && !isMobile, 
           'mobile-open': isMobileOpen,
           'mobile': isMobile 
         }"
         role="navigation"
         [attr.aria-label]="'Main navigation'"
         [attr.aria-expanded]="!isCollapsed || isMobileOpen">
      
      <!-- Sidebar Header -->
      <div class="sidebar-header">
        <div class="brand" role="banner">
          <i class="fas fa-boxes" aria-hidden="true"></i>
          <span class="brand-text" 
                *ngIf="!isCollapsed || isMobile"
                [attr.aria-label]="'Inventory Pro Application'">Inventory Pro</span>
        </div>
        <div class="header-actions">
          <button class="toggle-btn mobile-toggle" 
                  (click)="toggleMobileSidebar()"
                  *ngIf="isMobile"
                  [attr.aria-label]="isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'"
                  [attr.aria-expanded]="isMobileOpen"
                  type="button">
            <i class="fas fa-bars" aria-hidden="true"></i>
            <span class="sr-only">Toggle mobile navigation</span>
          </button>
          <button class="toggle-btn desktop-toggle" 
                  (click)="toggleSidebar()"
                  *ngIf="!isMobile"
                  [attr.aria-label]="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
                  [attr.aria-expanded]="!isCollapsed"
                  type="button">
            <i class="fas fa-chevron-left" 
               [class.rotated]="isCollapsed" 
               aria-hidden="true"></i>
            <span class="sr-only">{{isCollapsed ? 'Expand' : 'Collapse'}} sidebar</span>
          </button>
        </div>
      </div>

      <!-- User Profile Section -->
      <div class="user-profile" 
           *ngIf="accountService.accountValue"
           role="region"
           [attr.aria-label]="'User profile information'">
        <div class="user-avatar" role="img" [attr.aria-label]="'User avatar'">
          <i class="fas fa-user-circle" aria-hidden="true"></i>
        </div>
        <div class="user-info" 
             *ngIf="!isCollapsed || isMobile"
             [attr.aria-label]="'Current user: ' + accountService.accountValue.firstName + ' ' + accountService.accountValue.lastName + ', Role: ' + accountService.accountValue.role">
          <div class="user-name">{{ accountService.accountValue.firstName }} {{ accountService.accountValue.lastName }}</div>
          <div class="user-role">{{ accountService.accountValue.role }}</div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <div class="sidebar-nav" role="navigation" [attr.aria-label]="'Main navigation menu'">
        <ul class="nav-list" role="list">
          <!-- Dashboard -->
          <li class="nav-item" role="listitem">
            <a class="nav-link" 
               routerLink="/" 
               routerLinkActive="active" 
               [routerLinkActiveOptions]="{exact: true}"
               (click)="closeMobileSidebar()"
               [attr.aria-label]="'Dashboard - Main dashboard page'"
               [attr.aria-current]="isActiveRoute('/') ? 'page' : null">
              <i class="fas fa-tachometer-alt" aria-hidden="true"></i>
              <span *ngIf="!isCollapsed || isMobile">Dashboard</span>
              <span class="tooltip" 
                    *ngIf="isCollapsed && !isMobile"
                    role="tooltip">Dashboard</span>
            </a>
          </li>

          <!-- Stocks -->
          <li class="nav-item" *ngIf="hasRole([Role.SuperAdmin, Role.Admin, Role.Viewer])" role="listitem">
            <a class="nav-link" 
               routerLink="/stocks" 
               routerLinkActive="active"
               (click)="closeMobileSidebar()"
               [attr.aria-label]="'Stocks - View and manage inventory stocks'"
               [attr.aria-current]="isActiveRoute('/stocks') ? 'page' : null">
              <i class="fas fa-boxes" aria-hidden="true"></i>
              <span *ngIf="!isCollapsed || isMobile">Stocks</span>
              <span class="tooltip" 
                    *ngIf="isCollapsed && !isMobile"
                    role="tooltip">Stocks</span>
            </a>
          </li>

          <!-- Disposals -->
          <li class="nav-item" *ngIf="hasRole([Role.SuperAdmin, Role.Admin, Role.Viewer])" role="listitem">
            <a class="nav-link" 
               routerLink="/dispose" 
               routerLinkActive="active"
               (click)="closeMobileSidebar()"
               [attr.aria-label]="'Disposals - View and manage disposed items'"
               [attr.aria-current]="isActiveRoute('/dispose') ? 'page' : null">
              <i class="fas fa-trash-alt" aria-hidden="true"></i>
              <span *ngIf="!isCollapsed || isMobile">Disposals</span>
              <span class="tooltip" 
                    *ngIf="isCollapsed && !isMobile"
                    role="tooltip">Disposals</span>
            </a>
          </li>

          <!-- Add Items -->
          <li class="nav-item" *ngIf="hasRole([Role.SuperAdmin, Role.Admin])" role="listitem">
            <a class="nav-link" 
               routerLink="/add" 
               routerLinkActive="active"
               (click)="closeMobileSidebar()"
               [attr.aria-label]="'Add Items - Add new inventory items, categories, and brands'"
               [attr.aria-current]="isActiveRoute('/add') ? 'page' : null">
              <i class="fas fa-plus-circle" aria-hidden="true"></i>
              <span *ngIf="!isCollapsed || isMobile">Add Items</span>
              <span class="tooltip" 
                    *ngIf="isCollapsed && !isMobile"
                    role="tooltip">Add Items</span>
            </a>
          </li>

          <!-- PC Management -->
          <li class="nav-item" *ngIf="hasRole([Role.SuperAdmin, Role.Admin])" role="listitem">
            <a class="nav-link" 
               routerLink="/pc" 
               routerLinkActive="active"
               (click)="closeMobileSidebar()"
               [attr.aria-label]="'PC Management - Manage computer systems'"
               [attr.aria-current]="isActiveRoute('/pc') ? 'page' : null">
              <i class="fas fa-desktop" aria-hidden="true"></i>
              <span *ngIf="!isCollapsed || isMobile">PC Management</span>
              <span class="tooltip" 
                    *ngIf="isCollapsed && !isMobile"
                    role="tooltip">PC Management</span>
            </a>
          </li>

          <!-- Admin Panel -->
          <li class="nav-item" *ngIf="hasRole([Role.SuperAdmin])" role="listitem">
            <a class="nav-link" 
               routerLink="/admin" 
               routerLinkActive="active"
               (click)="closeMobileSidebar()"
               [attr.aria-label]="'Admin Panel - Administrative functions and settings'"
               [attr.aria-current]="isActiveRoute('/admin') ? 'page' : null">
              <i class="fas fa-cogs" aria-hidden="true"></i>
              <span *ngIf="!isCollapsed || isMobile">Admin Panel</span>
              <span class="tooltip" 
                    *ngIf="isCollapsed && !isMobile"
                    role="tooltip">Admin Panel</span>
            </a>
          </li>

          <!-- Manage Accounts -->
          <li class="nav-item" *ngIf="hasRole([Role.SuperAdmin])" role="listitem">
            <a class="nav-link" 
               routerLink="/admin/accounts" 
               routerLinkActive="active"
               (click)="closeMobileSidebar()"
               [attr.aria-label]="'Manage Accounts - Manage user accounts and permissions'"
               [attr.aria-current]="isActiveRoute('/admin/accounts') ? 'page' : null">
              <i class="fas fa-users-cog" aria-hidden="true"></i>
              <span *ngIf="!isCollapsed || isMobile">Manage Accounts</span>
              <span class="tooltip" 
                    *ngIf="isCollapsed && !isMobile"
                    role="tooltip">Manage Accounts</span>
            </a>
          </li>

          <!-- Profile -->
          <li class="nav-item" role="listitem">
            <a class="nav-link" 
               routerLink="/profile" 
               routerLinkActive="active"
               (click)="closeMobileSidebar()"
               [attr.aria-label]="'Profile - View and edit your profile information'"
               [attr.aria-current]="isActiveRoute('/profile') ? 'page' : null">
              <i class="fas fa-user" aria-hidden="true"></i>
              <span *ngIf="!isCollapsed || isMobile">Profile</span>
              <span class="tooltip" 
                    *ngIf="isCollapsed && !isMobile"
                    role="tooltip">Profile</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Sidebar Footer -->
      <div class="sidebar-footer" role="region" [attr.aria-label]="'User actions'">
        <button class="logout-btn" 
                (click)="logout()"
                type="button"
                [attr.aria-label]="'Logout from the application'">
          <i class="fas fa-sign-out-alt" aria-hidden="true"></i>
          <span *ngIf="!isCollapsed || isMobile">Logout</span>
          <span class="tooltip" 
                *ngIf="isCollapsed && !isMobile"
                role="tooltip">Logout</span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 280px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1000;
      box-shadow: 2px 0 20px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
    }

    .sidebar.collapsed {
      width: 70px;
    }

    .sidebar.mobile {
      transform: translateX(-100%);
      width: 280px;
    }

    .sidebar.mobile-open {
      transform: translateX(0);
    }

    .sidebar-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.5);
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .sidebar-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      min-height: 80px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.5rem;
      font-weight: bold;
    }

    .brand i {
      font-size: 2rem;
      color: #ffd700;
      transition: all 0.3s ease;
    }

    .brand-text {
      transition: all 0.3s ease;
    }

    .header-actions {
      display: flex;
      gap: 10px;
    }

    .toggle-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
    }

    .toggle-btn:hover {
      background: rgba(255,255,255,0.1);
      transform: scale(1.1);
    }

    .toggle-btn.rotated i {
      transform: rotate(180deg);
    }

    .mobile-toggle {
      display: none;
    }

    .desktop-toggle {
      display: flex;
    }

    .user-profile {
      display: flex;
      align-items: center;
      padding: 20px;
      gap: 12px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      min-height: 80px;
    }

    .user-avatar i {
      font-size: 2.5rem;
      color: #ffd700;
    }

    .user-info {
      flex: 1;
      transition: all 0.3s ease;
    }

    .user-name {
      font-weight: bold;
      font-size: 0.9rem;
      margin-bottom: 4px;
    }

    .user-role {
      font-size: 0.8rem;
      opacity: 0.8;
      text-transform: capitalize;
    }

    .sidebar-nav {
      flex: 1;
      padding: 20px 0;
      overflow-y: auto;
    }

    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      margin-bottom: 5px;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 15px 20px;
      color: white;
      text-decoration: none;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
      position: relative;
    }

    .nav-link:hover {
      background: rgba(255,255,255,0.1);
      border-left-color: #ffd700;
      color: white;
      text-decoration: none;
      transform: translateX(5px);
    }

    .nav-link.active {
      background: rgba(255,255,255,0.15);
      border-left-color: #ffd700;
    }

    .nav-link i {
      font-size: 1.2rem;
      width: 20px;
      text-align: center;
      transition: all 0.3s ease;
    }

    .tooltip {
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      background: #333;
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 0.8rem;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1001;
      margin-left: 10px;
    }

    .tooltip::before {
      content: '';
      position: absolute;
      left: -5px;
      top: 50%;
      transform: translateY(-50%);
      border: 5px solid transparent;
      border-right-color: #333;
    }

    .nav-link:hover .tooltip {
      opacity: 1;
      visibility: visible;
    }

    .sidebar-footer {
      padding: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    .logout-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      background: rgba(255,255,255,0.1);
      border: none;
      color: white;
      padding: 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
    }

    .logout-btn:hover {
      background: rgba(255,255,255,0.2);
      transform: translateY(-2px);
    }

    .logout-btn i {
      font-size: 1.1rem;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
        width: 280px;
      }
      
      .sidebar.mobile-open {
        transform: translateX(0);
      }

      .mobile-toggle {
        display: flex;
      }

      .desktop-toggle {
        display: none;
      }

      .sidebar.collapsed {
        width: 280px;
      }

      .brand-text,
      .user-info,
      .nav-link span,
      .logout-btn span {
        display: block !important;
      }

      .tooltip {
        display: none !important;
      }
    }

    @media (min-width: 769px) {
      .sidebar-overlay {
        display: none;
      }
    }

    /* Screen reader only text */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Enhanced focus indicators for accessibility */
    .toggle-btn:focus,
    .nav-link:focus,
    .logout-btn:focus {
      outline: 3px solid #ffd700;
      outline-offset: 2px;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .sidebar {
        border-right: 2px solid white;
      }
      
      .nav-link {
        border: 1px solid transparent;
      }
      
      .nav-link:focus {
        border-color: white;
      }
    }

    /* Reduced motion accessibility */
    @media (prefers-reduced-motion: reduce) {
      .sidebar,
      .nav-link,
      .toggle-btn,
      .logout-btn {
        transition: none;
      }
      
      .nav-link:hover {
        transform: none;
      }
    }

    /* Keyboard navigation enhancements */
    .nav-link:focus-visible {
      background: rgba(255,255,255,0.2);
      border-left-color: #ffd700;
    }

    /* Scrollbar Styling */
    .sidebar-nav::-webkit-scrollbar {
      width: 6px;
    }

    .sidebar-nav::-webkit-scrollbar-track {
      background: rgba(255,255,255,0.1);
      border-radius: 3px;
    }

    .sidebar-nav::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.3);
      border-radius: 3px;
    }

    .sidebar-nav::-webkit-scrollbar-thumb:hover {
      background: rgba(255,255,255,0.5);
    }
  `]
})
export class NavComponent {
  private router = inject(Router);
  accountService = inject(AccountService);

  Role = Role;
  isCollapsed = false;
  isMobile = false;
  isMobileOpen = false;

  constructor() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.isMobileOpen = false;
    }
  }

  hasRole(roles: Role[]): boolean {
    const account = this.accountService.accountValue;
    if (!account) return false;
    
    const userRole = account.role;
    return roles.some(role => role === userRole);
  }

  toggleSidebar() {
    if (!this.isMobile) {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  toggleMobileSidebar() {
    this.isMobileOpen = !this.isMobileOpen;
  }

  closeMobileSidebar() {
    if (this.isMobile) {
      this.isMobileOpen = false;
    }
  }

  logout() {
    this.accountService.logout();
  }
  
  isActiveRoute(route: string): boolean {
    return this.router.url === route || this.router.url.startsWith(route + '/');
  }
} 