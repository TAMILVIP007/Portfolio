import React from "react";
import ProjectCard from "./ProjectCard";

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Telegram Bot for LinkedIn Posting with AI Integration",
      description:
        "The bot is designed to streamline content creation for LinkedIn by automating the process using AI and offering an easy way to post directly from Telegram.",
      tags: ["LinkedIn", "Gemini", "Golang", "Telegram"],
      imageUrl:
        "https://files.indrajeeth.in/alexander-shatov-9Zjd7PE_FRM-unsplash.jpg",
      githubUrl: "https://github.com/TAMILVIP007/Linkedin-Poster",
    },
    {
      title: "Telegram Story Downloader Bot",
      description:
        "This bot allows you to download stories from Telegram users effortlessly. Simply send a Telegram username or profile link, and the bot will fetch all available stories for you.",
      tags: ["Python", "telegram", "sql"],
      imageUrl: "https://files.indrajeeth.in/image_2025-03-03_15-40-22.png",
      githubUrl: "https://github.com/TAMILVIP007/TgStoryDl",
      liveUrl: "https://t.me/TGStoryDl_Bot",
    },
    {
      title: "Whatsapp Chatbot",
      description:
        "This project is an open-source chatbot for Whatsapp, built with Golang and the Whatsmeow library. It uses OpenAI to generate responses, enabling it to have complex conversations.",
      tags: ["Golang", "ChatGPT", "Whatsapp"],
      imageUrl:
        "https://files.indrajeeth.in/dima-solomin-upBKRmHJrCI-unsplash.jpg",
      githubUrl: "https://github.com/TAMILVIP007/WhatChatGPT",
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
