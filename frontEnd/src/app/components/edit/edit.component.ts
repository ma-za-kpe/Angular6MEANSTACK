import { Component, OnInit } from '@angular/core';
import {IssueService} from '../../issue.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material';
import { Issue } from '../../issue.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  issue: any = {};
  updateForm: FormGroup;

  constructor(private issueService: IssueService,
     private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {

      this.createfOrm();
   }

   createfOrm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: '',
      status: ''
    });
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.issueService.getIssuesById(this.id).subscribe(res => {
        this.issue = res;
        this.updateForm.get('title').setValue(this.issue.title);
        this.updateForm.get('responsible').setValue(this.issue.responsible);
        this.updateForm.get('description').setValue(this.issue.description);
        this.updateForm.get('severity').setValue(this.issue.severity);
        this.updateForm.get('status').setValue(this.issue.status);
      });
    });
  }

  updateIssue(title, responsible, description, severity, status) {
    this.issueService.updateIssues(this.id, title, responsible, description, severity, status).subscribe(() => {
      this.snackBar.open('Issue Updated success', 'OK', {
        duration: 3000
      });
    });
  }

}
