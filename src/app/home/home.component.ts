import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { HomeContent } from '../models/content.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: HomeContent;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.getHome().subscribe((data) => {
      this.content = data;
    });
  }
}
