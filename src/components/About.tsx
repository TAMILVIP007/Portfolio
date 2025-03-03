/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { Code, Terminal, Laptop, Github, Linkedin } from "lucide-react";
import SkillBadge from "./SkillBadge";
import TechGlobe from "./TechGlobe";

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "MongoDB",
    "Golang",
    "SQL",
    "GraphQL",
    "Git",
    "Python",
    "Docker",
    "AWS",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === imageRef.current) {
              entry.target.classList.add("animate-blur-in");
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section bg-secondary/30">
      <div className="section-container">
        <h2 className="section-title">
          About <span className="text-gradient">Me</span>
        </h2>
        <p className="section-subtitle">
          I'm passionate about creating elegant solutions to complex problems.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div
            ref={imageRef}
            className="flex justify-center lg:justify-end opacity-0 order-1 lg:order-2"
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden glass-card p-1 flex items-center justify-center">
                <TechGlobe className="w-full h-full" />
              </div>

              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-lg glass-card flex items-center justify-center text-accent animate-float">
                <Code size={36} />
              </div>

              <div
                className="absolute -top-6 -right-6 w-20 h-20 rounded-lg glass-card flex items-center justify-center text-accent animate-float"
                style={{ animationDelay: "1s" }}
              >
                <Terminal size={30} />
              </div>
            </div>
          </div>

          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <div className="opacity-0 animate-fade-in-left">
                <h3 className="text-2xl font-semibold mb-2">Who Am I?</h3>
                <p className="text-muted-foreground">
                  I'm a passionate Backend Developer with a deep love for
                  creating efficient, elegant solutions. With experience in
                  various backend technologies, I focus on building robust and
                  scalable systems to support seamless user experiences.
                </p>
              </div>

              <div
                className="opacity-0 animate-fade-in-left"
                style={{ animationDelay: "150ms" }}
              >
                <h3 className="text-2xl font-semibold mb-2">What I Do?</h3>
                <p className="text-muted-foreground">
                  Crafting modern web apps and api services with a focus on user
                  experience and performance. I'm always eager to learn new
                  technologies and frameworks to stay ahead in the ever-evolving
                  tech landscape.
                </p>
              </div>

              <div
                className="opacity-0 animate-fade-in-left"
                style={{ animationDelay: "300ms" }}
              >
                <h3 className="text-2xl font-semibold mb-3">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <SkillBadge
                      key={skill}
                      name={skill}
                      delay={index * 50 + 400}
                    />
                  ))}
                </div>
              </div>

              <div
                className="flex gap-4 opacity-0 animate-fade-in-left"
                style={{ animationDelay: "450ms" }}
              >
                <a
                  href="https://github.com/TAMILVIP007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary text-foreground hover:text-accent transition-colors duration-300"
                  aria-label="GitHub Profile"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/indrajeethy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary text-foreground hover:text-accent transition-colors duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
