import { Component, OnInit } from '@angular/core';
import { Or2Service } from './../services/or2.service';

@Component({
  selector: 'app-or2classes2',
  templateUrl: './or2classes2.component.html',
  styleUrls: ['./or2classes2.component.css']
})
export class Or2classes2Component implements OnInit {

  constructor( public or2:Or2Service ) { }

  ngOnInit(): void {

   // this.or2.consoleSomething();
   // console.log( this.or2.classesObject );
    

  }

  // hasznos osztályokat jelenít meg, amiknek az id-je 999 felett van
  hideAcessories( ev:any ){

    var view:boolean = true;
    if( ev.id < 999 ) {
      view = false;
    }
    return view;

  }

}
