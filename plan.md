# Joshua Portfolio Redesign Plan

## Scope
Refine Joshua Ceazar Lopez's existing portfolio while preserving its editorial black-and-white identity, oversized typography, asymmetrical composition, established personal details, and current content structure. The redesign improves hierarchy, responsive behavior, accessibility, clearer project narratives, and restrained interaction polish without introducing unrelated sections or changing the core concept.

## Design direction
- **Design movement:** Editorial brutalism with a quiet Swiss-influenced grid underneath; typography and spacing do the visual work instead of decorative UI.
- **Core principles:** (1) expressive type with disciplined alignment, (2) high-contrast monochrome with one ownable signal color, (3) information shown as deliberate editorial fragments, (4) motion that confirms structure rather than distracting from it.
- **Color philosophy:** Warm paper (`#f5f4ef`) and ink (`#121212`) preserve the original print-like contrast. A highlighter yellow (`#e8ff52`) is the signature brand color: it echoes the original yellow navigation accents and makes active states feel hand-marked without turning the portfolio into a colorful theme.
- **Layout paradigm:** A left editorial rail anchors the page on desktop while content breaks into asymmetric, wide/compact bands. On small screens the rail becomes a sticky top bar and the asymmetry collapses into a readable single column.
- **Signature elements:** numbered section labels, yellow highlighter tabs, and a recurring oversized period mark in headings.
- **Interaction philosophy:** Navigation behaves like a printed index with an active marker. Links expose their intent with arrow cues and underlines. Projects use a subtle lift/thumbnail zoom, never a large modal or carousel dependency.
- **Animation:** Entry reveal is a short opacity/translate transition; hover transitions stay under 220ms; reduced-motion users receive no transform-based movement.
- **Typography system:** `Space Grotesk` for labels/body and `Playfair Display` italic for display statements. Large display type uses tight tracking and a strong clamp range; metadata is uppercase, compact, and widely tracked.
- **Brand essence:** A thoughtful junior web developer building useful, responsive digital tools from Davao del Norte. Personality: observant, capable, direct.
- **Brand voice:** Quietly confident and specific. Example lines: “I build responsive websites that have purpose.” and “Selected work, with the problem left in view.”
- **Wordmark & logo:** A lowercase `joshua.` wordmark paired with a yellow circular period; the dot is the compact brand mark and repeats in section headings.
- **Signature brand color:** Highlighter yellow `#e8ff52`.

## Implementation
- Use the initialized React/Vite web starter with a static frontend; no server or database is needed.
- Replace the starter home route with a semantic one-page portfolio containing `header`, `main`, `section`, and `footer` landmarks.
- Keep existing content: About, education, experience, projects, certificates, contact, GitHub, LinkedIn, resume, email, and current project/certificate asset references.
- Store copied reference assets under `client/public/assets/` so the preview does not depend on the old deployment.
- Add mobile navigation, active-section tracking via IntersectionObserver, accessible focus states, reduced-motion handling, and a certificate list that is easy to scan.
- Maintain `/manus-routes.json` with the single `/` page route.

## Project structure
- `client/src/App.tsx`: route shell and portfolio page composition.
- `client/src/index.css`: design tokens, typography, responsive layout, motion, and accessibility styles.
- `client/public/assets/`: locally served headshot, project thumbnails, certificates, and resume.
- `client/public/manus-routes.json`: preview/published route manifest.
- `app.config.ts`: project logo metadata.


## Motion and project preview enhancement
The portfolio now adds a full-screen splash sequence with a measured loading line, a staged exit transition, and reduced-motion fallback. Content sections use viewport-triggered reveals; the hero adds a restrained scan/breathe effect; project cards have hover intent and a clear preview affordance. Clicking a project opens an accessible modal case-study carousel with keyboard navigation, close-on-Escape, focus-visible controls, slide indicators, the existing project artwork, and structured case-study frames based only on the confirmed project details available from the current portfolio. This avoids fabricating unverified product screenshots while giving hiring managers a more memorable preview interaction.


## Scroll animation refinement
The scroll system now uses a reading-progress bar, blur-to-sharp directional reveals, staggered item entrances, section-label line draws, certificate underline choreography, and responsive reduced-motion fallbacks. IntersectionObserver remains the trigger so the animations stay performant and only play as content enters the reader's focus.
