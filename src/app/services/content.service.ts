import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeContent, RstrLifeContent } from '../models/content.models';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private http: HttpClient) {}

  getHome(): Observable<HomeContent> {
    return this.http.get<HomeContent>('/assets/content/home.json');
  }

  getRstrLife(): Observable<RstrLifeContent> {
    return this.http.get<RstrLifeContent>('/assets/content/rstr-life.json');
  }
}
