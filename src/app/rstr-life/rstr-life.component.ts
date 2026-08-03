import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-rstr-life',
  templateUrl: './rstr-life.component.html',
  styleUrls: ['./rstr-life.component.css']
})
export class RstrLifeComponent implements OnInit, OnDestroy {
  scrolled = false;
  visible: { [key: string]: boolean } = {
    nev: false,
    agak: false,
    close: false
  };

  private observer: IntersectionObserver;

  ngOnInit(): void {
    if (typeof IntersectionObserver !== 'undefined') {
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
    } else {
      this.visible = { nev: true, agak: true, close: true };
    }
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
}
