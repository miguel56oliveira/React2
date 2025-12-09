import { useState } from "react";

interface CategoryProps {
  onSelect: (category: string) => void;
}

export default function CategoriesMenu({ onSelect }: CategoryProps) {
  const [open, setOpen] = useState(false);

  const categories = ["Xbox Series X", "Nintendo Switch", "PS5", "PC"];

  return (
    <div style={{ marginBottom: "20px", position: "relative" }}>
      {/* Botão Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className={open ? "menu-button open" : "menu-button"}
        style={{
          fontSize: "18px",
          padding: "8px 12px",
          cursor: "pointer",
          borderRadius: "5px",
          border: "1px solid #c0392b",
          background: "#c0392b",
          color: "white",
          width: "100%",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
      >
        <svg className={open ? "menu-icon open" : "menu-icon"} width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="0" y="0" width="20" height="2" fill="white" rx="1" />
          <rect x="0" y="6" width="20" height="2" fill="white" rx="1" />
          <rect x="0" y="12" width="20" height="2" fill="white" rx="1" />
        </svg>
        <span>Menu</span>
      </button>

      {/* Dropdown vertical 100% com fundo vermelho */}
      {open && (
        <div style={{
          position: "absolute",
          top: "40px",
          left: 0,
          width: "100%",
          background: "white",
          borderRadius: "0 0 5px 5px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column"
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { onSelect(cat); setOpen(false); }}
              style={{
                padding: "12px 20px",
                background: "transparent",  // sem fundo
                color: "black",            // letras pretas
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                width: "100%"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
