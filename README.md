# 🍾 AI Bottle Label Generator

A premium AI-powered bottle label design tool for hotels, weddings, and luxury brands.
Built with React + Tailwind CSS + Netlify Functions + Anthropic Claude API.

---

## 📁 Project Structure

```
ai-bottle-label-generator/
├── netlify/
│   └── functions/
│       ├── generate.js       ← Serverless API (keeps your key secret)
│       └── package.json
├── src/
│   ├── components/
│   │   ├── BottleSVG.jsx     ← SVG bottle renderer
│   │   └── LabelCard.jsx     ← Design result card
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx               ← Main UI
│   └── main.jsx
├── index.html
├── .env.example              ← Copy to .env
├── netlify.toml              ← Netlify config
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🚀 STEP-BY-STEP SETUP GUIDE

### STEP 1 — Get Your Anthropic API Key

1. Go to **https://console.anthropic.com**
2. Sign up or log in
3. Click **"API Keys"** in the left sidebar
4. Click **"Create Key"**
5. Name it: `bottle-label-generator`
6. **Copy the key** — it starts with `sk-ant-api03-...`
7. Save it somewhere safe (you only see it once!)

---

### STEP 2 — Install Node.js (if not installed)

1. Go to **https://nodejs.org**
2. Download the **LTS version** (e.g. v20)
3. Install it (click Next → Next → Finish)
4. Verify: open Terminal and type:
   ```
   node --version
   npm --version
   ```
   Both should show version numbers ✓

---

### STEP 3 — Set Up the Project Locally

1. Extract the project folder (e.g. to your Desktop)
2. Open **Terminal** (Mac) or **Command Prompt** (Windows)
3. Navigate to the project:
   ```bash
   cd Desktop/ai-bottle-label-generator
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```
6. Open `.env` and paste your API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-YOUR_ACTUAL_KEY_HERE
   ```

---

### STEP 4 — Test Locally

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Start the local dev server:
   ```bash
   netlify dev
   ```
3. Open your browser to **http://localhost:8888**
4. Test the generator — enter a brand name and click Generate ✓

---

### STEP 5 — Deploy to Netlify

#### Option A — Deploy via Netlify Dashboard (Easiest)

1. Create a free account at **https://netlify.com**
2. Click **"Add new site"** → **"Deploy manually"**
3. Run the build first:
   ```bash
   npm run build
   ```
4. Drag the **`dist/`** folder into Netlify's deploy area
5. Your site goes live with a URL like `https://random-name.netlify.app`

> ⚠️ Manual deploy doesn't include serverless functions. Use Option B for full functionality.

#### Option B — Deploy via GitHub (Recommended for full functionality)

1. Create a free account at **https://github.com**
2. Create a new repository named `ai-bottle-label-generator`
3. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ai-bottle-label-generator.git
   git push -u origin main
   ```
4. Go to **https://netlify.com** → **"Add new site"** → **"Import an existing project"**
5. Connect your GitHub account
6. Select your repository
7. Build settings are auto-detected from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
8. Click **"Deploy site"**

---

### STEP 6 — Add Your API Key to Netlify (CRITICAL)

This is the most important step — without this the AI won't work.

1. In Netlify dashboard, go to your site
2. Click **"Site configuration"** → **"Environment variables"**
3. Click **"Add a variable"**
4. Key: `ANTHROPIC_API_KEY`
5. Value: paste your key: `sk-ant-api03-...`
6. Click **"Save"**
7. Go to **"Deploys"** tab → click **"Trigger deploy"** → **"Deploy site"**
8. Wait 2-3 minutes for deployment to complete ✓

---

### STEP 7 — Set Your Live Domain (Optional)

1. In Netlify → **"Domain management"**
2. Click **"Add custom domain"**
3. Enter your domain (e.g. `labels.yourbusiness.com`)
4. Follow DNS instructions from Netlify
5. SSL certificate is added automatically (free) ✓

---

## ✅ Testing Your Live Site

1. Visit your Netlify URL
2. Enter: Brand Name = "Test Brand"
3. Click "Generate 5 Label Designs"
4. You should see 5 unique bottle mockups appear ✓

---

## 🛠️ Customization

### Change Site Name / Logo
Edit `index.html` — update the `<title>` tag and favicon.

### Add Your Own Colors to the Form
Edit `src/App.jsx` — modify the `themeColors` input placeholder.

### Change the AI Prompt
Edit `netlify/functions/generate.js` — modify the `prompt` variable.

### Add More Design Styles
Edit `src/App.jsx` — add to the `STYLES` array.
Edit `src/components/BottleSVG.jsx` — add palettes to `STYLE_PALETTES`.

---

## 💰 API Cost Estimate

- Each "Generate" click = 1 API call
- ~1,500 tokens input + output per call
- Cost: approximately **$0.002–0.005 per generation** (fraction of a cent)
- 100 generations/month ≈ **$0.20–0.50/month**
- Very affordable for client use

---

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| "API key not configured" | Add `ANTHROPIC_API_KEY` to Netlify env vars and redeploy |
| "Generation failed" | Check your API key is valid at console.anthropic.com |
| Blank page on deploy | Check build logs in Netlify → Deploys tab |
| Functions not working | Ensure `netlify.toml` is in root folder |
| CORS error locally | Use `netlify dev` instead of `npm run dev` |

---

## 📞 Support

If you need help, check:
- Netlify docs: https://docs.netlify.com
- Anthropic docs: https://docs.anthropic.com
- Vite docs: https://vitejs.dev

---

**Built with ❤️ for premium brands**
