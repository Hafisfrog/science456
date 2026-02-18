import { useNavigate } from "react-router-dom";
import "./Start.css";

export default function Start() {
  const navigate = useNavigate();

  return (
    <div className="start-container">
      <div className="start-left">
        <img
          src="/images/start-lab.png"
          alt="Virtual Science Lab"
          className="start-image"
        />
      </div>

      <div className="start-right">
        <h1 className="start-title">Virtual Science Lab</h1>
        <p className="start-subtitle">ผจญภัยในห้องแล็บเสมือนจริง</p>

        <button className="start-button" onClick={() => navigate("/grades")}>
          START
        </button>
      </div>
    </div>
  );
}
