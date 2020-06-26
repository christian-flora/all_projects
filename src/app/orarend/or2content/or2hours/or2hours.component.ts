import { Component, OnInit } from '@angular/core';
import { Or2Service } from './../../services/or2.service';

@Component({
  selector: 'app-or2hours',
  templateUrl: './or2hours.component.html',
  styleUrls: ['./or2hours.component.css']
})
export class Or2hoursComponent implements OnInit {

  constructor( public or2:Or2Service ) { }

  ngOnInit(): void {
  }

}
