import { Component, OnInit } from '@angular/core';
import { Or2Service } from './../../services/or2.service';

@Component({
  selector: 'app-or2links',
  templateUrl: './or2links.component.html',
  styleUrls: ['./or2links.component.css']
})
export class Or2linksComponent implements OnInit {

  constructor( public or2:Or2Service ) { }

  ngOnInit(): void {
  }

}
