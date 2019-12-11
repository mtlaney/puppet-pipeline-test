import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-base-create',
  templateUrl: './base-create.component.html',
  styleUrls: ['./base-create.component.css']
})
export class BaseCreateComponent implements OnInit {
  value: any;
  matcher: any;
  baseForm: FormGroup;
  city: string = '';
  state: string = '';
  manager: string = '';
  acres: string = '';
  employees: string = '';
  description: string = '';
  contact: string = '';

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.baseForm = this.formBuilder.group({
      city: [null, Validators.required],
      state: [null, Validators.required],
      manager: [null, Validators.required],
      acres: [null, Validators.required],
      employees: [null, Validators.required],
      description: [null, Validators.required],
      contact: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postBase(form).subscribe(
      res => {
        let id = res['_id'];
        this.router.navigate(['/base-details', id]);
      },
      err => {
        console.log(err);
      }
    );
  }
}
