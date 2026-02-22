# Implementation Plan - Consent Layer Prototype

## 1. Design & Aesthetic
- **Visual Style**: "Editorial meets security tool." Deep dark base, monochromatic UI with category-specific accents.
- **Palette**:
  - Background: `#0D0D0D`
  - Lose (Red): `#C0392B`
  - Unclear (Amber): `#D4860A`
  - Safe (Green): `#27AE60`
- **Typography**:
  - Headings/UI: **Space Grotesk** (Google Fonts)
  - Quotes/Code: **SF Mono** or **JetBrains Mono**
- **Interactions**:
  - No gradients or glassmorphism.
  - Staggered upward reveals for all list items.
  - Custom balance bar animating from center.

## 2. Component Architecture
### Main Layout (`App.tsx`)
- A background "Demo Page" (simulating `vela.social`)
- An overlay "Extension UI" (floating panel)

### Extension UI Components
- **Header**: Logo and current URL status.
- **InputSection**: URL input field (pre-filled) + "Analyze Consent" button.
- **ScanningOverlay**: Minimalist CLI-style status messages.
- **ResultsContainer**: 
    - Category blocks (Lose, Unclear, Safe)
    - Red Flag Callouts (Editorial quotes)
    - **BenefitBar**: Custom CSS/Framer Motion component.

## 3. Data & Animation Flow
### Phase 0: Idle
- Panel shows current URL (`vela.social/privacy`).
- Analyze button is interactive.

### Phase 1: Scanning (1.5s)
- Sequential status messages: "Fetching policy..." -> "Extracting..." -> "Scoring...".
- Minimal CLI pulse animation.

### Phase 2: Results Revelation (Staggered)
- `you_lose` items (300ms apart)
- `unclear` items (300ms apart)
- `safe` items (300ms apart)
- `red_flags` (Slide from left)
- `benefit_score` bar (Animates outward from center)

## 4. Technical Stack
- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React (minimal)

## 5. Development Steps
1. Initialize Vite project with Tailwind and Framer Motion.
2. Setup CSS variables for the color palette and typography.
3. Build the "Demo Page" background (simple, dark, "Vela" platform).
4. Build the "Extension UI" floating panel.
5. Implement the state machine for the scanning/results flow.
6. Refine animations to ensure the 6-8s total timing.
