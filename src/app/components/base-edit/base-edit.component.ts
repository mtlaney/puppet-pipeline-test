import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-base-edit',
  templateUrl: './base-edit.component.html',
  styleUrls: ['./base-edit.component.css']
})
export class BaseEditComponent implements OnInit {
  value: any;
  matcher: any;
  baseForm: FormGroup;
  id: string = '';
  city: string = '';
  state: string = '';
  manager: string = '';
  acres: string = '';
  employees: string = '';
  description: string = '';
  contact: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getBase(this.route.snapshot.params['id']);
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

  getBase(id) {
    this.api.getBase(id).subscribe(data => {
      this.id = data._id;
      this.baseForm.setValue({
        city: data.city,
        state: data.state,
        manager: data.manager,
        acres: data.acres,
        employees: data.employees,
        description: data.description,
        contact: data.contact
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateBase(this.id, form).subscribe(
      res => {
        let id = res['_id'];
        this.router.navigate(['/book-details', id]);
      },
      err => {
        console.log(err);
      }
    );
  }

  bookDetails() {
    this.router.navigate(['/base-details', this.id]);
  }
}
