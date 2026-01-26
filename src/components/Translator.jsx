import { useEffect, useState } from "react"

function Translator({ text }) {
  const [translated, setTranslated] = useState("")
  const [target, setTarget] = useState("en")
  const [voices, setVoices] = useState([])
  const [selectedVoice, setSelectedVoice] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState("")
  const endpoints = import.meta.env.DEV
    ? [
        { type: "mymemory", url: "https://api.mymemory.translated.net/get" },
        { type: "libre", url: "/api/translate-alt" },
        { type: "libre", url: "/api/translate" }
      ]
    : [
        { type: "mymemory", url: "https://api.mymemory.translated.net/get" },
        { type: "libre", url: "https://translate.argosopentech.com/translate" }
      ]
  const detectSource = (value) =>
    /[\u0E00-\u0E7F]/.test(value) ? "th" : "en"

  useEffect(() => {
    const loadVoices = () => {
      if (typeof speechSynthesis === "undefined") return
      setVoices(speechSynthesis.getVoices())
    }

    // Voices are often loaded asynchronously.
    loadVoices()
    if (typeof speechSynthesis !== "undefined") {
      speechSynthesis.addEventListener("voiceschanged", loadVoices)
    }

    return () => {
      if (typeof speechSynthesis !== "undefined") {
        speechSynthesis.removeEventListener("voiceschanged", loadVoices)
      }
    }
  }, [])

  useEffect(() => {
    setTranslated("")
    setSelectedVoice("")
  }, [target, text])

  const translate = async () => {
    setIsTranslating(true)
    setError("")
    let lastError = ""
    try {
      const payload = {
        q: text,
        source: detectSource(text),
        target: target,
        format: "text"
      }

      for (const endpoint of endpoints) {
        try {
          const res =
            endpoint.type === "mymemory"
              ? await fetch(
                  `${endpoint.url}?q=${encodeURIComponent(text)}&langpair=${payload.source}|${payload.target}`
                )
              : await fetch(endpoint.url, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload)
                })

          if (!res.ok) {
            let errorDetail = ""
            try {
              const data = await res.json()
              errorDetail = data?.error || data?.responseDetails || ""
            } catch (err) {
              try {
                errorDetail = await res.text()
              } catch (innerErr) {
                errorDetail = ""
              }
            }

            if (errorDetail.includes("API key")) {
              lastError = "ต้องใช้ API key สำหรับเซิร์ฟเวอร์นี้"
            } else {
              lastError = errorDetail
                ? `${errorDetail} (HTTP ${res.status})`
                : `HTTP ${res.status}`
            }
            continue
          }

          const data = await res.json()
          const translatedText =
            endpoint.type === "mymemory"
              ? data?.responseData?.translatedText || ""
              : data.translatedText || ""
          if (translatedText) {
            setTranslated(translatedText)
            return translatedText
          }
          if (data.error) {
            lastError = data.error
          }
        } catch (err) {
          lastError = err?.message || "แปลไม่สำเร็จ"
        }
      }

      setTranslated("")
      setError(lastError || "แปลไม่สำเร็จ ลองใหม่อีกครั้ง")
      return ""
    } catch (err) {
      setError("แปลไม่สำเร็จ ลองใหม่อีกครั้ง")
      return ""
    } finally {
      setIsTranslating(false)
    }
  }

  const speak = async () => {
    if (typeof speechSynthesis === "undefined") return

    let textToSpeak = translated.trim()
    if (!textToSpeak) {
      textToSpeak = await translate()
    }
    if (!textToSpeak.trim()) return

    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    const targetLang = target === "ms" ? "ms-MY" : "en-US"
    const preferredVoice =
      (selectedVoice &&
        voices.find((voice) => voice.name === selectedVoice)) ||
      voices.find((voice) => voice.lang === targetLang) ||
      voices.find((voice) => voice.lang.startsWith(targetLang.slice(0, 2)))

    utterance.lang = targetLang
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
  }

  return (
    <div className="mt-6 p-4 bg-slate-50 rounded-xl border">
      <h3 className="font-semibold mb-2">แปลภาษา + ฟังเสียง</h3>

      <select
        className="border p-2 mb-2 mr-2"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
      >
        <option value="en">English</option>
        <option value="ms">Malay</option>
      </select>

      <select
        className="border p-2 mb-2 mr-2"
        value={selectedVoice}
        onChange={(e) => setSelectedVoice(e.target.value)}
      >
        <option value="">เสียงอัตโนมัติ</option>
        {voices
          .filter((voice) =>
            voice.lang
              .toLowerCase()
              .startsWith(target === "ms" ? "ms" : "en")
          )
          .map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
      </select>

      <button
        onClick={translate}
        disabled={isTranslating}
        className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
      >
        {isTranslating ? "กำลังแปล..." : "แปล"}
      </button>

      <button
        onClick={speak}
        disabled={isTranslating}
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        🔊 ฟังเสียง
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      {voices.length > 0 &&
        voices.filter((voice) =>
          voice.lang
            .toLowerCase()
            .startsWith(target === "ms" ? "ms" : "en")
        ).length === 0 && (
          <p className="mt-2 text-sm text-amber-600">
            เครื่องนี้ไม่มีเสียงภาษา {target === "ms" ? "Malay" : "English"} ให้เลือก
          </p>
        )}

      <p className="mt-3 text-gray-700">{translated}</p>
    </div>
  )
}

export default Translator
