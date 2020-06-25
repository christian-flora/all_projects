import { Component, OnInit } from '@angular/core';
import { Or2Service } from './../services/or2.service';

@Component({
  selector: 'app-or2content',
  templateUrl: './or2content.component.html',
  styleUrls: ['./or2content.component.css']
})
export class Or2contentComponent implements OnInit {

  constructor( public or2:Or2Service ) { }

  ngOnInit(): void {
  }

}
