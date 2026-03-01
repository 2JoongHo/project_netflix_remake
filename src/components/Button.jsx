import React from "react";
import "./Button.css";

function Button({ text, type, onClick }) {
  // type이 play면 btn-play, 아닐 시 btn-info
  const btnClass = type === "play" ? "btn-play" : "btn-info";
  return (
    <button className={`btn ${btnClass}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
