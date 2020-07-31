import { Component, OnInit } from '@angular/core';
import { Or2Service } from './../../services/or2.service';

@Component({
  selector: 'app-or2master',
  templateUrl: './or2master.component.html',
  styleUrls: ['./or2master.component.css']
})
export class Or2masterComponent implements OnInit {

  constructor( public or2:Or2Service ) { }
  
  getClassName( ev:number ){
    //return this.or2.classesObject.filter( (u: { id: number; }) => u.id == ev )[0].name;
  }

  ngOnInit(): void {
    //console.log("fut" );
    
  }

}
