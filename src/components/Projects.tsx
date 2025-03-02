import React from "react";
import ProjectCard from "./ProjectCard";

const Projects: React.FC = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured online store with payment processing, user authentication, and inventory management.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      imageUrl:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative project management tool with real-time updates and team collaboration features.",
      tags: ["Next.js", "Firebase", "Tailwind CSS", "TypeScript"],
      imageUrl:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      title: "Finance Dashboard",
      description:
        "An analytics dashboard for tracking personal finances with data visualization and insights.",
      tags: ["React", "D3.js", "Express", "PostgreSQL"],
      imageUrl:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      title: "Weather Forecast App",
      description:
        "A weather application providing detailed forecasts, alerts, and location-based weather data.",
      tags: ["React Native", "Redux", "API Integration", "Geolocation"],
      imageUrl:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800",
      githubUrl: "https://github.com",
    },
  ];

  return (
    <section id="projects" className="section">
      <div className="section-container">
        <h2 className="section-title">
          My <span className="text-gradient">Projects</span>
        </h2>
        <p className="section-subtitle">
          A showcase of my recent work and personal projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
