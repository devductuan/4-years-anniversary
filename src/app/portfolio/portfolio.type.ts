export interface PortfolioEducationItem {
  school: string;
  degree: string;
  period: string;
  description: string;
}

export interface PortfolioExperienceItem {
  role: string;
  company: string;
  period: string;
  type?: string;
  link?: string;
  location?: string;
  bullets: string[];
}

export interface PortfolioVolunteeringItem {
  role: string;
  organization: string;
  period: string;
  bullets: string[];
}

export interface PortfolioCertificationItem {
  name: string;
  issuer: string;
}

export interface PortfolioSkillItem {
  name: string;
  level: string;
}

export interface PortfolioData {
  about: string;
  education: PortfolioEducationItem[];
  experience: PortfolioExperienceItem[];
  volunteering: PortfolioVolunteeringItem[];
  certifications: PortfolioCertificationItem[];
  skills: PortfolioSkillItem[];
}
