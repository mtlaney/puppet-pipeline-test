import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  bases: any;
  displayedColumns = ['city', 'state', 'acres', 'employees', 'manager', 'contact'];
  dataSource = new BaseDataSource(this.api);

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getBases().subscribe(
      res => {
        console.log(res);
        this.bases = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}

export class BaseDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super();
  }
  connect() {
    return this.api.getBases();
  }
  disconnect() {}
}
