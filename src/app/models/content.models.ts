export interface ContentLink {
  prefix: string;
  label: string;
  url: string;
}

export interface HomeProject {
  date: string;
  visible: boolean;
  linkText: string;
  routerLink?: string;
  href?: string;
}

export interface HomeContent {
  title: string;
  intro: string;
  projects: HomeProject[];
}

export interface NavLink {
  id: string;
  label: string;
}

export interface BranchOfferItem {
  label?: string;
  text: string;
}

export interface BranchOffer {
  title: string;
  note?: string;
  subs?: string[];
  items?: BranchOfferItem[];
  ref?: ContentLink;
}

export interface Branch {
  primary?: boolean;
  tag?: string;
  name: string;
  title: string;
  copy?: string;
  subs?: string[];
  offers?: BranchOffer[];
  notes?: string[];
}

export interface NoteItem {
  text: string;
  ref?: ContentLink;
}

export interface RstrLifeContent {
  nav: {
    brand: string;
    links: NavLink[];
    backLabel: string;
    backLink: string;
  };
  hero: {
    brand: string;
    title: string;
    lede: string;
    mediaAriaLabel: string;
    ctaPrimary: { label: string; target: string };
    ctaGhost: { label: string; target: string };
  };
  nev: {
    eyebrow: string;
    title: string;
    support: string;
  };
  agak: {
    eyebrow: string;
    title: string;
    lede: string;
    branches: Branch[];
  };
  jegyzetek: {
    eyebrow: string;
    title: string;
    lede: string;
    items: NoteItem[];
  };
  close: {
    brand: string;
    title: string;
    support: string;
    mediaAriaLabel: string;
    cta: { label: string; href: string };
  };
  footer: {
    brand: string;
    tagline: string;
  };
}
