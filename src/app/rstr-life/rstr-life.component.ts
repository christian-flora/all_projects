import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ContentService } from '../services/content.service';
import { RstrLifeContent } from '../models/content.models';

@Component({
  selector: 'app-rstr-life',
  templateUrl: './rstr-life.component.html',
  styleUrls: ['./rstr-life.component.css']
})
export class RstrLifeComponent implements OnInit, OnDestroy {
  content: RstrLifeContent;
  scrolled = false;
  visible: { [key: string]: boolean } = {
    nev: false,
    agak: false,
    jegyzetek: false,
    close: false
  };

  private observer: IntersectionObserver;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.getRstrLife().subscribe((data) => {
      this.content = data;
      this.initRevealObserver();
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 40;
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private initRevealObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.visible = { nev: true, agak: true, jegyzetek: true, close: true };
      return;
    }

    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = (entry.target as HTMLElement).getAttribute('data-reveal');
            if (key && this.visible.hasOwnProperty(key)) {
              this.visible[key] = true;
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    setTimeout(() => {
      const nodes = document.querySelectorAll('[data-reveal]');
      for (let i = 0; i < nodes.length; i++) {
        this.observer.observe(nodes[i]);
      }
    }, 0);
  }
}
