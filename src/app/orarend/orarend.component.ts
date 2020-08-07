import { Component, OnInit } from '@angular/core';
import { Or2Service } from './services/or2.service';

// todo
// - fejlesztés: nap végén, vagy következő nap elején küldjön üzenetet ha nem lett kitöltve és eltárolva a nap, e-mailben javaslat: arra hogy üres napot rögzítek vagy link az oldalra
// - miért futnak le 2x a hivatkozások?
// - hogy lehet a tömb első X elemét megjeleníteni? (mondjuk 5000-ből az első 10-et)
// - hogy lehet egy tömböt visszafele megjeleníteni? szóval az időben az utolsó 10 bejegyzést
// - js-el lehet valahogy számolni az elfoglalt szélességet magasságot? egyáltalán érdemes számolni?


// master class definíciója, meglévő vagy új mester napirend használja
export interface Napirend {
  [x:string]: any;
  [index:number]:{ place:string, id:number, ids:number, type:string, name?:string }
}


// kommunikációs giga tömb, az összes osztályt tárolja az osztályos megjegyzésekkel
export interface Classes {
  [x:string]:any;
  [index:number]: {id:number, name:string, fullName:string, nameComment:string, activity:number, type:string}
}
// a classesObject megjegyzéseket tárolja
export interface ClassesComment {
  [x: string]: any;
  [index:number] : {id?:number, ids:number, hour:string, comment:string, name?:string, commentDate:string }
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
  commentShow:string,  // fentinek a párja, a mutat
  siteName:string,  // az oldal nevét tartalmazza
  archiveCta:string,
  statsCta:string,
  copyText:string,
  baseClassesA:string,
  commentViewNumber:number,  // hány hozzászólás látszódjon
  baseClassesB:string,
  // ezek az új megjegyzés hozzáadásához szükségesek,
  newName:string,
  doneName:string,
  abortName:string,
  activeClassName:string,
  commentName:string,
  basicCopyFormfield:string

}



@Component({
  selector: 'app-orarend',
  templateUrl: './orarend.component.html',
  styleUrls: ['./orarend.component.css']
})
export class OrarendComponent implements OnInit {

  constructor( public or2:Or2Service ) { }
  
  ngOnInit(): void {
    
  }

}
