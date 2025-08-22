

import React, { useState, useEffect } from "react";
import "./MaterialYouNewTab.css";
import { Search } from "lucide-react";

const shortcuts = [
  {
    name: "Gmail",
    url: "https://mail.google.com",
    icon: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
  },
  {
    name: "YouTube",
    url: "https://youtube.com",
    icon:
      "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg",
  },
  {
    name: "GitHub",
    url: "https://github.com",
    icon:
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  },
  {
    name: "ChatGPT",
    url: "https://chat.openai.com",
    icon: "https://openai.com/content/images/2022/05/chatgpt-logo.png",
  },
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

export default function MaterialYouNewTab() {
  // State for current time
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate rotation degrees for clock hands
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;
  const secondsDeg = (seconds / 60) * 360;
  const minutesDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hoursDeg = (hours / 12) * 360 + (minutes / 60) * 30;

  return (
    <div className="new-tab-container">
      <div className="new-tab-content">
        <div className="flex items-center justify-between">
          <h1 className="greeting text-3xl font-semibold">
            {getGreeting()} 👋
          </h1>
          {/* Single Analog Clock on the SVG clock face */}
          <div
            className="clock"
            id="analogClock"
            style={{ display: "block", width: "200px", height: "200px", position: "relative" }}
          >
            <svg
              fill="none"
              height="100%"
              viewBox="0 0 461 461"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="bgLightTint"
                clipRule="evenodd"
                d="M93.6379 63.9405C89.7543 78.4344 78.4333 89.7554 63.9394 93.639L56.4989 95.6327C34.0934 101.636 20.7969 124.666 26.8005 147.072L28.7201 154.236C32.6038 168.73 28.46 184.195 17.8497 194.805L12.3015 200.353C-4.1005 216.755 -4.10051 243.348 12.3015 259.75L17.9236 265.372C28.5338 275.983 32.6776 291.447 28.794 305.941L26.8004 313.382C20.7968 335.787 34.0933 358.817 56.4989 364.821L63.9395 366.815C78.4334 370.698 89.7544 382.019 93.638 396.513L95.6322 403.956C101.636 426.361 124.666 439.658 147.071 433.654L154.513 431.66C169.007 427.777 184.472 431.92 195.082 442.531L200.353 447.802C216.755 464.204 243.348 464.204 259.75 447.802L265.097 442.455C275.707 431.845 291.172 427.701 305.666 431.585L313.383 433.653C335.788 439.656 358.818 426.36 364.822 403.954L366.815 396.515C370.699 382.021 382.02 370.7 396.514 366.816L403.955 364.822C426.361 358.819 439.657 335.789 433.654 313.383L431.586 305.665C427.702 291.172 431.846 275.707 442.456 265.096L447.802 259.75C464.204 243.348 464.204 216.755 447.802 200.353L442.53 195.081C431.92 184.471 427.776 169.006 431.66 154.512L433.654 147.071C439.657 124.665 426.361 101.635 403.955 95.6312L396.514 93.6373C382.02 89.7537 370.699 78.4327 366.815 63.9389L364.822 56.4994C358.818 34.0938 335.788 20.7974 313.383 26.8009L305.942 28.7946C291.448 32.6782 275.983 28.5345 265.373 17.9242L259.75 12.3015C243.348 -4.10051 216.755 -4.1005 200.353 12.3015L194.806 17.8491C184.196 28.4593 168.731 32.6031 154.237 28.7195L147.071 26.7995C124.666 20.7959 101.636 34.0924 95.6322 56.498L93.6379 63.9405Z"
                fill="#FFF"
                fillRule="evenodd"
              ></path>
            </svg>
            {/* Center container for the hands */}
            <div
              className="centerPoint"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Hour hand */}
              <div
                className="sui"
                id="hour"
                style={{
                  transform: `rotate(${hoursDeg}deg)`,
                  transition: "transform 1s",
                  position: "absolute",
                  width: "3px",
                  height: "50px",
                  background: "#333",
                  transformOrigin: "bottom center",
                }}
              ></div>
              {/* Minute hand */}
              <div
                className="sui"
                id="minute"
                style={{
                  transform: `rotate(${minutesDeg}deg)`,
                  transition: "transform 1s",
                  position: "absolute",
                  width: "2px",
                  height: "70px",
                  background: "#666",
                  transformOrigin: "bottom center",
                }}
              ></div>
              {/* Second hand */}
              <div
                className="sui"
                id="second"
                style={{
                  transform: `rotate(${secondsDeg}deg)`,
                  transition: "transform 1s",
                  position: "absolute",
                  width: "1px",
                  height: "90px",
                  background: "red",
                  transformOrigin: "bottom center",
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search the web"
            className="search-input"
          />
        </div>
        <div className="shortcut-grid">
          {shortcuts.map((s, i) => (
            <div
              key={i}
              className="shortcut-card"
              onClick={() => window.open(s.url, "_blank")}
            >
              <img src={s.icon} alt={s.name} className="shortcut-icon" />
              <div className="shortcut-label">{s.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
