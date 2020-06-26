import { Component, OnInit } from '@angular/core';
import { Or2Service } from './../services/or2.service';

@Component({
  selector: 'app-or2user',
  templateUrl: './or2user.component.html',
  styleUrls: ['./or2user.component.css']
})
export class Or2userComponent implements OnInit {

  constructor( public or2:Or2Service ) { }

  ngOnInit(): void {
  }

}
