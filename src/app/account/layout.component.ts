import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AccountService } from '@app/_services';

@Component({ 
    templateUrl: 'layout.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class LayoutComponent {
    private router = inject(Router);
    private accountService = inject(AccountService);

    constructor() {
        // redirect to home if already logged in
        if (this.accountService.accountValue) {
            this.router.navigate(['/']);
        }
    }
}