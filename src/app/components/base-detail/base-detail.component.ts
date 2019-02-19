import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-base-detail',
  templateUrl: './base-detail.component.html',
  styleUrls: ['./base-detail.component.css']
})
export class BaseDetailComponent implements OnInit {
  base = {};
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getBaseDetails(this.route.snapshot.params['id']);
  }
  getBaseDetails(id) {
    this.api.getBase(id).subscribe(data => {
      console.log(data);
      this.base = data;
    });
  }
  deleteBase(id) {
    this.api.deleteBase(id).subscribe(
      res => {
        this.router.navigate(['/bases']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
