// DeckSections.jsx — headings + decks in requested order (with per-card routes)
import React from "react";
import DeckHeading from "./DeckHeading";

import DeckCards from "./DeckCards";       // Spades — Work Experience (5)
import DeckHearts from "./DeckHearts";     // Hearts — Machine Learning (5)
import DeckClubs from "./DeckClubs";       // Clubs  — Software Design (4)
import DeckDiamonds from "./DeckDiamonds"; // Diamonds — Others (5)
import DeckJokers from "./DeckJokers";     // Education — Jokers (2)

// Helpers: map ranks to slugs
const spadeRoute = (item) => {
  const r = (item?.rank || item?.R || item?.title || "").toString().toUpperCase();
  switch (r) {
    case "A": return "/web-design";
    case "K": return "/Research-Assistant";
    case "Q": return "/ML-Intern";
    case "J": return "/Scrum-Master";
    case "10": return "/Lab-Instructor";
    default: return "/software";
  }
};

const heartRoute = (item) => {
  const r = (item?.rank || item?.R || item?.title || "").toString().toUpperCase();
  switch (r) {
    case "A": return "/Image-Processing";
    case "K": return "/Reinforcement-Learning";
    case "Q": return "/Sustainability";
    case "J": return "/Emotion-Detection";
    case "10": return "/MBTI-detector";
    default: return "/software";
  }
};

const clubRoute = (item) => {
  const r = (item?.rank || item?.R || item?.title || "").toString().toUpperCase();
  switch (r) {
    case "A": return "/Flora";
    case "K": return "/Tour-guide";
    case "Q": return "/MHQ";
    case "J": return "/Boardgame";
    default: return "/software";
  }
};

const diamondRoute = (item) => {
  const r = (item?.rank || item?.R || item?.title || "").toString().toUpperCase();
  switch (r) {
    case "A": return "/VR";
    case "K": return "/Games";
    case "Q": return "/BasicGames";
    case "J": return "/Publish";
    default: return "/software";
  }
};

// For jokers, use title suffix (A/B) or fallback by index (first/second)
const jokerRoute = (item, index) => {
  const t = (item?.title).toUpperCase();
  if (t.includes("MASTER")) return "/Regina";
  return "/IUST";
};

export default function DeckSections() {
  return (
    <>
      {/* 1) Work Experience — Spades */}
      <DeckHeading title="Work Experience" />
      <DeckCards routeForItem={spadeRoute} />

      {/* 2) Machine Learning — Hearts */}
      <DeckHeading title="Machine Learning" />
      <DeckHearts routeForItem={heartRoute} />

      {/* 3) Software Design — Clubs */}
      <DeckHeading title="Software Design" />
      <DeckClubs routeForItem={clubRoute} />

      {/* 4) Others — Diamonds */}
      <DeckHeading title="Games and Publications" />
      <DeckDiamonds routeForItem={diamondRoute} />

      {/* 5) Education — Jokers */}
      <DeckHeading title="Education" compact />
      {/* Many of our decks call routeForItem(item); if your Joker deck passes (item) only,
          just ignore the index in jokerRoute; otherwise you can wrap to provide index. */}
      <DeckJokers routeForItem={jokerRoute} />
    </>
  );
}
 