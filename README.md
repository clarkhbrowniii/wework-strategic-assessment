# WeWork | Strategic Assessment

A buildless, offline-capable executive presentation for USF ISM 6930, October 2026. Six scenes: opening artwork, four pairs of analytical frameworks, and the strategic verdict with the 2019 reset recommendation.

## Run locally

Open `index.html` directly in a modern browser. No install, build, server, account, or CDN is required. Keep `assets`, `css`, and `js` beside the HTML file. All paths are relative, including on a GitHub Pages repository subpath.

## Controls

| Input | Action |
| --- | --- |
| Right Arrow / Space | Next scene |
| Left Arrow | Previous scene |
| Click presentation content | Next scene |
| Mouse wheel | Next / previous scene |
| F | Toggle fullscreen |
| Escape | Exit fullscreen |

Navigation inputs are locked during transitions. Wheel gestures require a quiet interval before another scene can advance. The opening transition can be reversed. Reduced-motion preferences produce immediate changes.

The presentation has no visible control bar or timer. Use keyboard, click, or wheel navigation. Reload to return to the opening.

## Presenter timing

| Segment | Duration | Cumulative |
| --- | --- | --- |
| Opening | 0:30 | 0:30 |
| Frameworks 1–2 | 0:35 | 1:05 |
| Frameworks 3–4 | 0:35 | 1:40 |
| Frameworks 5–6 | 0:35 | 2:15 |
| Frameworks 7–8 | 0:35 | 2:50 |
| Closing | 1:40 | 4:30 |
| Buffer | 0:30 | 5:00 |

For live delivery, open the local file, press F, and rehearse at the projector resolution. Fullscreen requires browser support and a user gesture. A browser's own fullscreen command can be used if the Fullscreen API is unavailable.

## Offline test

Download or copy the entire repository locally. Disconnect Wi-Fi/network, open the local `index.html`, and navigate through all scenes and back. Check images, timer, and fullscreen. The application makes no network requests to external services. A hosted page is not guaranteed to reload offline from browser cache: use the local copy for reliable offline presentation.

## Deploy to GitHub Pages

1. Commit these files to a GitHub repository, retaining the root `index.html` and folder structure.
2. In repository **Settings → Pages**, select **Deploy from a branch**.
3. Select your branch (usually `main`) and **/(root)**, then save.
4. Open the URL GitHub provides after deployment completes.

No Node build process or custom workflow is needed. This project is prepared for GitHub Pages; publishing requires your repository configuration.

## File structure

```text
index.html                 Presentation shell and closing content
css/styles.css             Layout, typography, controls
css/animations.css         Hero and horizontal transitions
js/content.js              Eight frameworks and supplied evidence
js/navigation.js           Finite-state navigation and input locks
js/app.js                  Rendering, event bindings, fullscreen, timer
assets/hero.jpg             Supplied official hero artwork
assets/wordmark.png         Supplied official wordmark
assets/logo.png             Supplied official logo
assets/*.pptx               Supplied reference presentation
```

Content follows the supplied build specification and executive briefing. The maturity score is the team's assessment, and its provisional cloud-infrastructure qualification remains visible. Source labels identify the supplied evidence references; they are not new independent fact verification.
