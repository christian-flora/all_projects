import { Injectable, OnInit } from '@angular/core';
import { Napirend, Classes, ClassesComment, Hours, HoursObj, MasterObj, LanguageObj } from './../orarend.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Or2Service implements OnInit {

  
  // todo: connect to json
  // \{^_^}/ hi! 
  // json-server --watch db.json --p 4400

  
  // todo: drag and drop <- research
  // - btn on :: surface
  // - duplicate and position the btn abow the original btn
  // - draggable allow on duplicated btn
  // - check the parameters on the new btn
  // - master time holder, ready for drop new parameters
  // - add new style to dragd over
  // - on release - save new parameters on the master time
  // - delete new draggable btn

  // - json-ből masterek adatait lekérni, majd kiegészíteni a mentett állományt a nevekkel
  // - Napirend ki lett egészítve egy name? változóval ami eltárolja a jövőben a nevet 

  // todo: connect the master day saver "Teljesítve"
  // - ready the new master day array
  // - upload to json the new array on btn event
  // - refresh the master day done counter


  // hibalista:
  // x commentek száma: szerver indítást követő első megjelenítés hibásan jeleníti meg 
  //   a commentek számát
  // - commentek száma: össze kell kötni a lekérést hogy egyszerre legyen meg az információ
  //   jelenleg sorba van kötve (lekéri langObj-et majd a comment obj)





  // órarend működés:
  //
  // a célom hogy a napomat beosszam, és lássam hogy eggyes osztályokkal
  // (1 osztályt 1 foglalkozási körnek kell tekinteni) mennyit foglalkozom.
  // a munka másod fontosságú, ugyanis én állok a középpontban, és én végzem el.
  // a következő képpen kell elképzelni: 
  // "A oszlop" - általam fontosnak tartott dolgok, "B oszlop" - munka, és az A ráfolyhat a B-re vagy fordítva
  //
  // munkanapos master: 
  //    azt feltételezem hogy dolgoznom kellene, de cserébe inkább a magán dolgaimat csinálom
  //    így az adott órát X-elem ki amikor nem tudtam a maszekkal foglalkozni :D
  //    cél hogy saját lábon álljak és a munkát is egy megrenddelőként kell tekinteni

  
  // EGYÉB SZÖVEGEK
  languageObject: LanguageObj;
  siteName:string = '';
  masterTypes:string = '';
  masterDoneCta:string = '';
  masterDone:string = '';
  archiveCta:string = '';
  statsCta:string = '';
  copyText:string = '';
  userSettings:string = '';
  userLogout:string = '';
  commentTitle:string = '';
  commentHide:string = '';
  commentShow:string = '';
  baseClassesB:string = '';
  baseClassesA:string = '';
  classesAddNew:string = '';
  classesTitle:string = '';
  baseClassesType:string = '';

  // FELHASZNÁLÓ
  // a felhasználó nevét tárolja el
  userName:string = 'Flóra Krisztián';

  // a felhasználó nevét tartalmazza egyelőre
  userObject = { name:this.userName };


  // ÓRA KEZELÉS
  // nagyon fontos, ez irányítja az aktív órák számát
  hoursActive:Hours = [];
  hoursActive2:Hours = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  // napi hivatalos inaktív órák
  hoursSpecial:Hours = [];
  hoursSpecial2:Hours = ['12:00', '13:00', '18:00'];
  // napi hivatalos munkaórák
  hoursWorking:Hours = [];
  hoursWorking2:Hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  // összesíti az órákkal kapcsolatos változókat, hogy könnyebb legyen a kommunikáció
  hoursObject:HoursObj = {
    active: this.hoursActive,
    special: this.hoursSpecial,
    working: this.hoursWorking
  }


  // FOGLALKOZÁSI KÖRÖK
  // nagyon fontos ez vezérli az osztályokat, tartalmazza még a heti aktivitást, rövidített nevet és a rövid leírást
  classesObject:Classes;


  // BEÉGETETT MESTER ÓRAREND
  // napi objektumok, ezek az alapértelmezettek, be vannak égetve
  szabadnaposObj:Napirend = [];
  szabadnaposCounter:number = 0;

  munkanaposObj:Napirend = [];
  munkanaposCounter:number = 0;

  // ez tárolja a mester napokat
  //masterObject:MasterObj;
  masterObject:MasterObj = [
    {name:'Szabadnapos', napirend:this.szabadnaposObj, completed:1 },
    {name:'Munkanapos', napirend:this.munkanaposObj, completed:0 }
  ];
  

  // KOMMENTEK - a megjegyzési körök és adott napi órához
  // comment object, minden megjegyzést tartalmaz
  commentObject:ClassesComment = [];

  // az utolsó X (beállítástól függően) commentet tartalmazza, célja: ezt figyeli a comment component
  inversCommentObj: ClassesComment = [];

  // convert the ID number to Classes name
  getClassesName( idN:number ){

    var className:string;
    for( let classes in this.classesObject ){
      if( this.classesObject[classes].id == idN ){
        className = this.classesObject[classes].name;
        break;
      } else {
        className = 'Error! No ID found!'
      }
    }
    return className;

  }

  // add new comment to the comment array (to the front)
  // ki kell még dolgozni!
  addNewComment( newC:ClassesComment ){

    var newCommentObject:ClassesComment = [];
    newCommentObject = this.commentObject;
    //newCommentObject.unshift( newC );
    this.commentObject = newCommentObject;

  }

  // az összes comment számát tárolja el, inverzComment definiálásához szükséges
  allItems:number;
  // duplikálja, megfordítja és megfelelő hosszra állítja a commenteket
  inverzeComment() {
    
    this.allItems = this.commentObject.length;
    this.commentObject.forEach((element: ClassesComment) => { this.inversCommentObj.push(Object.assign({}, element)) });
    this.cutComment();

  }
  cutComment() {
    this.inversCommentObj.reverse().splice( this.languageObject.commentViewNumber, this.allItems );
    this.inversCommentObj.forEach((element: ClassesComment) => { element.name = this.getClassName(element.ids); });
    //this.inversCommentObj.push(Object.assign({}, element))
  }


  // kategória csere
  classChange( ev:string ) {
    
    if( ev == 'private' || ev == 'work') {
      this.baseClassesType = ev;
      //console.log("fut", ev);
    }
    
  }

  constructor( private http: HttpClient ) {
    
    this.getData();

  }

  postData() {
    
    const postEv = {title:'lkjlkj', author:'lajfebs'};
    this.http.post('http://localhost:4400/posts', postEv ).subscribe( response => {console.log(response);
    });

  }
  getData() {

    this.http.get('http://localhost:4400/LanguageObj').subscribe( 
      (response:LanguageObj) => {
        this.languageObject = response;
        this.siteName = this.languageObject.siteName;
        this.masterTypes = this.languageObject.masterTypes;
        this.masterDoneCta = this.languageObject.masterDoneCta;
        this.masterDone = this.languageObject.masterDone;
        this.archiveCta = this.languageObject.archiveCta;
        this.statsCta = this.languageObject.statsCta;
        this.copyText = this.languageObject.copyText;
        this.userSettings = this.languageObject.userSettings;
        this.userLogout = this.languageObject.userLogout;
        this.commentTitle = this.languageObject.commentTitle;
        this.commentHide = this.languageObject.commentHide;
        this.commentShow = this.languageObject.commentShow;
        this.baseClassesB = this.languageObject.baseClassesB;
        this.baseClassesA = this.languageObject.baseClassesA;
        this.classesAddNew = this.languageObject.classesAddNew;
        this.classesTitle = this.languageObject.classesTitle;
        this.baseClassesType = this.languageObject.baseClassesType;

        // jöhet a classesObj
        this.http.get('http://localhost:4400/classesObject').subscribe( 
          (response:Classes) => {
          this.classesObject = response;
          
          // ha megvan a langObj-t akkor indulhat a comment halászat
          this.http.get('http://localhost:4400/comments').subscribe( 
            (response:ClassesComment) => {
              this.commentObject = response;
              this.inverzeComment();

              this.http.get('http://localhost:4400/szabadnaposObj').subscribe( 
                (response:Napirend) => { 
                  this.szabadnaposObj = response;
                  this.convertMaster('Szabadnapos');
                  // ezt és a következő lépést sokszorosítani kell majd
                  // ahány master napunk van
                  
                  this.http.get('http://localhost:4400/munkanaposObj').subscribe( 
                    (response:Napirend) => { 
                      this.munkanaposObj = response;
                      this.convertMaster('Munkanapos');
                      //this.masterObject[1].napirend = response;
                      // hozzá kell csapni a nevet

                      this.http.get('http://localhost:4400/masterObject').subscribe( 
                        (response:MasterObj) => {
                          //this.masterObject = response;
                          this.szabadnaposCounter = response[0].completed;
                          this.munkanaposCounter = response[1].completed;
                          // ha új masternapot hozok majd létre
                          // ezeket dinamikussá kell tenni

                          this.http.get('http://localhost:4400/hoursActive').subscribe( 
                            (response:{id:number, name:string}) => {
                              //this.hoursActive 
                              this.convertHours(this.hoursActive, response );

                              this.http.get('http://localhost:4400/hoursSpecial').subscribe( 
                                (response:{id:number, name:string}) => {
                                  this.convertHours(this.hoursSpecial, response );

                                  this.http.get('http://localhost:4400/hoursWorking').subscribe( 
                                    (response:{id:number, name:string}) => {
                                      this.convertHours(this.hoursWorking, response );

                                      //console.log(this.hoursObject);
                                      //console.log( 'most ', this.masterObject[0].napirend);
                                      
                                      
                                  } );

                                } );

                          } );

                      } );

                  } );
                  
              } );

          } );

        } );

    } );
      
  }
  convertMaster( nev:string ){

    //console.log('selkj', this.szabadnaposObj);
    if ( nev == 'Szabadnapos'){
      
      // szabadnapos másolás masterobj helyre
      this.szabadnaposObj.forEach( (element:Napirend) => { 

        this.masterObject[0].napirend.push(element);
        let hanyadik:number = this.masterObject[0].napirend.length - 1;
        this.masterObject[0].napirend[hanyadik].name = this.getClassName( this.masterObject[0].napirend[hanyadik].ids );
        
      });
      
      // tömb bővítés, name értékkel
      //console.log('csekk', this.masterObject[0].napirend);
      
    } else if( nev == 'Munkanapos'){
      //this.munkanaposObj
      this.masterObject[1].napirend
      this.munkanaposObj.forEach( (element:Napirend) => { 

        this.masterObject[1].napirend.push(element);
        let hanyadik:number = this.masterObject[1].napirend.length - 1;
        this.masterObject[1].napirend[hanyadik].name = this.getClassName( this.masterObject[1].napirend[hanyadik].ids );
        
      });
    }
    
  }
  convertHours( hova:Hours, mit:any ){
    
    // lehet hogy üríteni kell a "hova" értékét...
    //hova = [];
    mit.forEach( (element:{id:number, name:string}) => { hova.push(element.name) });
    //console.log("hours", hova );

  }
  consoleSomething(){
    //console.log( 'Üzenet: ');
  }
  
  getClassName( ev:number ){
    
    //console.log('itt', ev, this.classesObject.filter( (u: { id: number }) => u.ids == ev ));
    return this.classesObject.filter( (u: { ids: number; }) => u.ids == ev )[0].name;
    
  }
  ngOnInit() {
    
  }

}
