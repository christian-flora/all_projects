import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { Or2classesComponent } from './or2classes/or2classes.component';
import { OrarendComponent } from './orarend/orarend.component';
import { Or2classes2Component } from './orarend/or2classes2/or2classes2.component';
import { Or2commentComponent } from './orarend/or2comment/or2comment.component';
import { Or2contentComponent } from './orarend/or2content/or2content.component';
import { Or2copyrightComponent } from './orarend/or2copyright/or2copyright.component';
import { Or2userComponent } from './orarend/or2user/or2user.component';
import { Or2headlineComponent } from './orarend/or2content/or2headline/or2headline.component';
import { Or2addmasterComponent } from './orarend/or2content/or2addmaster/or2addmaster.component';
import { Or2hoursComponent } from './orarend/or2content/or2hours/or2hours.component';
import { Or2linksComponent } from './orarend/or2content/or2links/or2links.component';
import { Or2masterComponent } from './orarend/or2content/or2master/or2master.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    Or2classesComponent,
    OrarendComponent,
    Or2classes2Component,
    Or2commentComponent,
    Or2contentComponent,
    Or2copyrightComponent,
    Or2userComponent,
    Or2headlineComponent,
    Or2addmasterComponent,
    Or2hoursComponent,
    Or2linksComponent,
    Or2masterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path:'', component:HomeComponent }, 
      { path:'orarend', component:OrarendComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
