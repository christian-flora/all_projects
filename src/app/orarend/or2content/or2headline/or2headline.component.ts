import { Component, OnInit } from '@angular/core';
import { Or2Service } from './../../services/or2.service';

@Component({
  selector: 'app-or2headline',
  templateUrl: './or2headline.component.html',
  styleUrls: ['./or2headline.component.css']
})
export class Or2headlineComponent implements OnInit {

  constructor( public or2:Or2Service ) { }

  ngOnInit(): void {
  }

}
