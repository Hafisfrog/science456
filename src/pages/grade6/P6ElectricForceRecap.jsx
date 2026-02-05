import { useNavigate } from "react-router-dom";
import "./P6ElectricForceRecap.css";

export default function P6ElectricForceRecap() {
  const navigate = useNavigate();

  return (
    <div className="p6-recap-page">
      <div className="p6-recap-stage">
        <div className="p6-recap-topbar">
          <button className="p6-recap-back" type="button" onClick={() => navigate("/p6/electric-force/experiments")}>
            ← กลับหน้าเลือกการทดลอง
          </button>

          <button className="p6-recap-sound" type="button" aria-label="sound">
            <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <path
                d="M14 26h12l14-10v32l-14-10H14z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M46 22c4 4 4 16 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M52 16c7 7 7 25 0 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="p6-recap-titleWrap">
          <h1 className="p6-recap-title">สรุปแรงไฟฟ้าน่ารู้</h1>
        </div>

        <div className="p6-recap-grid">
          <section className="p6-recap-card">
            <div className="p6-recap-chip">การเกิดแรงไฟฟ้า</div>

            <div className="p6-recap-sectionTitle">แรงไฟฟ้าคืออะไร?</div>
            <p className="p6-recap-text">
              แรงไฟฟ้า คือแรงที่เกิดขึ้นระหว่างวัตถุที่มีประจุไฟฟ้า เมื่อวัตถุมีประจุเหมือนกันจะ “ผลักกัน”
              และเมื่อมีประจุต่างกันจะ “ดึงดูดกัน”
            </p>

            <div className="p6-recap-sectionTitle">ประจุไฟฟ้ามี 2 ชนิด</div>
            <div className="p6-recap-icons">
              <div className="p6-recap-charge plus" aria-label="plus">
                +
              </div>
              <div className="p6-recap-charge minus" aria-label="minus">
                −
              </div>
              <p className="p6-recap-text" style={{ margin: 0 }}>
                ประจุไฟฟ้าบวก (+) และประจุไฟฟ้าลบ (−)
              </p>
            </div>

            <div className="p6-recap-sectionTitle">เกิดได้อย่างไร?</div>
            <p className="p6-recap-text">
              เมื่อ “ขัดถู” วัตถุสองชนิดเข้าด้วยกัน จะเกิดการถ่ายโอนอิเล็กตรอน ทำให้วัตถุหนึ่งมีประจุลบมากขึ้น
              และอีกวัตถุหนึ่งมีประจุบวกมากขึ้น วัตถุจึงไม่เป็นกลางทางไฟฟ้า
            </p>
          </section>

          <section className="p6-recap-card">
            <div className="p6-recap-chip" style={{ background: "rgba(250, 204, 21, 0.14)", borderColor: "rgba(250, 204, 21, 0.2)" }}>
              ผลของแรงไฟฟ้าที่เกิดขึ้น
            </div>

            <div className="p6-recap-mini">
              <div className="p6-recap-rule">
                <strong>ประจุต่างกัน</strong>
                <div className="p6-recap-dots" aria-label="opposite-charges">
                  <span className="p6-recap-dot blue">+</span>
                  <span style={{ fontWeight: 1000 }}>ดึงดูดกัน</span>
                  <span className="p6-recap-dot pink">−</span>
                </div>
              </div>

              <div className="p6-recap-rule">
                <strong>ประจุเหมือนกัน</strong>
                <div className="p6-recap-dots" aria-label="same-charges">
                  <span className="p6-recap-dot blue">+</span>
                  <span className="p6-recap-dot blue">+</span>
                  <span style={{ fontWeight: 1000 }}>ผลักกัน</span>
                  <span className="p6-recap-dot pink">−</span>
                  <span className="p6-recap-dot pink">−</span>
                </div>
              </div>
            </div>

            <div className="p6-recap-sectionTitle">สรุปจากการทดลอง</div>
            <p className="p6-recap-text">
              - ขัดถูลูกโป่งทั้ง 2 ใบด้วยกระดาษเยื่อ: ลูกโป่งมีประจุเหมือนกัน → ผลักกัน
              <br />
              - ขัดถูลูกโป่งแค่ 1 ใบ: อีกใบถูกเหนี่ยวนำให้ประจุแยกตัว → ดึงดูดกัน
            </p>
          </section>
        </div>

        <div className="p6-recap-bottom">
          <div className="p6-recap-life">
            <div className="p6-recap-sectionTitle" style={{ marginTop: 0 }}>
              ตัวอย่างในชีวิตประจำวัน
            </div>
            <p className="p6-recap-text" style={{ margin: 0 }}>
              หวีผมด้วยหวีพลาสติกแล้วนำไปใกล้เศษกระดาษ → เศษกระดาษถูกดึงดูดเข้าหาหวี
            </p>
          </div>
        </div>

        <div className="p6-recap-actions">
          <button className="p6-recap-btn ghost" type="button" onClick={() => navigate("/p6/electric-force/vocab")}>
            ← กลับคำศัพท์
          </button>
          <button className="p6-recap-btn primary" type="button" onClick={() => navigate("/p6/experiment/electric-generation/steps?from=unit")}>
            ไปทดลองที่ 1 →
          </button>
        </div>
      </div>
    </div>
  );
}

