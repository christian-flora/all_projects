import { Injectable } from '@angular/core';
import { Napirend, Classes, ClassesComment, Hours, HoursObj, MasterObj, LanguageObj } from './../orarend.component';

@Injectable({
  providedIn: 'root'
})
export class Or2Service {
  
  // EGYÉB SZÖVEGEK
  languageObject:LanguageObj = {
    classesTitle:'Osztályok',
    classesAddNew: 'Osztály hozzáadása',
    baseClassesType: 'private', // work, private, assets (de ezt nem jelenítjük meg)
    baseClassesA: 'Magán',
    baseClassesB: 'Munka',
    commentHide: 'Elrejtés',
    commentTitle: 'Megjegyzések',
    commentViewNumber: 10, // ennyi komment látszódik aktuálisan
    masterDone: 'Eddig:',
    masterDoneCta:'Teljesítve',
    masterTypes: 'Napirend:',
    userLogout: 'Kijelentkezés',
    userSettings: 'Beállítások',
    archiveCta: 'Archives',
    statsCta: 'Stats',
    copyText: 'Orarend.hu',
    siteName: 'Órarend'
  };

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
    {id:1001, type:"private" },
    {id:1009, type:"private" },
    {id:1004, type:"private" },
    {id:1004, type:"private" },
    {id:1004, type:"private" },
    {id:0, type:"private" },
    {id:0, type:"private" },
    {id:1012, type:"private" },
    {id:1012, type:"private" },
    {id:1012, type:"private" },
    {id:1002, type:"private" },
    {id:1002, type:"private" },
    {id:1001, type:"private" }
  ];

  munkanaposObj:Napirend = [
    {id:1001, type:"work" },
    {id:1009, type:"work" },
    {id:1004, type:"work" },
    {id:1004, type:"work" },
    {id:1004, type:"work" },
    {id:0, type:"work" },
    {id:0, type:"work" },
    {id:1012, type:"work" },
    {id:1012, type:"work" },
    {id:1012, type:"work" },
    {id:1002, type:"work" },
    {id:1002, type:"work" },
    {id:1001, type:"work" }
  ];

  // ez tárolja a mester napokat
  masterObject:MasterObj = [
    {name:'Szabadnapos', napirend:this.szabadnaposObj, completed:1 },
    {name:'Munkanapos', napirend:this.munkanaposObj, completed:0 }
  ];
  

  // KOMMENTEK - a megjegyzési körök és adott napi órához
  // comment object, minden megjegyzést tartalmaz
  commentObject:ClassesComment = [
    { id:1004, hour:'12:22:31', comment:'Ide jön az üzi1' },
    { id:1005, hour:'12:22:31', comment:'Ide jön az üzi2' },
    { id:1006, hour:'12:22:31', comment:'Ide jön az üzi3' },
    { id:1004, hour:'12:22:31', comment:'Ide jön az üzi4' },
    { id:1007, hour:'12:22:31', comment:'Ide jön az üzi5' },
    { id:1008, hour:'12:22:31', comment:'Ide jön az üzi6' },
    { id:1009, hour:'12:22:31', comment:'Ide jön az üzi7' },
    { id:1010, hour:'12:22:31', comment:'Ide jön az üzi8' },
    { id:1004, hour:'12:22:31', comment:'Ide jön az üzi9' },
    { id:1004, hour:'12:22:31', comment:'Ide jön az üziö' },
    { id:1011, hour:'12:22:31', comment:'Ide jön az üzi00' },
    { id:1004, hour:'12:22:31', comment:'Ide jön az üzi11' },
    { id:1012, hour:'12:22:31', comment:'Ide jön az üzi12' },
    { id:1004, hour:'12:22:31', comment:'Ide jön az üzi13' },
    { id:1014, hour:'12:22:31', comment:'Ide jön az üzi14' },
    { id:1004, hour:'12:22:31', comment:'Ide jön az üzi15' },
    { id:1005, hour:'12:22:31', comment:'Ide jön az üzi16' },
    { id:1003, hour:'12:22:31', comment:'Ide jön az üzi17' }
  ];

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


  // kategória csere
  classChange( ev:string ) {
    
    if( ev == 'private' || ev == 'work') {
      this.languageObject.baseClassesType = ev;
      console.log("fut", ev);
    }
    
  }

  constructor() { }

  consoleSomething(){
    console.log( 'Üzenet: ');
  }

}
