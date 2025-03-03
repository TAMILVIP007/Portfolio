import React, { useState, useEffect } from "react";
import { Mail, Send, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { PiTelegramLogoBold } from "react-icons/pi";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDarkMode(prefersDarkMode);
    if (prefersDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    toast.success(`${newDarkMode ? "Dark" : "Light"} mode activated`, {
      description: `Switched to ${newDarkMode ? "dark" : "light"} mode for better viewing experience.`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://p.indrajeeth.in/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully!", {
        description: "I'll get back to you as soon as possible.",
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="section bg-secondary/30 dark:bg-secondary/10 relative"
    >
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-yellow-300" />
          ) : (
            <Moon className="h-5 w-5 text-blue-700" />
          )}
        </button>
      </div>

      <div className="section-container">
        <h2 className="section-title">
          Get in <span className="text-gradient">Touch</span>
        </h2>
        <p className="section-subtitle">
          Have a project in mind or want to chat? Feel free to reach out.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start mt-12">
          <div className="lg:col-span-2 opacity-0 animate-fade-in-left">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-3">Let's Talk</h3>
                <p className="text-muted-foreground">
                  I'm always open to discussing new projects, creative ideas, or
                  opportunities to be part of your vision.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                  <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-accent float-animation">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href="mailto:mail@indrajeeth.in"
                      className="font-medium hover:text-accent transition-colors"
                    >
                      mail@indrajeeth.in
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                  <div
                    className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-accent float-animation"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <PiTelegramLogoBold />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telegram</p>
                    <p className="font-medium">@tamilvip007</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-3 opacity-0 animate-fade-in-right"
            style={{ animationDelay: "200ms" }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-xl p-6 md:p-8"
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all dark:bg-black/30"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all dark:bg-black/30"
                    placeholder="yourmail@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none dark:bg-black/30"
                    placeholder="Hi, I'd like to talk about..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-foreground py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send
                    size={18}
                    className={isSubmitting ? "animate-pulse" : ""}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
