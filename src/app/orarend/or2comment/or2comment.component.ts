import { Component, OnInit } from '@angular/core';
import { Or2Service } from './../services/or2.service';

// interface
import { ClassesComment } from '../orarend.component';

@Component({
  selector: 'app-or2comment',
  templateUrl: './or2comment.component.html',
  styleUrls: ['./or2comment.component.css']
})
export class Or2commentComponent implements OnInit {

  constructor( public or2:Or2Service ) { 
    
  }
  
  
  myDate = new Date();
  //inversCommentObj:ClassesComment = [];
  //allItems:number = this.or2.commentObject.length;
  show = true;

  // on service
  // todo drag and drop
  // - btn on :: surface
  // - duplicate and position the btn abow the original btn
  // - draggable allow on duplicated btn
  // - check the parameters on the new btn
  // - master time holder, ready for drop new parameters
  // - add new style to dragd over
  // - on release - save new parameters on the master time
  // - delete new draggable btn

  // - ready the new master day array
  // - upload to json the new array on btn event

  getMyDate2() {

    var maDate2:string;

    var month = this.myDate.getUTCMonth()+1;
    var month2:string;
    
    if( month < 10 ){
      month2 = "0"+month.toString();
    } else {
      month2 = month.toString();
    }

    var dayy = this.myDate.getUTCDate();
    var dayy2:string;
    if( dayy <10 ){
      dayy2 = "0" + dayy.toString();
    } else {
      dayy2 = dayy.toString();
    }
    
    maDate2 = month2 + ". " + dayy2 + ".";
    return maDate2;

  }
  setShow(){
    return this.show = !this.show;
  }

  
  ngOnInit(): void {
    
    //this.inversCommentObj = this.or2.commentObject.reverse();
    //this.inversCommentObj = this.inversCommentObj.splice( this.or2.languageObject.commentViewNumber, this.allItems );
    //console.log("teszt: ", this.or2.languageObject );
    
    //console.log( this.inversCommentObj );
    //commentViewNumber
    //console.log( 'kl', this.myDate.getUTCMonth()+1, this.myDate.getUTCDate() );
    
  }

}
