// import siteConfig from '../data-json/site-config.json';
const siteConfig = JSON.parse(process.env.NEXT_PUBLIC_SITE_CONFIG ?? '{}') as SiteConfig;

// export type SiteConfig = typeof siteConfig;

// export function getSiteConfig(): SiteConfig {
//   return siteConfig;
// }

export function getSiteInfo() {
  return siteConfig.site;
}

export function getSEOConfig() {
  return siteConfig.seo;
}

export function getSocialMediaConfig() {
  return siteConfig.socialMedia;
}

export function getHomepageConfig() {
  return siteConfig.homepage;
}

export function getFooterConfig() {
  return siteConfig.footer;
}

export interface SiteConfig {
  site: Site;
  seo: Seo;
  socialMedia: SocialMedia;
  homepage: Homepage;
  footer: Footer;
}

export interface Site {
  name: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  address: string;
}

export interface Seo {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  keywords: string;
  author: string;
  twitterHandle: string;
  googleSiteVerification: string;
}

export interface Link {
  label: string;
  href: string;
}

export interface SocialMedia {
  tiktok: Link;
  youtube: Link;
}

export interface Homepage {
  hero: Hero;
}
export interface Hero {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface Footer {
  description: string;
  contactTitle: string;
  copyright: string;
  quickLinks: QuickLinks;
  customerService: CustomerService;
}
export interface CustomerService {
  title: string;
  links: Link[];
}
export interface QuickLinks {
  title: string;
  links: Link[];
}
