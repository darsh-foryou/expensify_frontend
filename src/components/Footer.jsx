import React from "react";
import { FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t bg-background px-4 py-6">
      <div className="container mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Expensify. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/darshil_modii/?igsh=ZTI5aHgzYzV4dTlz#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://wa.me/+13157461195"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <FaWhatsapp size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/modi-darshil/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
