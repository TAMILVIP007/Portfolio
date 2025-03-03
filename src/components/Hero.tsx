import React, { useEffect, useRef } from "react";
import AnimatedText from "./AnimatedText";
import { ArrowDown } from "lucide-react";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();

      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;

      heroRef.current.style.setProperty("--mouse-x", `${x}`);
      heroRef.current.style.setProperty("--mouse-y", `${y}`);

      // Subtle parallax effect for the image
      if (imageRef.current) {
        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;
        imageRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    const element = heroRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={
        {
          "--mouse-x": "0.5",
          "--mouse-y": "0.5",
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(
              circle at 
              calc(var(--mouse-x) * 100%) 
              calc(var(--mouse-y) * 100%), 
              hsl(var(--accent)), 
              transparent 40%
            )`,
          }}
        ></div>
      </div>

      <div className="section-container flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Left side - Text content */}
        <div className="w-full md:w-1/2 text-left mb-12 md:mb-0">
          <div className="mb-6 inline-block">
            <span className="text-sm md:text-base py-1 px-3 rounded-full border border-border bg-background/50 backdrop-blur-sm">
              Welcome to my portfolio
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <div className="mb-4">
              <AnimatedText text="Hello, I am" className="block" />
            </div>
            <div className="typing-container">
              <span
                className="typing-text text-gradient font-extrabold"
                style={{ fontVariant: "small-caps" }}
              >
                Indrajeeth
              </span>
            </div>
          </h1>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in"
            style={{ animationDelay: "600ms" }}
          >
            <a
              href="#projects"
              className="bg-accent text-accent-foreground py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="bg-secondary text-secondary-foreground py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:translate-y-[-2px]"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right side - Image */}
        <div
          ref={imageRef}
          className="w-full md:w-1/2 flex justify-center md:justify-end opacity-0 animate-image-fade-in transition-transform duration-500 ease-out"
          style={{ animationDelay: "300ms" }}
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30"></div>
            <div className="relative overflow-hidden rounded-2xl image-shadow border border-white/10">
              <video
                src="https://envs.sh/b8y.mp4"
                className="w-full h-auto max-w-md object-cover aspect-[4/3]"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in animate-soft-bounce"
        style={{ animationDelay: "1000ms" }}
        aria-label="Scroll down"
      >
        <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
        <ArrowDown size={20} className="text-muted-foreground" />
      </a>
    </section>
  );
};

export default Hero;
