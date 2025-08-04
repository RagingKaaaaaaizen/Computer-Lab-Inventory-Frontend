import { Component, OnInit, inject } from '@angular/core';
import { WorkflowService } from '@app/_services/workflow.service';
import { Workflow } from '@app/_models/workflow';
import { AlertService } from '@app/_services/alert.service';

@Component({
    selector: 'app-workflow-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
    private workflowService = inject(WorkflowService);
    private alertService = inject(AlertService);

    workflows: Workflow[] = [];
    isDeleting = false;

    ngOnInit() {
        this.loadWorkflows();
    }

    loadWorkflows() {
        this.workflowService.getAll()
            .subscribe({
                next: (workflows) => {
                    this.workflows = workflows;
                },
                error: (error) => {
                    this.alertService.error('Error loading workflows');
                    console.error('Error loading workflows:', error);
                }
            });
    }

    deleteWorkflow(id: string) {
        if (confirm('Are you sure you want to delete this workflow?')) {
            this.isDeleting = true;
            this.workflowService.delete(id)
                .subscribe({
                    next: () => {
                        this.workflows = this.workflows.filter(x => x.id !== id);
                        this.alertService.success('Workflow deleted successfully');
                    },
                    error: (error) => {
                        this.alertService.error('Error deleting workflow');
                        console.error('Error deleting workflow:', error);
                    },
                    complete: () => {
                        this.isDeleting = false;
                    }
                });
        }
    }
}