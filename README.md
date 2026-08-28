<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/9deab58d-5a09-435f-b152-7efeb94d9236

## Run Locally

**Prerequisites:** Node.js (v18+)

1. Install dependencies:
   `npm install`
2. Run the development server:
   `npm run dev`

## Deploy to GitHub Pages

This app is pre-configured for GitHub Pages deployment:

1. Build static site files:
   `npm run build:gh-pages`
2. Push the contents of the generated `dist/` directory to your `gh-pages` branch or configure GitHub Actions to deploy `dist/`.
   - `.nojekyll` and `404.html` SPA routing fallbacks are included in the `/public` folder automatically.
