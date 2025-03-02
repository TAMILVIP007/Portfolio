import React from "react";
import { ArrowUp } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="py-10 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col items-center justify-center text-center">
          <a
            href="#home"
            className="p-3 rounded-full bg-secondary hover:bg-accent/10 text-foreground hover:text-accent transition-all duration-300 mb-3"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </a>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
