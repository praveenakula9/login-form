import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lf-root {
    min-height: 100vh;
    background: #f5f0e8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Outfit', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .lf-blob1 {
    position: absolute;
    width: 520px; height: 520px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(220,180,120,0.25) 0%, transparent 70%);
    top: -120px; right: -100px;
    pointer-events: none;
  }
  .lf-blob2 {
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(180,210,200,0.2) 0%, transparent 70%);
    bottom: -80px; left: -80px;
    pointer-events: none;
  }
  .lf-blob3 {
    position: absolute;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(240,160,100,0.15) 0%, transparent 70%);
    top: 40%; left: 10%;
    pointer-events: none;
  }

  .lf-dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(180,150,100,0.15) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }

  .lf-layout {
    position: relative;
    display: flex;
    align-items: stretch;
    width: 780px;
    min-height: 480px;
    border-radius: 24px;
    overflow: hidden;
    box-shadow:
      0 4px 6px rgba(100,80,40,0.04),
      0 24px 60px rgba(100,80,40,0.12),
      0 0 0 1px rgba(180,150,100,0.15);
    animation: riseIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes riseIn {
    from { opacity: 0; transform: translateY(32px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Left decorative panel */
  .lf-panel {
    width: 280px; flex-shrink: 0;
    background: linear-gradient(160deg, #c8a97e 0%, #a07850 50%, #8a6540 100%);
    padding: 48px 36px;
    display: flex; flex-direction: column; justify-content: space-between;
    position: relative; overflow: hidden;
  }
  .lf-panel::before {
    content: ''; position: absolute;
    top: -40px; right: -40px;
    width: 200px; height: 200px; border-radius: 50%;
    background: rgba(255,255,255,0.08);
  }
  .lf-panel::after {
    content: ''; position: absolute;
    bottom: -60px; left: -30px;
    width: 240px; height: 240px; border-radius: 50%;
    background: rgba(0,0,0,0.08);
  }

  .lf-panel-logo { position: relative; z-index: 1; }

  .lf-panel-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; margin-bottom: 20px;
  }

  .lf-panel-title {
    font-family: 'Playfair Display', serif;
    font-size: 28px; color: #fff; line-height: 1.2; margin-bottom: 10px;
  }
  .lf-panel-title em { font-style: italic; opacity: 0.85; }

  .lf-panel-desc {
    font-size: 12.5px; color: rgba(255,255,255,0.65);
    line-height: 1.6; font-weight: 300;
  }

  .lf-panel-footer { position: relative; z-index: 1; }

  .lf-panel-dots { display: flex; gap: 6px; margin-bottom: 16px; }
  .lf-panel-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.3); }
  .lf-panel-dot.active { background: #fff; width: 18px; border-radius: 3px; }

  .lf-panel-note { font-size: 10.5px; color: rgba(255,255,255,0.5); letter-spacing: 0.04em; }

  /* Right form area */
  .lf-card {
    flex: 1; background: #fffdf9;
    padding: 52px 44px 44px;
    display: flex; flex-direction: column; justify-content: center;
  }

  .lf-eyebrow {
    font-size: 10.5px; font-weight: 500;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #c8a97e; margin-bottom: 10px;
  }

  .lf-title {
    font-family: 'Playfair Display', serif;
    font-size: 30px; color: #2c1f0e; line-height: 1.15; margin-bottom: 6px;
  }
  .lf-title em { font-style: italic; color: #a07850; }

  .lf-sub {
    font-size: 13px; color: #b0967a;
    font-weight: 300; margin-bottom: 36px;
  }

  .lf-field {
    margin-bottom: 18px;
    animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .lf-field:nth-child(1) { animation-delay: 0.15s; }
  .lf-field:nth-child(2) { animation-delay: 0.23s; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .lf-label {
    display: block; font-size: 11px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: #8a7060; margin-bottom: 7px;
  }

  .lf-input {
    width: 100%;
    background: #f7f2ea;
    border: 1.5px solid #e8ddd0;
    border-radius: 10px;
    padding: 12px 16px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px; color: #2c1f0e;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .lf-input::placeholder { color: #c8b8a2; }
  .lf-input:focus {
    border-color: #c8a97e; background: #fff;
    box-shadow: 0 0 0 3px rgba(200,169,126,0.12);
  }
  .lf-input.error { border-color: #e07060; background: #fff8f7; }
  .lf-input.error:focus { box-shadow: 0 0 0 3px rgba(224,112,96,0.1); }

  .lf-error {
    font-size: 11px; color: #d05540;
    margin-top: 5px; display: flex; align-items: center; gap: 4px;
  }

  .lf-divider {
    display: flex; align-items: center; gap: 12px; margin: 24px 0;
  }
  .lf-divider-line { flex: 1; height: 1px; background: #ede5d8; }
  .lf-divider-text {
    font-size: 10.5px; color: #c8b8a2;
    letter-spacing: 0.08em; white-space: nowrap;
  }

  .lf-btn {
    width: 100%;
    background: linear-gradient(135deg, #c8a97e 0%, #a07850 100%);
    border: none; border-radius: 10px; padding: 14px 24px;
    font-family: 'Outfit', sans-serif;
    font-size: 13px; font-weight: 500; letter-spacing: 0.08em;
    color: #fff; cursor: pointer; position: relative; overflow: hidden;
    transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
    animation: fadeUp 0.5s 0.32s cubic-bezier(0.16, 1, 0.3, 1) both;
    box-shadow: 0 4px 16px rgba(160,120,80,0.3);
  }
  .lf-btn::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0; transition: opacity 0.2s;
  }
  .lf-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(160,120,80,0.35); }
  .lf-btn:hover::after { opacity: 1; }
  .lf-btn:active { transform: translateY(0); }
  .lf-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

  .lf-btn-inner { display: flex; align-items: center; justify-content: center; gap: 8px; }

  .lf-spinner {
    width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff; border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Success */
  .lf-success { text-align: center; padding: 12px 0; animation: riseIn 0.5s ease both; }

  .lf-success-ring {
    width: 64px; height: 64px; border-radius: 50%;
    background: linear-gradient(135deg, #c8a97e, #a07850);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px; font-size: 26px;
    box-shadow: 0 8px 24px rgba(160,120,80,0.3);
  }

  .lf-success-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px; color: #2c1f0e; margin-bottom: 6px;
  }
  .lf-success-sub { font-size: 13px; color: #b0967a; font-weight: 300; margin-bottom: 24px; }

  .lf-success-card {
    background: #f7f2ea; border: 1.5px solid #e8ddd0;
    border-radius: 12px; padding: 16px 20px; text-align: left;
  }

  .lf-success-row {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 12px; padding: 6px 0; border-bottom: 1px solid #ede5d8;
  }
  .lf-success-row:last-child { border-bottom: none; }

  .lf-success-key {
    color: #b0967a; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase; font-size: 10.5px;
  }
  .lf-success-val { color: #2c1f0e; font-weight: 500; }

  .lf-success-badge {
    background: rgba(200,169,126,0.12); color: #a07850;
    border: 1px solid #e8d0b0; border-radius: 20px;
    padding: 2px 10px; font-size: 10.5px; font-weight: 500;
  }
`;

function validate(username, email) {
  const errors = {};
  if (!username.trim()) errors.username = "Username is required";
  else if (username.trim().length < 3) errors.username = "Minimum 3 characters";
  if (!email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address";
  return errors;
}

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const errs = validate(username, email);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="lf-root">
        <div className="lf-blob1" /><div className="lf-blob2" /><div className="lf-blob3" />
        <div className="lf-dots" />

        <div className="lf-layout">

        {/*
          <div className="lf-panel">
            <div className="lf-panel-logo">
              <div className="lf-panel-icon">🌿</div>
              <div className="lf-panel-title">Welcome<br /><em>back.</em></div>
              <p className="lf-panel-desc">
                Sign in to access your personal dashboard and continue where you left off.
              </p>
            </div>
            <div className="lf-panel-footer">
              <div className="lf-panel-dots">
                <div className="lf-panel-dot active" />
                <div className="lf-panel-dot" />
                <div className="lf-panel-dot" />
              </div>
              <div className="lf-panel-note">Secure · Private · Always available</div>
            </div>
          </div>
        */}
          {/* ── Right form ── */}
          <div className="lf-card">
            {submitted ? (
              <div className="lf-success">
                <div className="lf-success-ring">✓</div>
                <div className="lf-success-title">You're all set!</div>
                <div className="lf-success-sub">Successfully signed in to your account</div>
                <div className="lf-success-card">
                  <div className="lf-success-row">
                    <span className="lf-success-key">Username</span>
                    <span className="lf-success-val">{username}</span>
                  </div>
                  <div className="lf-success-row">
                    <span className="lf-success-key">Email</span>
                    <span className="lf-success-val">{email}</span>
                  </div>
                  <div className="lf-success-row">
                    <span className="lf-success-key">Status</span>
                    <span className="lf-success-badge">✓ Verified</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="lf-eyebrow"></div>
                <h1 className="lf-title">Sign <em>into</em> your<br />account</h1>
                <p className="lf-sub">Fill in your details to get started →</p>

                <div className="lf-field">
                  <label className="lf-label">Username</label>
                  <input
                    className={`lf-input${errors.username ? " error" : ""}`}
                    type="text"
                    placeholder="e.g. praveen"
                    value={username}
                    onChange={e => { setUsername(e.target.value); setErrors(p => ({ ...p, username: "" })); }}
                  />
                  {errors.username && <div className="lf-error">⚠ {errors.username}</div>}
                </div>

                <div className="lf-field">
                  <label className="lf-label">Email Address</label>
                  <input
                    className={`lf-input${errors.email ? " error" : ""}`}
                    type="email"
                    placeholder="e.g. praveen@example.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }}
                  />
                  {errors.email && <div className="lf-error">⚠ {errors.email}</div>}
                </div>

                <div className="lf-divider">
                  <div className="lf-divider-line" />
                  <span className="lf-divider-text"></span>
                  <div className="lf-divider-line" />
                </div>

                <button className="lf-btn" onClick={handleSubmit} disabled={loading}>
                  <div className="lf-btn-inner">
                    {loading && <div className="lf-spinner" />}
                    {loading ? "Signing in..." : "Sign In →"}
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}