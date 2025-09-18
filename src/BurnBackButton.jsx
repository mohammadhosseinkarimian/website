// BurnBackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BurnBackButton({ children = "Back", className = "" }) {
  const navigate = useNavigate();

  const onClick = (e) => {
    e.preventDefault();

    // build the burn veil
    const veil = document.createElement("div");
    veil.className = "burn-veil burn-run";
    document.body.appendChild(veil);

    // (optional) lock scroll while animating
    document.documentElement.classList.add("deck-lock");
    document.body.classList.add("deck-lock");

    // navigate back after animation completes
    const done = () => {
      veil.removeEventListener("animationend", done);
      navigate(-1);
      // veil will get cleaned by ScrollReset on next page
    };
    veil.addEventListener("animationend", done, { once: true });
  };

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
