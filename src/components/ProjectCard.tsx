import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  imageUrl,
  liveUrl,
  githubUrl,
  delay = 0,
}) => {
  return (
    <div
      className={cn(
        "glass-card rounded-xl overflow-hidden",
        "transform transition-all duration-500 hover:-translate-y-2",
        "opacity-0 animate-fade-in group",
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500 z-10"></div>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-foreground/80 hover:text-accent transition-colors duration-300"
              aria-label="GitHub Repository"
            >
              <Github size={20} />
            </a>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-accent hover:underline transition-all duration-300"
              aria-label="Live Demo"
            >
              View Project <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
