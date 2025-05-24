// components/LanguageToggle.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LanguageToggle = ({ currentPage }) => {
  const [lang, setLang] = useState("ko"); // 기본은 한국어
  const navigate = useNavigate();

  const handleLangChange = (newLang) => {
    setLang(newLang);
    if (newLang === "en") {
      if (currentPage === "login") navigate("/login-en");
      else if (currentPage === "signup") navigate("/signup-en");
    } else {
      if (currentPage === "login") navigate("/login");
      else if (currentPage === "signup") navigate("/signup");
    }
  };

  return (
    <div className="flex gap-6 text-lg font-semibold">
      <button
        onClick={() => handleLangChange("ko")}
        className={`transition-colors ${
          lang === "ko" ? "text-blue-500 underline underline-offset-4" : "text-blue-300"
        }`}
      >
        한국어
      </button>
      <button
        onClick={() => handleLangChange("en")}
        className={`transition-colors ${
          lang === "en" ? "text-blue-500 underline underline-offset-4" : "text-blue-300"
        }`}
      >
        English
      </button>
    </div>
  );
};

export default LanguageToggle;
