import React, { useContext, useState } from 'react';
import './AIChat.css';
import { FaRobot, FaCode, FaImage, FaBrain, FaMusic, FaGlobe, FaPaintBrush, FaCamera, FaSearch, FaVideo, FaGamepad, FaBook, FaUserNinja, FaMapMarkedAlt, FaLaptopCode } from 'react-icons/fa';
import { ContextDef } from '../contextDef';

const aiOptions = [
  {
    name: "ChatGPT",
    Icon: FaRobot,
    description: "A conversational AI that answers questions and chats naturally."
  },
  {
    name: "Code AI",
    Icon: FaCode,
    description: "Auto-generates, refactors, and explains code snippets."
  },
  {
    name: "Image Generator",
    Icon: FaImage,
    description: "Creates custom images from your text prompts."
  },
  {
    name: "Smart Brain",
    Icon: FaBrain,
    description: "Analyzes complex data and provides insights."
  },
  {
    name: "Music Maker",
    Icon: FaMusic,
    description: "Composes original music tracks in various genres."
  },
  {
    name: "Travel Advisor",
    Icon: FaGlobe,
    description: "Recommends itineraries and local tips for any destination."
  },
  {
    name: "Art Creator",
    Icon: FaPaintBrush,
    description: "Generates unique digital artworks and illustrations."
  },
  {
    name: "Photo Enhancer",
    Icon: FaCamera,
    description: "Automatically improves image quality and clarity."
  },
  {
    name: "Web Search AI",
    Icon: FaSearch,
    description: "Fetches and summarizes the latest web search results."
  },
  {
    name: "Video Maker",
    Icon: FaVideo,
    description: "Turns scripts into polished video clips."
  },
  {
    name: "Game Bot",
    Icon: FaGamepad,
    description: "Interactive AI for playing and moderating games."
  },
  {
    name: "Book Summarizer",
    Icon: FaBook,
    description: "Condenses book contents into concise summaries."
  },
  {
    name: "Hacker AI",
    Icon: FaUserNinja,
    description: "Performs security testing and vulnerability scans."
  },
  {
    name: "Map Guide",
    Icon: FaMapMarkedAlt,
    description: "Provides turn-by-turn navigation and points of interest."
  },
  {
    name: "Coding Assistant",
    Icon: FaLaptopCode,
    description: "Helps you debug and optimize your programming projects."
  },
  {
    name: "Email Writer",
    Icon: FaBook,
    description: "Drafts professional emails based on your prompts."
  },
  {
    name: "Recipe Generator",
    Icon: FaBrain,
    description: "Suggests recipes tailored to your available ingredients."
  },
  {
    name: "Fitness Coach",
    Icon: FaUserNinja,
    description: "Creates personalized workout and nutrition plans."
  },
  {
    name: "News Reader",
    Icon: FaGlobe,
    description: "Fetches and summarizes current news articles."
  },
  {
    name: "Interview Bot",
    Icon: FaRobot,
    description: "Simulates common job interview questions and feedback."
  },
  {
    name: "Resume Builder",
    Icon: FaLaptopCode,
    description: "Generates polished, ATS-friendly resume layouts."
  },
  {
    name: "AI Designer",
    Icon: FaPaintBrush,
    description: "Creates mockups and graphic designs instantly."
  },
  {
    name: "Stock Predictor",
    Icon: FaSearch,
    description: "Forecasts stock market trends using historical data."
  },
  {
    name: "Language Tutor",
    Icon: FaBook,
    description: "Teaches vocabulary, grammar, and conversation skills."
  },
];

function AIChatPage() {
  const [input, setInput] = useState('');

  const {AiRightPage, setAiRightPage}=useContext(ContextDef)

  return (
    <div className="ai-chat-page">
      <input
        className="chat-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message here..."
      />

      <div className="ai-grid">
        {aiOptions.map((option, index) => (
          <div key={index} className="ai-card" onClick={()=>{setAiRightPage(option)}} >
            <option.Icon className="ai-icon" />
            <span className="ai-name">{option.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIChatPage;
