# Consent Layer

> **"This is what you actually agreed to."**

Consent Layer translates complex privacy policies and terms of service into clear, human-readable consent signals — showing users what they give up, what's unclear, and who benefits more from the agreement.

![Consent Layer Demo](./demo-preview.png)

---

## What It Does

Most people click "I Agree" without reading a word. Platforms design it that way. Consent Layer breaks that pattern by analyzing any privacy policy and surfacing three signals instantly:

- 🔴 **What You Lose** — data collection, third-party sharing, broad permissions
- 🟡 **What's Unclear** — vague language, undefined parties, buried opt-outs
- 🟢 **What's Safe** — explicit user rights, opt-out mechanisms, transparency commitments

Plus a **Benefit Balance Indicator** — a visual score showing who the agreement actually favors.

---

## Demo

The app ships with a fully working demo using a fictional platform called **Vela Social** — no API keys, no setup, works offline.

Click **"Analyze Consent"** and watch the full analysis cascade in real time.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React + Vite |
| Styling | Tailwind CSS (custom config) |
| Animations | Framer Motion |
| AI Layer | Simulated — hardcoded structured demo data |
| Fonts | Space Grotesk (Google Fonts) |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/aakanshajagga14/aegis-ai.git
cd consent-layer

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open `http://localhost:5173` — that's it. No `.env` file, no API keys, no accounts.

---

## Project Structure

```
consent-layer/
├── src/
│   ├── components/
│   │   ├── AnalyzeButton.jsx       # Charged CTA with loading state
│   │   ├── BenefitBar.jsx          # Animated user vs company balance bar
│   │   ├── ConsentPanel.jsx        # Main results panel
│   │   ├── RedFlagBlock.jsx        # Crimson callout for exact policy quotes
│   │   ├── ResultCategory.jsx      # Staggered reveal for each signal category
│   │   └── ScanningOverlay.jsx     # Fake real-time status messages
│   ├── data/
│   │   └── velaDemo.js             # Hardcoded demo policy + analysis result
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
└── package.json
```

---

## How the Demo Flow Works

When you click **Analyze Consent**, a carefully timed sequence plays out:

1. **Scanning phase (1.5s)** — status messages cycle through fake processing steps, CLI-style
2. **Results cascade** — each category reveals line by line, 300ms stagger
3. **Red flag callouts** — exact policy quotes surface with a crimson left border
4. **Balance bar** — animates outward from center, landing on the final score

Total flow: **6–8 seconds**. Designed for live demos and presentations.

---

## The Benefit Balance Bar

The most unique feature. Not a moral judgment — just transparency.

```
You  [███░░░░░░░░░░░░░░░░░░░]  Platform
      28%                72%
```

Calculated from volume of data collected, scope of permissions granted, and degree of user control retained. Animates on reveal.

---

## What's Next

- **Real Claude API integration** — live analysis of any policy URL
- **Chrome Extension** — analyze any site with one click
- **Policy Change Tracking** — historical diffs when ToS updates
- **Accessibility Mode** — simplified language for non-technical users
- **Parental Consent View** — child-safe summaries for younger users

---

## Why This Matters

The average person has agreed to thousands of privacy policies they've never read. Platforms make them long and opaque on purpose — obscurity is a feature, not a bug.

Consent Layer is built on one idea: **transparency should be the default**. Every person who clicks "I Agree" deserves to know what that actually means for their data, their rights, and their digital footprint.

