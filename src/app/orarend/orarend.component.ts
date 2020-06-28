import { Component, OnInit } from '@angular/core';

// todo
// - fejlesztés: nap végén, vagy következő nap elején küldjön üzenetet ha nem lett kitöltve és eltárolva a nap, e-mailben javaslat: arra hogy üres napot rögzítek vagy link az oldalra
// - miért futnak le 2x a hivatkozások?
// - hogy lehet a tömb első X elemét megjeleníteni? (mondjuk 5000-ből az első 10-et)
// - hogy lehet egy tömböt visszafele megjeleníteni? szóval az időben az utolsó 10 bejegyzést
// - js-el lehet valahogy számolni az elfoglalt szélességet magasságot? egyáltalán érdemes számolni?


// master class definíciója, meglévő vagy új mester napirend használja
export interface Napirend {
  [index:number]:{ place:string, id:number, type:string }
}


// kommunikációs giga tömb, az összes osztályt tárolja az osztályos megjegyzésekkel
export interface Classes {
  [x:string]:any;
  [index:number]: {id:number, name:string, fullName:string, nameComment:string, activity:number, type:string}
}
// a classesObject megjegyzéseket tárolja
export interface ClassesComment {
  [x: string]: any;
  [index:number] : {id:number, hour:string, comment:string}
}


// órák eltárolására szolgál
export interface Hours {
  [x:string]: any;
  [index:number]:string
}
// kommunikációs tömb, tartalmazza az összes órával kapcsolatos információt
export interface HoursObj {
  active:Hours, special:Hours, working:Hours
}


// mester órarend communikációja
export interface MasterObj {
  [index:number ] : {name:string, napirend:Napirend, completed:number}
}


// Egyéb szövegek nyelvi fájla
export interface LanguageObj {
  
  classesTitle:string, // osztály megnevezése
  classesAddNew:string, // osztályhoz új felvétel
  baseClassesType:string, // megjelenítendő kategória privát / work, van még az assets de az csak a működéshez használt, nem megjelenítendő
  userSettings:string, // felhasználó név alatti beállítások
  userLogout:string, // felhasználó név alatti  kilépés
  masterTypes:string, // mester osztályok gyűjtő megnevezése
  masterDoneCta:string, // mester osztály teljesítve
  masterDone:string, // mester osztály ennyiszer
  commentTitle:string, // megjegyzés
  commentHide:string, // megjegyzés elrejtése
  siteName:string,  // az oldal nevét tartalmazza
  archiveCta:string,
  statsCta:string,
  copyText:string,
  baseClassesA:string,
  baseClassesB:string,
  commentViewNumber:number  // hány hozzászólás látszódjon

}



@Component({
  selector: 'app-orarend',
  templateUrl: './orarend.component.html',
  styleUrls: ['./orarend.component.css']
})
export class OrarendComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
    
  }

}
