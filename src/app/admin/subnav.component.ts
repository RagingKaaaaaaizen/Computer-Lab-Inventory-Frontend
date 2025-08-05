import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountService } from '@app/_services';
import { Role } from '@app/_models';

@Component({ 
    templateUrl: 'subnav.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class SubNavComponent {
    accountService = inject(AccountService);

    Role = Role;

    hasRole(roles: Role[]): boolean {
        const account = this.accountService.accountValue;
        if (!account) return false;
        return roles.some(role => role === account.role);
    }
}