import { getFooterConfig, getSiteInfo, getSocialMediaConfig } from '@/lib/site-config';
import { Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const footerConfig = getFooterConfig();
  const siteInfo = getSiteInfo();
  const socialMediaConfig = getSocialMediaConfig();

  return (
    <footer className="bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image height={32} width={32} src={'/logo.svg'} alt="logo"></Image>
              <span className="text-xl font-bold">{siteInfo.name}</span>
            </div>
            <p className="text-gray-300 text-sm">{footerConfig.description}</p>
            <div className="flex space-x-4">
              <Link
                href={socialMediaConfig.tiktok?.href || ''}
                className="text-gray-300 hover:text-white transition-colors"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-tiktok"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
                </svg>
              </Link>
              <Link
                href={socialMediaConfig.youtube?.href || ''}
                className="text-gray-300 hover:text-white transition-colors"
                target="_blank"
              >
                <Youtube width={20} height={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{footerConfig.quickLinks.title}</h3>
            <ul className="space-y-2 text-sm">
              {footerConfig.quickLinks.links.map((link) => {
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{footerConfig.customerService.title}</h3>
            <ul className="space-y-2 text-sm">
              {footerConfig.customerService.links.map((link) => {
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="space-y-2 text-sm">
              {/* <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300">123 Calle Principal, Ciudad, País</span>
              </div> */}
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-300 icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                  <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                </svg>
                <span className="text-gray-300">{siteInfo.phone}</span>
              </div>
              {/* <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300">info@printstore.com</span>
              </div> */}
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>{footerConfig.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
