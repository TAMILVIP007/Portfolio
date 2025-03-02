import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  typingEffect?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  delay = 0,
  typingEffect = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (typingEffect) {
    return (
      <div className={cn("typing-container", className)}>
        <span className={cn("typing-text", { "opacity-0": !isVisible })}>
          {text}
        </span>
      </div>
    );
  }

  return (
    <span
      className={cn(
        "transition-opacity duration-500 ease-in-out",
        isVisible ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {text}
    </span>
  );
};

export default AnimatedText;
