// App.js — with canvas burn transition on browser Back/Forward
import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigationType,
} from "react-router-dom";

import { playBurnTransition } from "./burnTransition";
import ScrollReset from "./ScrollReset";
import ThemedScrollbars from "./ThemedScrollbars";

// Pages
import Home from "./Home.jsx";
import Software from "./Software";

// Spades
import WebDesign from "./WebDesign";
import ResearchAssistant from "./ResearchAssistant";
import MLIntern from "./MLIntern";
import ScrumMaster from "./ScrumMaster";
import LabInstructor from "./LabInstructor";

// Hearts
import ImageProcessing from "./ImageProcessing";
import ReinforcementLearning from "./ReinforcementLearning";
import Sustainability from "./Sustainability";
import EmotionDetection from "./EmotionDetection";
import MBTIDetector from "./MBTIDetector";

// Clubs
import Flora from "./Flora";
import TourGuide from "./TourGuide";
import MHQ from "./MHQ";
import Boardgame from "./Boardgame";

// Diamonds
import VR from "./VR";
import Games from "./Games";
import BasicGames from "./BasicGames";
import Publish from "./Publish.jsx";

// Jokers
import Regina from "./Regina";
import IUST from "./IUST";

function BurningRoutes() {
  const location = useLocation();
  const navType = useNavigationType(); // "POP" for browser Back/Forward
  const [displayLocation, setDisplayLocation] = useState(location);
  const animatingRef = useRef(false);

  useEffect(() => {
    if (location.key !== displayLocation.key && !animatingRef.current) {
      // Animate only for Back/Forward; set to true to animate ALL navigations
      const shouldAnimate = navType === "POP";
      if (!shouldAnimate) {
        setDisplayLocation(location);
        return;
      }

      animatingRef.current = true;

      // Lock scroll during the burn
      // Lock scroll during the burn
document.documentElement.classList.add("deck-lock");
document.body.classList.add("deck-lock");

playBurnTransition({ duration: 2250 }).then(({ overlay }) => {
  // 1) Swap to the new route while overlay still covers the screen
  setDisplayLocation(location);

  // 2) Let React paint the new page, then remove the overlay
  requestAnimationFrame(() => {
    // optional: scroll to top only NOW (no jump before animation)
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // remove the overlay and unlock scroll
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    document.documentElement.classList.remove("deck-lock");
    document.body.classList.remove("deck-lock");
    animatingRef.current = false;
  });
});

    }
  }, [location, displayLocation, navType]);

  return (
    <Routes location={displayLocation}>
      <Route path="/" element={<Home />} />
      <Route path="/software" element={<Software />} />

      {/* Spades */}
      <Route path="/web-design" element={<WebDesign />} />
      <Route path="/Research-Assistant" element={<ResearchAssistant />} />
      <Route path="/ML-Intern" element={<MLIntern />} />
      <Route path="/Scrum-Master" element={<ScrumMaster />} />
      <Route path="/Lab-Instructor" element={<LabInstructor />} />

      {/* Hearts */}
      <Route path="/Image-Processing" element={<ImageProcessing />} />
      <Route path="/Reinforcement-Learning" element={<ReinforcementLearning />} />
      <Route path="/Sustainability" element={<Sustainability />} />
      <Route path="/Emotion-Detection" element={<EmotionDetection />} />
      <Route path="/MBTI-detector" element={<MBTIDetector />} />

      {/* Clubs */}
      <Route path="/Flora" element={<Flora />} />
      <Route path="/Tour-guide" element={<TourGuide />} />
      <Route path="/MHQ" element={<MHQ />} />
      <Route path="/Boardgame" element={<Boardgame />} />

      {/* Diamonds */}
      <Route path="/VR" element={<VR />} />
      <Route path="/Games" element={<Games />} />
      <Route path="/BasicGames" element={<BasicGames />} />
      <Route path="/Publish" element={<Publish />} />

      {/* Jokers */}
      <Route path="/Regina" element={<Regina />} />
      <Route path="/IUST" element={<IUST />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollReset />
      <ThemedScrollbars />
      <BurningRoutes />
    </Router>
  );
}
