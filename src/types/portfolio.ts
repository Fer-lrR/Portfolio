export interface Project {
  id: string;
  title: string;
  category: 'realtime' | 'ecommerce' | 'industrial' | 'mobile';
  client: string;
  tagline: string;
  description: string;
  architectureHighlights: string[];
  impact: string;
  stack: string[];
  demoUrl?: string;
  codeUrl?: string;
  isPrivate?: boolean;
  featured?: boolean;
}

export interface ArchitecturePower {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  metrics: string[];
  technologies: string[];
  codeSnippetTitle: string;
  codeSnippet: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  bullets: string[];
  tags: string[];
  badge?: string;
}

export interface TechSkill {
  id: string;
  name: string;
  iconKey: string;
  brandColor: string;
  description: string;
  highlight?: boolean;
  level?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: TechSkill[];
}
