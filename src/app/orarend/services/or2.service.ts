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

  // todo: connect the master day saver "Teljesítve"
  // - ready the new master day array
  // - upload to json the new array on btn event
  // - refresh the master day done counter


  // hibalista:
  // x commentek száma: szerver indítást követő első megjelenítés hibásan jeleníti meg 
  //   a commentek számát
  // - commentek száma: össze kell kötni a lekérést hogy egyszerre legyen meg az információ





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

  // FELHASZNÁLÓ
  // a felhasználó nevét tárolja el
  userName:string = 'Flóra Krisztián';

  // a felhasználó nevét tartalmazza egyelőre
  userObject = { name:this.userName };


  // ÓRA KEZELÉS
  // nagyon fontos, ez irányítja az aktív órák számát
  hoursActive:Hours = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  // napi hivatalos inaktív órák
  hoursSpecial:Hours = ['12:00', '13:00', '18:00'];
  // napi hivatalos munkaórák
  hoursWorking:Hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  // összesíti az órákkal kapcsolatos változókat, hogy könnyebb legyen a kommunikáció
  hoursObject:HoursObj = {
    active: this.hoursActive,
    special: this.hoursSpecial,
    working: this.hoursWorking
  }


  // FOGLALKOZÁSI KÖRÖK
  // nagyon fontos ez vezérli az osztályokat, tartalmazza még a heti aktivitást, rövidített nevet és a rövid leírást
  classesObject:Classes = [
    // beégetett id 1000 alatti, működéshez használt
    { id:0, name:'---', fullName:'Dokumentálatlan idő', nameComment:'igazi lustiidő', activity: 0, type:"assets" },
    { id:1, name:'Húzd ide', fullName:'Alapértelmezetten üres foglalkozás', nameComment:'Kitöltésre vár', activity: 0, type:"assets" },
    // manuálisan létrehozott foglalkozási és munka óra típusok
    { id:1001, name:'Tesi', fullName:'Testnevelés', nameComment:'Fontos a napi rendszeres mozgás', activity: 3, type:"private" },
    { id:1002, name:'Fotózás', fullName:'Fotózás fejlesztés', nameComment:'Fotózással kapcsolatos önfejlesztés', activity: 0, type:"private" },
    { id:1003, name:'CSS', fullName:'Cascading Style Sheets tanulás', nameComment:'CSS-el kapcsolatos önfejlesztés', activity: 3, type:"private" },
    { id:1004, name:'Angular', fullName:'Angular tanulás', nameComment:'Angular rendszer kiismerése', activity: 3, type:"private" },
    { id:1005, name:'JS', fullName:'JavaScript tanulás', nameComment:'JS ismeretek önfejlesztése', activity: 3, type:"private" },
    { id:1006, name:'Animáció', fullName:'Animációs látásmód fejlesztés', nameComment:'Animációs látásmód fejlesztése', activity: 3, type:"private" },
    { id:1007, name:'HTML', fullName:'HTML tanulás', nameComment:'HTLM ismeretek fejlesztése', activity: 3, type:"private" },
    { id:1008, name:'Céges Dolgok', fullName:'Hivatalos feladatok', nameComment:'Céggel kapcsolatos feladatok', activity: 3, type:"private" },
    { id:1009, name:'Webdesign', fullName:'Honlap tervezés', nameComment:'Digitális megjelenés látásmódjának a fejlesztése', activity: 3, type:"private" },
    { id:1010, name:'Tipográfia', fullName:'Tipográfia gyakorlása', nameComment:'Kommunikációs hierarchia megjelenítése', activity: 3, type:"private" },
    { id:1011, name:'Fotóretusálás', fullName:'Fotóretusálás gyakorlása', nameComment:'Fotók megjelenítésének a feljavítása', activity: 3, type:"private" },
    { id:1012, name:'Angol', fullName:'Angol nyelvtanulás', nameComment:'Angol nyelv tanulása', activity: 3, type:"private" },
    { id:1013, name:'Montázs', fullName:'Képek Montázsolása', nameComment:'Több kép összevágása hogy egy új képet alkosson', activity: 3, type:"private" },
    { id:1014, name:'Kalligráfia', fullName:'Kalligráfia gyakorlás', nameComment:'Kézírás fejlesztés', activity: 3, type:"private" },
    { id:1015, name:'Munka keresés', fullName:'Állás és Munka keresés', nameComment:'Új állás és munka keresés', activity: 3, type:"private" },
    { id:1016, name:'Sommersby', fullName:'Februári bannerek', nameComment:'6 méretben mutálandó, 640x360, 970x250...', activity: 3, type:"work" }
  ];


  // BEÉGETETT MESTER ÓRAREND
  // napi objektumok, ezek az alapértelmezettek, be vannak égetve
  szabadnaposObj:Napirend = [
    {place:'07:00', id:1001, type:"private" },
    {place:'08:00', id:1009, type:"private" },
    {place:'09:00', id:1004, type:"private" },
    {place:'10:00', id:1004, type:"private" },
    {place:'11:00', id:1004, type:"private" },
    {place:'12:00', id:0, type:"private" },
    {place:'13:00', id:0, type:"private" },
    {place:'14:00', id:1012, type:"private" },
    {place:'15:00', id:1012, type:"private" },
    {place:'16:00', id:1012, type:"private" },
    {place:'17:00', id:1002, type:"private" },
    {place:'18:00', id:1002, type:"private" },
    {place:'19:00', id:1001, type:"private" }
  ];

  munkanaposObj:Napirend = [
    {place:'07:00', id:1001, type:"work" },
    {place:'08:00', id:1009, type:"work" },
    {place:'09:00', id:1004, type:"work" },
    {place:'10:00', id:1004, type:"work" },
    {place:'11:00', id:1004, type:"work" },
    {place:'12:00', id:0, type:"work" },
    {place:'13:00', id:0, type:"work" },
    {place:'14:00', id:1012, type:"work" },
    {place:'15:00', id:1012, type:"work" },
    {place:'16:00', id:1012, type:"work" },
    {place:'17:00', id:1002, type:"work" },
    {place:'18:00', id:1002, type:"work" },
    {place:'19:00', id:1001, type:"work" }
  ];

  // ez tárolja a mester napokat
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
  }


  // kategória csere
  classChange( ev:string ) {
    
    if( ev == 'private' || ev == 'work') {
      this.languageObject.baseClassesType = ev;
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
          this.cutComment();

        // ha megvan a langObj-t akkor indulhat a comment halászat
        this.http.get('http://localhost:4400/comments').subscribe( 
          (response:ClassesComment) => {
            this.commentObject = response;
            this.inverzeComment();
          }
          );

       }
      );
      
  }
  consoleSomething(){
    //console.log( 'Üzenet: ');
  }
  ngOnInit() {
    
  }

}
