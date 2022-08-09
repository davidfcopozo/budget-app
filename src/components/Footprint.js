import React from "react";
import Card from "react-bootstrap/Card";
import { useDynamicLang } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemesContext";
import { content } from "../components/Languages";

const Footprint = () => {
  const lang = useDynamicLang();
  const containerDark = useTheme();

  let textStyle = {
    color: containerDark ? "white" : "#000",
    transition: "all 0.8s ease-in",
    textDecoration: "none",
    marginTop: "unset",
    marginBottom: "unset",
  };

  let darker = containerDark ? "bg-dark" : "bg-light";

  return (
    <Card
      className={`${darker} text-center fw-bold`}
      style={{
        borderRadius: 0,
        border: "none",
        marginInline: "auto",
        marginTop: "3rem",
      }}
    >
      <div className="footprint" style={textStyle}>
        <p>
          {content[lang]["footprint"]["built"]} <br />
          <a
            href="https://davidfrancisco.netlify.com/"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            David Francisco
          </a>{" "}
          {content[lang]["footprint"]["with"]}
        </p>
      </div>
    </Card>
  );
};

export default Footprint;
