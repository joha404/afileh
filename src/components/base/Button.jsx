import { useState } from "react";

const Button = ({ label, onClick, isLoading, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };
  
  const handleMouseDown = () => {
    if (!disabled) setIsPressed(true);
  };
  
  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const opacity = disabled ? 0.75 : 1;
  const cursor = disabled ? "not-allowed" : "pointer";
  
  // Loading spinner component
  const Spinner = () => (
    <div style={{ display: "inline-block", position: "relative" }}>
      <div style={{
        width: "20px",
        height: "20px",
        border: "3px solid rgba(255, 255, 255, 0.3)",
        borderTop: "3px solid #ffffff",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );

  const Contents = isLoading ? <Spinner /> : <span>{label}</span>;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        backgroundColor: isPressed ? "#005cbf" : isHovered ? "#0069d9" : "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        padding: "10px 24px",
        fontSize: "16px",
        fontWeight: "600",
        outline: "none",
        boxShadow: isPressed 
          ? "0 2px 3px rgba(0, 123, 255, 0.5) inset" 
          : isHovered 
            ? "0 6px 12px rgba(0, 123, 255, 0.4), 0 0 0 3px rgba(0, 123, 255, 0.1)" 
            : "0 4px 6px rgba(0, 123, 255, 0.2)",
        transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        position: "relative",
        overflow: "hidden",
        opacity,
        cursor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "140px",
        height: "45px",
        letterSpacing: "0.5px",
        transform: isPressed 
          ? "translateY(2px) scale(0.98)" 
          : isHovered 
            ? "translateY(-2px)" 
            : "translateY(0)",
        backgroundImage: isHovered && !isLoading && !disabled
          ? "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)"
          : "none",
        backgroundSize: "200% 100%",
        backgroundPosition: "0% 0%",
        animation: isHovered && !isLoading && !disabled
          ? "shimmer 1.5s infinite"
          : isLoading && !disabled
            ? "pulse 1.5s infinite"
            : "none",
      }}
    >
      {Contents}
      {isHovered && !isLoading && !disabled && (
        <div style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          pointerEvents: "none",
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
          transform: "scale(1.5)",
          opacity: isPressed ? 0.4 : 0.2,
          transition: "opacity 0.5s ease",
        }} />
      )}
    </button>
  );
};

export default Button;