import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function P5FoodChainVocab() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [playingLang, setPlayingLang] = useState(null);

  const playSound = (src, lang) => {
    setPlayingLang(lang);
    const audio = new Audio(src);
    audio.currentTime = 0;
    audio.play();
    audio.onended = () => setPlayingLang(null);
  };

  const vocabPage1 = [
    {
      th: "การพรางตัว",
      ms: "อารอ เฆมาย ดีรี",
      en: "Camouflage",
      emoji: "🦎",
      audio: {
        th: "/audio/p5/foodchain/camouflage_th.mp3",
        ms: "/audio/p5/foodchain/camouflage_ms.mp3",
        en: "/audio/p5/foodchain/camouflage_en.mp3",
      },
    },
    {
      th: "พืช",
      ms: "ตูมเบ(ป้อง ทาย)",
      en: "Plant",
      emoji: "🌱",
      audio: {
        th: "/audio/p5/foodchain/plant_th.mp3",
        ms: "/audio/p5/foodchain/plant_ms.mp3",
        en: "/audio/p5/foodchain/plant_en.mp3",
      },
    },
    {
      th: "สัตว์",
      ms: "บีนาตง",
      en: "Animal",
      emoji: "🐘",
      audio: {
        th: "/audio/p5/foodchain/animal_th.mp3",
        ms: "/audio/p5/foodchain/animal_ms.mp3",
        en: "/audio/p5/foodchain/animal_en.mp3",
      },
    },
    {
      th: "กลุ่มของสิ่งมีชีวิต",
      ms: "กุมปูลัน ฮายัต",
      en: "Group of Organisms",
      emoji: "👥",
      audio: {
        th: "/audio/p5/foodchain/group_th.mp3",
        ms: "/audio/p5/foodchain/group_ms.mp3",
        en: "/audio/p5/foodchain/group_en.mp3",
      },
    },
    {
      th: "แหล่งที่อยู่อาศัย",
      ms: "ตีงกัต ดูดุ",
      en: "Habitat",
      emoji: "🏡",
      audio: {
        th: "/audio/p5/foodchain/habitat_th.mp3",
        ms: "/audio/p5/foodchain/habitat_ms.mp3",
        en: "/audio/p5/foodchain/habitat_en.mp3",
      },
    },
  ];

  const vocabPage2 = [
    {
      th: "โซ่อาหาร",
      ms: "ราตา บากาเน",
      en: "Food Chain",
      emoji: "⛓️",
      audio: {
        th: "/audio/p5/foodchain/foodchain_th.mp3",
        ms: "/audio/p5/foodchain/foodchain_ms.mp3",
        en: "/audio/p5/foodchain/foodchain_en.mp3",
      },
    },
    {
      th: "การดำรงชีวิต",
      ms: "อารอ ฮีดูป",
      en: "Survival",
      emoji: "💪",
      audio: {
        th: "/audio/p5/foodchain/survival_th.mp3",
        ms: "/audio/p5/foodchain/survival_ms.mp3",
        en: "/audio/p5/foodchain/survival_en.mp3",
      },
    },
    {
      th: "การถ่ายทอดพลังงาน",
      ms: "อารอ ปินะห์ ตือนาโก",
      en: "Energy Transfer",
      emoji: "⚡",
      audio: {
        th: "/audio/p5/foodchain/energy_th.mp3",
        ms: "/audio/p5/foodchain/energy_ms.mp3",
        en: "/audio/p5/foodchain/energy_en.mp3",
      },
    },
    {
      th: "ผู้ผลิต",
      ms: "ออเร ปูงั๊ต",
      en: "Producer",
      emoji: "🏭",
      audio: {
        th: "/audio/p5/foodchain/producer_th.mp3",
        ms: "/audio/p5/foodchain/producer_ms.mp3",
        en: "/audio/p5/foodchain/producer_en.mp3",
      },
    },
    {
      th: "ผู้บริโภค",
      ms: "ออเร ซุนอ / ออเร มากัน",
      en: "Consumer",
      emoji: "🛒",
      audio: {
        th: "/audio/p5/foodchain/consumer_th.mp3",
        ms: "/audio/p5/foodchain/consumer_ms.mp3",
        en: "/audio/p5/foodchain/consumer_en.mp3",
      },
    },
  ];

  const currentData = page === 1 ? vocabPage1 : vocabPage2;

  return (
    <div className="vocab-page">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .vocab-page {
          min-height: 100vh;
          width: 100%;
          padding: 20px;
          background: linear-gradient(135deg, #f0f9ff 0%, #e6f4ff 50%, #d9f0f7 100%);
          font-family: 'Prompt', sans-serif;
          position: relative;
          overflow-y: auto;
          overflow-x: hidden;
        }
        
        /* องค์ประกอบตกแต่ง */
        .decor-leaf {
          position: fixed;
          font-size: 60px;
          opacity: 0.1;
          pointer-events: none;
          z-index: 1;
        }
        
        .leaf-1 {
          top: 10%;
          left: 2%;
          animation: float 7s ease-in-out infinite;
        }
        
        .leaf-2 {
          bottom: 10%;
          right: 2%;
          animation: float 9s ease-in-out infinite reverse;
        }
        
        .leaf-3 {
          top: 20%;
          right: 5%;
          font-size: 40px;
          animation: float 5s ease-in-out infinite;
        }
        
        .vocab-header {
          text-align: center;
          margin-bottom: 25px;
          position: relative;
          z-index: 10;
          animation: fadeInUp 0.8s ease-out;
          padding: 0 10px;
        }
        
        .vocab-header h1 {
          margin: 0;
          font-size: 42px;
          font-weight: 800;
          background: linear-gradient(135deg, #2e7d32, #1976d2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          line-height: 1.3;
        }
        
        .vocab-header p {
          margin: 8px 0 0;
          font-size: 20px;
          color: #1e4b5e;
          font-weight: 500;
        }
        
        .vocab-card {
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,50,30,0.2);
          border: 2px solid rgba(76, 175, 80, 0.3);
          position: relative;
          z-index: 10;
          animation: slideIn 0.6s ease-out;
        }
        
        .table-container {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        
        .vocab-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
        }
        
        .vocab-table th {
          padding: 18px 15px;
          font-size: 20px;
          font-weight: 600;
          color: white;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
          position: relative;
          white-space: nowrap;
        }
        
        .vocab-table th::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 10%;
          width: 80%;
          height: 3px;
          background: rgba(255,255,255,0.5);
          border-radius: 3px;
        }
        
        .vocab-table td {
          padding: 18px 15px;
          border-bottom: 2px solid rgba(200, 230, 200, 0.5);
          font-size: 18px;
          transition: all 0.3s ease;
          vertical-align: middle;
        }
        
        .vocab-table tr:hover td {
          background-color: rgba(200, 230, 200, 0.3) !important;
        }
        
        .col-th {
          background: linear-gradient(135deg, #4caf50, #2e7d32);
        }
        
        .col-ms {
          background: linear-gradient(135deg, #ffb74d, #f57c00);
        }
        
        .col-en {
          background: linear-gradient(135deg, #ef5350, #c62828);
        }
        
        .col-audio {
          background: linear-gradient(135deg, #29b6f6, #0277bd);
        }
        
        .cell-th {
          background-color: #e8f5e8;
          font-weight: 500;
        }
        
        .cell-ms {
          background-color: #fff3e0;
        }
        
        .cell-en {
          background-color: #ffebee;
        }
        
        .cell-audio {
          background-color: #e1f5fe;
        }
        
        .emoji-cell {
          font-size: 24px;
          margin-right: 8px;
          display: inline-block;
          animation: float 3s ease-in-out infinite;
        }
        
        .word-content {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 5px;
        }
        
        .audio-btn {
          background: none;
          border: none;
          font-size: 22px;
          margin: 0 5px;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 50%;
          transition: all 0.3s;
          position: relative;
        }
        
        .audio-btn:hover {
          transform: scale(1.2) rotate(10deg);
          background-color: rgba(255,255,255,0.8);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        
        .audio-btn.playing {
          animation: pulse 0.5s ease-in-out infinite;
          background-color: rgba(255,255,0,0.3);
        }
        
        .audio-btn.th {
          color: #2e7d32;
        }
        
        .audio-btn.ms {
          color: #f57c00;
        }
        
        .audio-btn.en {
          font-size: 16px;
          font-weight: 600;
          background: linear-gradient(135deg, #ef5350, #c62828);
          color: white;
          padding: 8px 16px;
          border-radius: 30px;
        }
        
        .audio-btn.en:hover {
          background: linear-gradient(135deg, #c62828, #b71c1c);
        }
        
        .vocab-footer {
          max-width: 1300px;
          margin: 25px auto 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 10;
          animation: fadeInUp 0.8s ease-out 0.2s both;
          padding: 0 10px;
          gap: 15px;
        }
        
        .page-info {
          font-size: 18px;
          font-weight: 600;
          color: #1e4b5e;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(5px);
          padding: 12px 28px;
          border-radius: 50px;
          box-shadow: 0 4px 15px rgba(0,50,30,0.1);
          border: 2px solid #81c784;
          white-space: nowrap;
        }
        
        .nav-btn {
          background: white;
          border: none;
          padding: 14px 30px;
          border-radius: 50px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: all 0.3s;
          color: #2e7d32;
          border: 2px solid #81c784;
          min-width: 140px;
          white-space: nowrap;
        }
        
        .nav-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(46, 125, 50, 0.3);
          background: linear-gradient(135deg, #ffffff, #f1f8e9);
        }
        
        .nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: none;
        }
        
        .btn-next {
          background: linear-gradient(135deg, #4caf50, #2e7d32);
          color: white;
          border: none;
          padding: 14px 30px;
          border-radius: 50px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(46, 125, 50, 0.4);
          transition: all 0.3s;
          min-width: 140px;
          white-space: nowrap;
        }
        
        .btn-next:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(46, 125, 50, 0.5);
          background: linear-gradient(135deg, #2e7d32, #1b5e20);
        }
        
        .back-home-btn {
          background: white;
          border: none;
          padding: 14px 30px;
          border-radius: 50px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: all 0.3s;
          color: #c62828;
          border: 2px solid #ef9a9a;
          min-width: 140px;
          white-space: nowrap;
        }
        
        .back-home-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(198, 40, 40, 0.2);
          background: #ffebee;
        }
        
        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, #4caf50, #81c784, #4caf50);
          transition: width 0.3s ease;
          z-index: 100;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .vocab-page {
            padding: 15px 10px;
          }
          
          .vocab-header h1 {
            font-size: 28px;
          }
          
          .vocab-header p {
            font-size: 16px;
          }
          
          .vocab-table th {
            font-size: 16px;
            padding: 12px 8px;
          }
          
          .vocab-table td {
            font-size: 14px;
            padding: 12px 8px;
          }
          
          .word-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
          }
          
          .emoji-cell {
            font-size: 18px;
            margin-right: 4px;
          }
          
          .audio-btn {
            font-size: 18px;
            padding: 6px 8px;
            margin: 0 2px;
          }
          
          .audio-btn.en {
            font-size: 12px;
            padding: 6px 10px;
          }
          
          .nav-btn, .btn-next, .back-home-btn {
            padding: 10px 16px;
            min-width: 100px;
            font-size: 14px;
          }
          
          .page-info {
            padding: 8px 16px;
            font-size: 14px;
          }
          
          .vocab-footer {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
        
        @media (max-width: 480px) {
          .vocab-header h1 {
            font-size: 24px;
          }
          
          .vocab-table {
            min-width: 650px;
          }
          
          .nav-btn, .btn-next, .back-home-btn {
            min-width: 80px;
            font-size: 12px;
            padding: 8px 12px;
          }
          
          .page-info {
            order: -1;
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      {/* องค์ประกอบตกแต่ง */}
      <div className="decor-leaf leaf-1">🌿</div>
      <div className="decor-leaf leaf-2">🍃</div>
      <div className="decor-leaf leaf-3">🦋</div>
      
      {/* แถบความคืบหน้า */}
      <div 
        className="progress-bar" 
        style={{ width: page === 1 ? '50%' : '100%' }}
      />

      <header className="vocab-header">
        <h1>
          <span style={{ animation: 'float 3s ease-in-out infinite', display: 'inline-block' }}>📚</span>{' '}
          คำศัพท์วิทยาศาสตร์น่ารู้
          <span style={{ animation: 'float 3s ease-in-out infinite 0.5s', display: 'inline-block' }}> ✨</span>
        </h1>
        <p>🐾 เรื่อง โซ่อาหารและการดำรงชีวิตของสิ่งมีชีวิต 🐾</p>
      </header>

      <div className="vocab-card">
        <div className="table-container">
          <table className="vocab-table">
            <thead>
              <tr>
                <th className="col-th">🇹🇭 ภาษาไทย</th>
                <th className="col-ms">🇲🇾 ภาษามลายู</th>
                <th className="col-en">🇬🇧 ภาษาอังกฤษ</th>
                <th className="col-audio">🔊 ฟังเสียง</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((row, idx) => (
                <tr key={idx} style={{ animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both` }}>
                  <td className="cell-th">
                    <div className="word-content">
                      <span className="emoji-cell">{row.emoji}</span>
                      <span>{row.th}</span>
                    </div>
                  </td>
                  <td className="cell-ms">{row.ms}</td>
                  <td className="cell-en">{row.en}</td>
                  <td className="cell-audio">
                    <button 
                      className={`audio-btn th ${playingLang === 'th' ? 'playing' : ''}`} 
                      onClick={() => playSound(row.audio.th, 'th')}
                    >
                      🇹🇭
                    </button>
                    <button 
                      className={`audio-btn ms ${playingLang === 'ms' ? 'playing' : ''}`} 
                      onClick={() => playSound(row.audio.ms, 'ms')}
                    >
                      🇲🇾
                    </button>
                    <button 
                      className={`audio-btn en ${playingLang === 'en' ? 'playing' : ''}`} 
                      onClick={() => playSound(row.audio.en, 'en')}
                    >
                      🔊 EN
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="vocab-footer">
        {page === 1 ? (
          <button
            className="back-home-btn"
            onClick={() => navigate("/p5/life/foodchain")}
          >
            ← กลับ
          </button>
        ) : (
          <button
            className="nav-btn"
            onClick={() => setPage(1)}
          >
            ← หน้าก่อน
          </button>
        )}

        <span className="page-info">
          📖 หน้า {page} / 2
        </span>

        {page === 1 ? (
          <button className="btn-next" onClick={() => setPage(2)}>
            หน้า 2 →
          </button>
        ) : (
          <button className="btn-next" onClick={() => navigate("/p5/life/foodchain/scene")}>
            เรียนรู้ต่อ →
          </button>
        )}
      </div>
    </div>
  );
}