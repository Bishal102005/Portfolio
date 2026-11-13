export type PortfolioLink = [label: string, url: string, display?: string];

export interface PersonalInfo {
  name: string;
  role: string;
  email: string;
  links: PortfolioLink[];
}

export interface Project {
  t: string;
  sub: string;
  yr: number;
  role: string;
  c: [string, string];
  ch: string;
  ap: string;
  out: string;
  stack: string[];
  m: [string, string][];
  q: string;
  img?: string;
}

export type Skill = [name: string, level: number];

export type TimelineItem = [
  period: string,
  title: string,
  company: string,
  description: string
];

export interface NavItem {
  label: string;
  spreadIndex: number;
}

