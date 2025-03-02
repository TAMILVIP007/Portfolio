import React from "react";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  className?: string;
  delay?: number;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({
  name,
  className,
  delay = 0,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        "bg-secondary text-secondary-foreground transition-all duration-300",
        "hover:bg-accent hover:text-accent-foreground",
        "opacity-0 animate-fade-in",
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {name}
    </div>
  );
};

export default SkillBadge;
