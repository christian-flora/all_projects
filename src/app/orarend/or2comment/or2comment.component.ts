import { Component, OnInit } from '@angular/core';
import { Or2Service } from './../services/or2.service';
import { ClassesComment } from '../orarend.component';

@Component({
  selector: 'app-or2comment',
  templateUrl: './or2comment.component.html',
  styleUrls: ['./or2comment.component.css']
})
export class Or2commentComponent implements OnInit {

  constructor( public or2:Or2Service ) { }
  
  myDate = new Date();
  inversCommentObj:ClassesComment = [];
  allItems:number = this.or2.commentObject.length;

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

  
  ngOnInit(): void {
    
    this.inversCommentObj = this.or2.commentObject.reverse();
    
    this.inversCommentObj = this.inversCommentObj.splice( this.or2.languageObject.commentViewNumber, this.allItems );
    console.log( this.inversCommentObj );
    //commentViewNumber
    //console.log( 'kl', this.myDate.getUTCMonth()+1, this.myDate.getUTCDate() );
    
  }

}
