import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
} from "lucide-react";

const primaryLinks = [
  { name: "About", href: "/about" },
  { name: "Academics", href: "/academics" },
  { name: "Admissions", href: "/admissions" },
];

const secondaryLinks = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Contact", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className="bg-background border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start space-y-4">
            <Link to="/" className="text-2xl font-bold flex items-center gap-2">
              <span className="rounded-full bg-primary p-1 text-secondary">
                <GraduationCap />
              </span>
              School <span className="text-primary">Sync</span>
            </Link>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Education Lane, Learning City, ED 12345</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@schoolsync.edu</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <h4 className="text-lg font-semibold">Explore</h4>
            <nav className="space-y-2">
              {primaryLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <nav className="space-y-2">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <h4 className="text-lg font-semibold">Connect With Us</h4>
            <div className="flex space-x-4">
              {[
                {
                  Icon: Facebook,
                  href: "https://facebook.com/schoolsync",
                  label: "Facebook",
                },
                {
                  Icon: Twitter,
                  href: "https://twitter.com/schoolsync",
                  label: "Twitter",
                },
                {
                  Icon: Instagram,
                  href: "https://instagram.com/schoolsync",
                  label: "Instagram",
                },
                {
                  Icon: Linkedin,
                  href: "https://linkedin.com/school/schoolsync",
                  label: "LinkedIn",
                },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">{label}</span>
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} School Sync. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
