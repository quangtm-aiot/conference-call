export default function Home() {
  const pillars = [
    {
      title: "LiveKit media plane",
      body: "Audio/video realtime cho nhieu participant, tach biet khoi caption pipeline de giam do phuc tap khi demo MVP.",
    },
    {
      title: "NestJS caption gateway",
      body: "Nhan transcript qua WebSocket, fan-out ban dich theo ngon ngu tung listener, va dong bo room state qua Redis.",
    },
    {
      title: "Next.js meeting UX",
      body: "UI phong hop, overlay caption, language selector va transcript history duoc to chuc quanh App Router.",
    },
  ];

  const roadmap = [
    "Foundation: auth, tao room, join room, WebSocket gateway, LiveKit token",
    "Core pipeline: Web Speech API, translation fan-out, caption history, language map",
    "Polish for demo: export transcript, indicator speaker, browser fallback, deploy staging",
  ];

  return (
    <main
      style={{
        padding: "28px 0 72px",
      }}
    >
      <section
        className="page-shell"
        style={{
          display: "grid",
          gap: "24px",
          animation: "float-in 0.6s ease-out both",
        }}
      >
        <div
          className="glass-panel"
          style={{
            padding: "24px",
            borderRadius: "28px",
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span className="eyebrow">Conference Call MVP</span>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              color: "var(--muted)",
              fontSize: "14px",
            }}
          >
            <a href="/rooms/new">Create room</a>
            <a href="/rooms/demo-room">Open demo room</a>
            <a href="/dashboard">Transcript history</a>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "minmax(0, 1.45fr) minmax(320px, 0.85fr)",
          }}
        >
          <div
            className="glass-panel"
            style={{
              padding: "40px",
              borderRadius: "36px",
              minHeight: "520px",
              display: "grid",
              alignContent: "space-between",
              gap: "28px",
            }}
          >
            <div style={{ display: "grid", gap: "18px" }}>
              <span className="eyebrow">Real-time translated captions</span>
              <h1
                style={{
                  fontSize: "clamp(48px, 9vw, 104px)",
                  lineHeight: 0.94,
                  letterSpacing: "-0.06em",
                  maxWidth: "9ch",
                }}
              >
                One room.
                <br />
                Many languages.
              </h1>
              <p
                style={{
                  maxWidth: "56ch",
                  color: "var(--muted)",
                  fontSize: "18px",
                  lineHeight: 1.7,
                }}
              >
                Speaker noi ngon ngu tu nhien, browser xu ly speech-to-text,
                NestJS dich caption sang nhieu ngon ngu, va moi listener nhan
                duoc overlay dung voi language preference cua ho.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gap: "14px",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              }}
            >
              <a
                href="/rooms/new"
                style={{
                  padding: "18px 20px",
                  borderRadius: "18px",
                  background: "var(--accent)",
                  color: "#fff9f2",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Start a meeting
              </a>
              <a
                href="/landing"
                style={{
                  padding: "18px 20px",
                  borderRadius: "18px",
                  background: "var(--accent-soft)",
                  color: "var(--accent-strong)",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Product overview
              </a>
            </div>
          </div>

          <div style={{ display: "grid", gap: "24px" }}>
            <div
              className="glass-panel"
              style={{
                padding: "28px",
                borderRadius: "28px",
                display: "grid",
                gap: "18px",
              }}
            >
              <h2 style={{ fontSize: "22px" }}>System pillars</h2>
              {pillars.map((pillar) => (
                <article
                  key={pillar.title}
                  style={{
                    padding: "18px",
                    borderRadius: "20px",
                    background: "var(--surface-strong)",
                    border: "1px solid var(--border)",
                    display: "grid",
                    gap: "10px",
                  }}
                >
                  <h3 style={{ fontSize: "18px" }}>{pillar.title}</h3>
                  <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                    {pillar.body}
                  </p>
                </article>
              ))}
            </div>

            <div
              className="glass-panel"
              style={{
                padding: "28px",
                borderRadius: "28px",
                display: "grid",
                gap: "14px",
              }}
            >
              <h2 style={{ fontSize: "22px" }}>MVP roadmap</h2>
              <ul
                style={{
                  display: "grid",
                  gap: "12px",
                  color: "var(--muted)",
                  paddingLeft: "18px",
                  lineHeight: 1.6,
                }}
              >
                {roadmap.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
