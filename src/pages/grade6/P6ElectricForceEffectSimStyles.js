const forceEffectSimStyles = `.p6-force-sim-page {
  --force-ink: #0f172a;
  --force-muted: #475569;
  --force-panel: rgba(255, 255, 255, 0.72);
  --force-border: rgba(148, 163, 184, 0.34);
  --force-shadow: 0 22px 42px rgba(17, 24, 39, 0.14);
  --sim-pad: 0px;
  min-height: 100dvh;
  height: 100dvh;
  overflow: hidden;
  padding: 0;
  background:
    radial-gradient(78% 58% at 50% 35%, #f6efef 0 62%, transparent 63%),
    radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%),
    radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%),
    linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%);
  font-family: "Prompt", sans-serif;
  color: var(--force-ink);
  position: relative;
}

.p6-force-sim-page::before,
.p6-force-sim-page::after {
  display: none;
}

.p6-force-sim-page::before {
  content: none;
}

.p6-force-sim-page::after {
  content: none;
}

.p6-force-sim-stage {
  position: relative;
  isolation: isolate;
  z-index: 1;
  max-width: 100%;
  width: 100%;
  height: 100dvh;
  margin: 0;
  display: grid;
  grid-template-columns: 420px minmax(0, 1fr);
  gap: clamp(10px, 1.6vw, 18px);
  align-items: stretch;
  padding: clamp(10px, 1.5vw, 16px);
  border-radius: 0;
  background: linear-gradient(180deg, rgba(251, 252, 254, 0.8), rgba(244, 246, 249, 0.8));
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: var(--force-shadow);
  overflow: hidden;
}

.p6-force-sim-live-timer {
  position: absolute;
  right: clamp(18px, 2vw, 28px);
  top: clamp(34px, 4vh, 58px);
  z-index: 72;
  min-width: clamp(150px, 13vw, 190px);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.93);
  border: 2px solid rgba(148, 163, 184, 0.34);
  box-shadow: 0 16px 28px rgba(15, 23, 42, 0.16);
  padding: 8px 10px;
  text-align: right;
}

.p6-force-sim-live-timer-title {
  font-size: 12px;
  font-weight: 900;
  color: #334155;
  line-height: 1.1;
}

.p6-force-sim-live-timer-time {
  margin-top: 2px;
  font-size: 24px;
  font-weight: 1000;
  color: #0f172a;
  line-height: 1;
}

.p6-force-sim-backTop {
  position: absolute;
  left: 16px;
  top: 14px;
  border: none;
  border-radius: 14px;
  padding: 10px 14px;
  background: linear-gradient(135deg, #ffffff, #f4f8ff);
  color: #1e293b;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 12px 20px rgba(17, 24, 39, 0.14);
  transition: transform 0.12s ease, box-shadow 0.12s ease;
  z-index: 60;
}

.p6-force-sim-backTop:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 24px rgba(17, 24, 39, 0.18);
}

.p6-force-sim-langbar {
  position: absolute;
  left: 22px;
  bottom: 22px;
  z-index: 65;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.9);
  border: 0;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.14);
  pointer-events: auto;
}

.p6-force-sim-langchip {
  border: 0;
  cursor: pointer;
  border-radius: 14px;
  min-width: 0;
  min-height: 0;
  padding: 10px 18px;
  background: #e6f2ff;
  color: #0f172a;
  font-family: inherit;
  font-size: 16px;
  font-weight: 800;
  line-height: 24px;
  box-shadow: none;
  opacity: 1;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.12s ease;
}

.p6-force-sim-langchip:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 22px rgba(0, 0, 0, 0.14);
}

.p6-force-sim-langchip.active {
  background: #bfe0ff !important;
  color: #0f172a !important;
  box-shadow: none;
}

.p6-force-sim-sidebar {
  position: relative;
  z-index: 40;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: stretch;
  padding: 16px;
  padding-bottom: 110px;
  border-radius: 22px;
  background: var(--force-panel);
  border: 1px solid var(--force-border);
  box-shadow: 0 16px 30px rgba(17, 24, 39, 0.1);
  backdrop-filter: blur(6px);
  overflow: hidden;
}

.p6-force-sim-sidewrap {
  position: relative;
  flex: 1;
  min-height: 0;
}

.p6-force-sim-sidebtn {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(248, 251, 255, 0.94));
  border: 1px solid rgba(148, 163, 184, 0.28);
  width: 100%;
  cursor: pointer;
  display: grid;
  justify-items: center;
  gap: 8px;
  text-align: center;
  padding: 10px 8px 12px;
  border-radius: 16px;
  box-shadow: 0 10px 18px rgba(17, 24, 39, 0.08);
  transition: transform 0.12s ease, filter 0.12s ease;
}

.p6-force-sim-sidebtn:hover {
  transform: translateY(-2px);
  filter: drop-shadow(0 14px 18px rgba(17, 24, 39, 0.12));
}

.p6-force-sim-sidebtn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  transform: none;
  filter: none;
}

.p6-force-sim-icon {
  width: 54px;
  height: 54px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  box-shadow: 0 14px 24px rgba(17, 24, 39, 0.18);
  border: 2px solid rgba(255, 255, 255, 0.65);
}

.p6-force-sim-icon svg {
  width: 26px;
  height: 26px;
}

.p6-force-sim-icon.pink {
  background: radial-gradient(circle at 30% 30%, #ffd1dc, #f06595);
}

.p6-force-sim-icon.blue {
  background: radial-gradient(circle at 30% 30%, #d3f4ff, #3b82f6);
}

.p6-force-sim-icon.yellow {
  background: radial-gradient(circle at 30% 30%, #fff2b5, #f59e0b);
}

.p6-force-sim-sidebtn span {
  font-weight: 900;
  font-size: 15px;
}

.p6-force-sim-center {
  position: relative;
  z-index: 20;
  min-width: 0;
  min-height: 0;
  display: grid;
  place-items: center;
  padding-top: 18px;
}

.p6-force-sim-board {
  width: 100%;
  max-width: none;
  height: 100%;
  min-height: 0;
  background:
    radial-gradient(circle at 20% 10%, rgba(255, 255, 255, 0.55), transparent 60%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.16));
  border-radius: 28px;
  box-shadow:
    0 28px 56px rgba(17, 24, 39, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.55);
  display: grid;
  grid-template-rows: 1fr auto auto;
  padding: 16px 18px 14px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  overflow: visible;
}

.p6-force-sim-balloons {
  position: relative;
  height: clamp(340px, 46vh, 430px);
  padding: 8px 8px 0;
}

.p6-force-sim-balloon {
  position: relative;
  width: clamp(230px, 24vw, 320px);
  aspect-ratio: 1 / 1.1;
  border-radius: 50% 50% 46% 46%;
  background:
    radial-gradient(circle at 30% 25%, #ffd3d3, #ea3b3b 45%, #b91c1c 74%, #7f1d1d);
  box-shadow:
    inset 0 -20px 30px rgba(0, 0, 0, 0.25),
    inset 0 10px 20px rgba(255, 255, 255, 0.18),
    0 26px 38px rgba(17, 24, 39, 0.16);
  position: absolute;
  top: 95%;
  left: 50%;
  transform: translate(-50%, -50%) translateX(calc(var(--base) + var(--shift, 0px))) scale(1);
  transition: transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.55);
}

.p6-force-sim-balloon.left {
  --base: -172px;
}

.p6-force-sim-balloon.right {
  --base: 172px;
}

.p6-force-sim-balloon::before {
  content: "";
  position: absolute;
  inset: 10% 12% 18% 12%;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.65), transparent 60%);
  transform: rotate(-10deg);
}

.p6-force-sim-balloon::after {
  content: "";
  position: absolute;
  top: -14px;
  left: 50%;
  width: 18px;
  height: 18px;
  border-radius: 6px 6px 10px 10px;
  background: #991b1b;
  transform: translateX(-50%) rotate(12deg);
  box-shadow: 0 6px 10px rgba(17, 24, 39, 0.18);
}

.p6-force-sim-balloon.repel.left {
  --shift: -38px;
}

.p6-force-sim-balloon.repel.right {
  --shift: 38px;
}

.p6-force-sim-balloon.attract.left {
  --shift: 52px;
}

.p6-force-sim-balloon.attract.right {
  --shift: -52px;
}

.p6-force-sim-marker {
  position: absolute;
  width: clamp(200px, 24vw, 280px);
  height: clamp(76px, 9.5vw, 102px);
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%) translateX(calc(var(--base) + var(--shift, 0px))) rotate(var(--tilt));
  transition: transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
  filter: drop-shadow(0 20px 28px rgba(17, 24, 39, 0.2));
  z-index: 3;
}

.p6-force-sim-marker.left {
  --base: -168px;
  --tilt: -28deg;
}

.p6-force-sim-marker.right {
  --base: 168px;
  --tilt: 28deg;
}

.p6-force-sim-current-trial {
  margin: 10px auto 8px;
  width: fit-content;
  max-width: min(92%, 700px);
  padding: 10px 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.94);
  border: 2px solid rgba(15, 23, 42, 0.2);
  font-weight: 1000;
  font-size: clamp(16px, 1.25vw, 22px);
  text-align: center;
  box-shadow: 0 14px 24px rgba(17, 24, 39, 0.14);
}

.p6-force-sim-current-trial-label {
  opacity: 0.9;
}

.p6-force-sim-current-trial-value {
  color: #0b3ea8;
}

.p6-force-sim-marker-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
}

.p6-force-sim-marker.right .p6-force-sim-marker-image {
  transform: scaleX(-1);
}

.p6-force-sim-marker.attract.left {
  --shift: 48px;
}

.p6-force-sim-marker.repel.left {
  --shift: -34px;
}

.p6-force-sim-marker.attract.right {
  --shift: -48px;
}

.p6-force-sim-marker.repel.right {
  --shift: 34px;
}

.p6-force-sim-rub {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.p6-force-sim-tissue {
  position: absolute;
  top: 18%;
  left: 18%;
  width: 54%;
  height: 30%;
  border-radius: 16px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.7)),
    repeating-linear-gradient(
      90deg,
      rgba(148, 163, 184, 0.22) 0 6px,
      rgba(148, 163, 184, 0.12) 6px 12px
    );
  border: 2px solid rgba(15, 23, 42, 0.12);
  box-shadow: 0 18px 26px rgba(17, 24, 39, 0.18);
  transform: translate(0, 0) rotate(-8deg);
  animation: p6-force-rub 0.11s ease-in-out infinite alternate;
  opacity: 0.95;
}

.p6-force-sim-tissue::after {
  content: "";
  position: absolute;
  inset: 10% 12%;
  border-radius: 14px;
  border: 1px dashed rgba(15, 23, 42, 0.14);
}

.p6-force-sim-rub.rub-right .p6-force-sim-tissue {
  top: 20%;
  left: 26%;
  transform: translate(0, 0) rotate(8deg);
  animation: p6-force-rub 0.11s ease-in-out infinite alternate-reverse;
}

@keyframes p6-force-rub {
  from {
    transform: translate(-10px, 6px) rotate(-10deg);
    filter: brightness(1);
  }
  to {
    transform: translate(10px, -6px) rotate(-4deg);
    filter: brightness(1.04);
  }
}

.p6-force-sim-charges {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.p6-force-sim-balloon.charged .p6-force-sim-charges,
.p6-force-sim-marker.charged .p6-force-sim-charges {
  opacity: 1;
}

.p6-force-sim-charge {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.92);
  border: 2px solid rgba(17, 24, 39, 0.65);
  display: grid;
  place-items: center;
  font-weight: 900;
  line-height: 1;
  box-shadow: 0 12px 18px rgba(17, 24, 39, 0.18);
  animation: p6-force-charge-pop 0.35s ease both;
}

.p6-force-sim-charge.minus {
  border-radius: 999px;
  width: 22px;
  height: 8px;
  background: rgba(17, 24, 39, 0.92);
  border: none;
}

.p6-force-sim-instruction {
  text-align: center;
  font-size: clamp(18px, 1.9vw, 26px);
  font-weight: 1000;
  padding: 8px 10px 6px;
  letter-spacing: 0.2px;
}

.p6-force-sim-toast {
  margin: 0 auto;
  width: fit-content;
  max-width: 720px;
  padding: 8px 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.82);
  border: 2px solid rgba(17, 24, 39, 0.16);
  font-weight: 800;
  text-align: center;
  box-shadow: 0 18px 26px rgba(17, 24, 39, 0.12);
}

.p6-force-sim-summary {
  margin: 8px auto 0;
  max-width: 740px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.p6-force-sim-summary-chip {
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 1000;
  letter-spacing: 0.2px;
  border: 2px solid rgba(17, 24, 39, 0.16);
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 12px 18px rgba(17, 24, 39, 0.12);
}

.p6-force-sim-summary-chip.repel {
  background: rgba(239, 68, 68, 0.12);
  border-color: rgba(239, 68, 68, 0.3);
}

.p6-force-sim-summary-chip.attract {
  background: rgba(34, 197, 94, 0.12);
  border-color: rgba(34, 197, 94, 0.3);
}

.p6-force-sim-summary-text {
  font-weight: 900;
  opacity: 0.92;
  text-align: center;
}

.p6-force-sim-result {
  margin: 8px auto 0;
  width: 100%;
  max-width: 820px;
}

.p6-force-sim-result-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
  border-radius: 16px;
  background: rgba(231, 247, 255, 0.8);
  border: 2px solid rgba(17, 24, 39, 0.22);
  box-shadow: 0 18px 28px rgba(17, 24, 39, 0.12);
}

.p6-force-sim-result-table th,
.p6-force-sim-result-table td {
  padding: 12px 12px;
  border-right: 2px solid rgba(17, 24, 39, 0.22);
  border-bottom: 2px solid rgba(17, 24, 39, 0.22);
  font-weight: 1000;
  font-size: 16px;
}

.p6-force-sim-result-table thead th {
  background: rgba(224, 242, 254, 0.9);
}

.p6-force-sim-result-table tr:last-child td {
  border-bottom: none;
}

.p6-force-sim-result-table th:last-child,
.p6-force-sim-result-table td:last-child {
  border-right: none;
}

.p6-force-sim-result-table .active {
  background: rgba(37, 99, 235, 0.12);
}

.p6-force-sim-right {
  position: absolute;
  right: clamp(9px, 2vw, 26px);
  top: clamp(10px, 1.2vw, 18px);
  bottom: clamp(10px, 1.2vw, 18px);
  width: min(320px, 24vw);
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 10px;
  padding: 8px 0 10px;
  border-radius: 0;
  background: transparent;
  border: 0;
  box-shadow: none;
  backdrop-filter: none;
}

.p6-force-sim-bubble {
  position: relative;
  width: 100%;
  background: #ffffff;
  border: 4px solid rgba(15, 23, 42, 0.95);
  border-radius: 22px;
  padding: 14px 16px 16px;
  font-weight: 900;
  font-size: clamp(18px, 1.35vw, 22px);
  box-shadow: 0 18px 30px rgba(17, 24, 39, 0.16);
  line-height: 1.25;
}

.p6-force-sim-bubble::after {
  content: "";
  position: absolute;
  right: 26px;
  bottom: -14px;
  width: 22px;
  height: 22px;
  background: #ffffff;
  border-right: 4px solid #111827;
  border-bottom: 4px solid #111827;
  transform: rotate(45deg);
}

.p6-force-sim-character {
  width: clamp(210px, 24vh, 280px);
  max-width: 100%;
  filter: drop-shadow(0 22px 24px rgba(17, 24, 39, 0.2));
}


.p6-force-sim-actions {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  margin-top: 0;
  padding: 6px 0 0;
  gap: 16px;
  flex-wrap: wrap;
}

.p6-force-sim-start {
  border: none;
  cursor: pointer;
  background: transparent;
  display: grid;
  place-items: center;
  gap: 8px;
}

.p6-force-sim-start-icon {
  width: 76px;
  height: 76px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 30% 30%, #fff2b5, #f59e0b);
  box-shadow: 0 18px 28px rgba(17, 24, 39, 0.18);
  border: 2px solid rgba(255, 255, 255, 0.7);
  color: #0f172a;
}

.p6-force-sim-start-icon svg {
  width: 28px;
  height: 28px;
}

.p6-force-sim-start-label {
  font-weight: 900;
  font-size: 18px;
  color: #0f172a;
}

.p6-force-sim-reset {
  border: none;
  cursor: pointer;
  background: transparent;
  display: grid;
  place-items: center;
  gap: 8px;
}

.p6-force-sim-reset:hover .p6-force-sim-reset-icon,
.p6-force-sim-reset:hover .p6-force-sim-start-icon {
  transform: translateY(-1px);
}

.p6-force-sim-reset-icon {
  width: 76px;
  height: 76px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 30% 30%, #e2e8f0, #94a3b8);
  box-shadow: 0 18px 28px rgba(17, 24, 39, 0.18);
  border: 2px solid rgba(255, 255, 255, 0.7);
  color: #0f172a;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.p6-force-sim-reset-icon svg {
  width: 28px;
  height: 28px;
}

.p6-force-sim-result-card {
  width: 100%;
  margin-top: 8px;
  padding: 10px 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(15, 23, 42, 0.2);
  box-shadow: 0 16px 26px rgba(17, 24, 39, 0.12);
  display: grid;
  gap: 8px;
  text-align: center;
}

.p6-force-sim-result-card.is-center {
  width: fit-content;
  max-width: min(90%, 520px);
  margin: 10px auto 0;
}

.p6-force-sim-short-warning {
  margin: 8px auto 0;
  width: fit-content;
  max-width: min(90%, 720px);
  padding: 10px 14px;
  border-radius: 16px;
  background: rgba(254, 226, 226, 0.9);
  border: 2px solid rgba(239, 68, 68, 0.44);
  color: #991b1b;
  font-size: clamp(14px, 1.2vw, 18px);
  font-weight: 900;
  text-align: center;
  box-shadow: 0 14px 24px rgba(127, 29, 29, 0.18);
}

.p6-force-sim-result-title {
  font-weight: 1000;
  font-size: 16px;
}

.p6-force-sim-result-body {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: center;
}

.p6-force-sim-result-chip {
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 1000;
  background: rgba(59, 130, 246, 0.12);
  border: 2px solid rgba(59, 130, 246, 0.35);
}

.p6-force-sim-result-time {
  font-weight: 900;
  font-size: 14px;
  opacity: 0.85;
}

.p6-force-sim-summary-btn {
  margin-top: 8px;
  border: none;
  cursor: pointer;
  padding: 10px 18px;
  border-radius: 999px;
  font-weight: 1000;
  font-size: 15px;
  color: #ffffff;
  background: linear-gradient(135deg, #ef4444, #f97316);
  box-shadow: 0 16px 26px rgba(239, 68, 68, 0.24);
  border: 2px solid rgba(255, 255, 255, 0.65);
}

.p6-force-sim-summary-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 30px rgba(239, 68, 68, 0.3);
}

.p6-force-sim-progress {
  margin-top: 12px;
  width: 100%;
  border-radius: 22px;
  border: 1px solid rgba(191, 219, 254, 0.9);
  background: #eef5ff;
  box-shadow: 0 12px 22px rgba(15, 23, 42, 0.12);
  padding: 14px;
}

.p6-force-sim-progress-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.p6-force-sim-progress-title {
  font-size: 16px;
  font-weight: 1000;
  color: #0f172a;
}

.p6-force-sim-progress-pill {
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 14px;
  font-weight: 1000;
  padding: 6px 12px;
  white-space: nowrap;
}

.p6-force-sim-progress-bar {
  margin-top: 12px;
  height: 14px;
  overflow: hidden;
  border-radius: 999px;
  background: #d9e3f0;
}

.p6-force-sim-progress-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #60a5fa, #2563eb);
  transition: width 0.25s ease;
}

.p6-force-sim-progress-text {
  margin-top: 12px;
  color: #334155;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.5;
}

.p6-force-sim-backBottom {
  margin-top: 0;
  align-self: flex-end;
  margin-right: -6px;
  border: none;
  cursor: pointer;
  border-radius: 18px;
  padding: 14px 18px;
  min-width: 0;
  background: rgba(255, 255, 255, 0.92);
  color: #0f172a;
  font-size: 20px;
  font-weight: 900;
  box-shadow: 0 22px 46px rgba(0, 0, 0, 0.22);
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.p6-force-sim-backBottom:hover {
  transform: translateY(-1px);
  box-shadow: 0 28px 56px rgba(0, 0, 0, 0.26);
}

.p6-force-sim-menu {
  position: absolute;
  left: calc(100% + 18px);
  top: 0;
  transform: none;
  width: min(360px, 78vw);
  background: #eef5ff;
  border-radius: 24px;
  border: 2px solid rgba(148, 163, 184, 0.3);
  box-shadow: 0 28px 52px rgba(17, 24, 39, 0.18);
  overflow: hidden;
  z-index: 70;
  max-height: min(64vh, 500px);
  overflow-y: auto;
  padding: 12px;
}

.p6-force-sim-menu.is-static {
  position: static;
  width: 100%;
  max-height: 100%;
  left: auto;
  top: auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  box-sizing: border-box;
}

.p6-force-sim-menu-title {
  padding: 12px 14px 10px;
  font-weight: 1000;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 14px;
  margin-bottom: 8px;
}

.p6-force-sim-menu-group + .p6-force-sim-menu-group {
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  margin-top: 6px;
  padding-top: 6px;
}

.p6-force-sim-menu-group-title {
  padding: 6px 12px 4px;
  font-size: 14px;
  font-weight: 1000;
  color: #334155;
}

.p6-force-sim-menu button {
  width: 100%;
  padding: 12px 14px;
  border: 2px solid rgba(203, 213, 225, 0.8);
  background: #f2f7ff;
  border-radius: 18px;
  cursor: pointer;
  font-weight: 900;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  box-shadow: 0 10px 16px rgba(15, 23, 42, 0.08);
}

.p6-force-sim-menu button:hover {
  background: #e7f1ff;
}

.p6-force-sim-menu button.active {
  background: #cfe4ff;
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 12px 20px rgba(37, 99, 235, 0.18);
}

.p6-force-sim-menu-item.locked {
  background: #f1f5f9;
  border-color: rgba(148, 163, 184, 0.45);
  box-shadow: none;
}

.p6-force-sim-menu button[aria-disabled="true"] {
  opacity: 0.6;
}

.p6-force-sim-menu-item-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 0;
  flex: 1;
}

.p6-force-sim-menu-item-icon {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  background: #ffffff;
  border: 2px solid rgba(148, 163, 184, 0.35);
  display: grid;
  place-items: center;
  box-shadow: 0 8px 14px rgba(15, 23, 42, 0.08);
  flex: 0 0 auto;
}

.p6-force-sim-menu-item-icon img {
  width: 52px;
  height: 52px;
  object-fit: contain;
}

.p6-force-sim-menu-item-caption {
  font-size: 15px;
  font-weight: 1000;
  color: #1e293b;
  line-height: 1.1;
  text-align: center;
  letter-spacing: 0.1px;
}

.p6-force-sim-menu-check {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 2px solid rgba(148, 163, 184, 0.6);
  background: #ffffff;
  display: grid;
  place-items: center;
  font-size: 16px;
  font-weight: 900;
  color: #2563eb;
  flex: 0 0 auto;
}

.p6-force-sim-menu-check.active {
  border-color: rgba(37, 99, 235, 0.7);
  background: radial-gradient(circle at 35% 35%, #93c5fd, #2563eb);
  box-shadow: 0 6px 12px rgba(37, 99, 235, 0.32);
}

.p6-force-sim-timer {
  margin-top: -6px;
  font-weight: 900;
  font-size: 16px;
  opacity: 0.85;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.65);
  border: 2px solid rgba(17, 24, 39, 0.12);
  box-shadow: 0 14px 22px rgba(17, 24, 39, 0.12);
}

@keyframes p6-force-charge-pop {
  from {
    transform: scale(0.7);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 980px) {
  .p6-force-sim-page {
    min-height: 100vh;
    height: auto;
    overflow: auto;
  }

  .p6-force-sim-stage {
    height: auto;
    grid-template-columns: 380px 1fr;
    grid-template-rows: auto auto;
    padding-top: 64px;
  }

  .p6-force-sim-right {
    position: static;
    right: auto;
    top: auto;
    bottom: auto;
    width: auto;
    grid-column: 1 / -1;
    max-width: 680px;
    margin: 0 auto;
    padding-top: 16px;
  }

  .p6-force-sim-menu {
    left: calc(100% + 14px);
    top: 0;
  }

  .p6-force-sim-langbar {
    position: static;
    margin-top: 4px;
    width: fit-content;
  }

  .p6-force-sim-backBottom {
    border-radius: 16px;
    padding: 12px 16px;
    font-size: 18px;
  }

  .p6-force-sim-live-timer {
    right: 12px;
    top: 22px;
    min-width: 142px;
  }
}

@media (max-height: 820px) and (min-width: 981px) {
  .p6-force-sim-stage {
    grid-template-columns: 380px minmax(0, 1fr);
    gap: 10px;
    padding: 10px;
  }

  .p6-force-sim-sidebar {
    padding-top: 52px;
  }

  .p6-force-sim-balloons {
    height: clamp(210px, 32vh, 280px);
  }

  .p6-force-sim-instruction {
    font-size: clamp(16px, 1.5vw, 22px);
  }

  .p6-force-sim-bubble {
    font-size: 15px;
  }
}

@media (max-width: 640px) {
  .p6-force-sim-stage {
    grid-template-columns: 1fr;
    height: auto;
    padding: 58px 10px 10px;
  }

  .p6-force-sim-sidebar {
    flex-direction: row;
    justify-content: center;
    padding: 10px;
  }

  .p6-force-sim-menu {
    left: 50%;
    top: calc(100% + 12px);
    transform: translateX(-50%);
  }

  .p6-force-sim-backTop {
    left: 10px;
    top: 10px;
    padding: 8px 12px;
    font-size: 14px;
  }

  .p6-force-sim-langbar {
    align-self: center;
    gap: 8px;
    padding: 6px;
  }

  .p6-force-sim-langchip {
    min-width: 0;
    min-height: 36px;
    padding: 8px 12px;
    font-size: 14px;
  }

  .p6-force-sim-backBottom {
    border-radius: 16px;
    padding: 12px 16px;
    font-size: 18px;
  }

  .p6-force-sim-menu-item-icon {
    width: 58px;
    height: 58px;
  }

  .p6-force-sim-menu-item-icon img {
    width: 46px;
    height: 46px;
  }

  .p6-force-sim-menu-item-caption {
    font-size: 14px;
  }

  .p6-force-sim-live-timer {
    position: static;
    margin: 0 auto 8px;
    text-align: center;
    min-width: 0;
    width: fit-content;
  }
}
`;

export default forceEffectSimStyles;
