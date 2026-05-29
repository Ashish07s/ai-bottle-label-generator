// netlify/functions/generate.js
// Serverless function — runs on Netlify's servers, keeps API key secret

const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*'

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

exports.handler = async (event) => {
  // Handle preflight CORS
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  if (!process.env.GEMINI_API_KEY) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'API key not configured. Add GEMINI_API_KEY to Netlify environment variables.' }),
    }
  }

  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    }
  }

  const { brandName, eventName, themeColors, tagline, instructions, style } = body

  if (!brandName) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'brandName is required' }),
    }
  }

  const prompt = `You are a world-class premium bottle label design director with 20+ years experience creating luxury packaging for hotels, weddings, and premium brands.

Generate exactly 5 DISTINCT bottle label design concepts for this client:

Brand: "${brandName}"
Event/Product: "${eventName || 'Premium Collection'}"
Design Style: ${style || 'Luxury'}
Theme Colors: ${themeColors || 'Gold, Black, White'}
Tagline: ${tagline || 'none specified'}
Special Notes: ${instructions || 'none'}

Requirements for each concept:
- Each concept must be DISTINCTLY different from the others
- Names should be evocative and premium-sounding
- Descriptions should paint a vivid visual picture
- Image prompts must describe a PHOTOREALISTIC 3D luxury glass bottle with the label wrapped around it, studio lighting, white background, product photography

Return ONLY a valid JSON object with a single key "designs" containing an array of exactly 5 objects.
Each object must have these exact keys:
{
  "designs": [
    {
      "name": "4-6 word evocative design name",
      "description": "One sentence describing the visual style, mood, and key elements (max 25 words)",
      "prompt": "Detailed 60-80 word image prompt: photorealistic 3D luxury glass bottle with premium label wrapped around it, describing label colors, typography, decorative elements, studio lighting, white background, professional product photography, 8k quality",
      "palette": ["#hex1", "#hex2", "#hex3"],
      "motif": "one word describing the key decorative element (e.g. florals, geometric, minimal, ornate, botanical)"
    }
  ]
}`

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        maxOutputTokens: 1500,
      },
    })

    const result = await model.generateContent(prompt)
    const rawText = result.response.text()

    // Strip any accidental markdown fences just in case
    const clean = rawText.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    // Unwrap array from object
    const designs = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed.designs)
      ? parsed.designs
      : Object.values(parsed).find(v => Array.isArray(v))

    if (!designs || designs.length === 0) {
      throw new Error('Invalid designs format from AI')
    }

    // Add Pollinations 3D bottle image URL to each design
    const designsWithImages = designs.slice(0, 5).map((design, index) => {
      const imagePrompt = encodeURIComponent(
        `Photorealistic 3D luxury glass bottle product mockup, premium label wrapped around bottle, ${design.prompt}, studio lighting, pure white background, professional product photography, 8k ultra detailed`
      )
      return {
        ...design,
        imageUrl: `https://image.pollinations.ai/prompt/${imagePrompt}?width=400&height=600&nologo=true&seed=${index + 1}`,
      }
    })

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, designs: designsWithImages }),
    }
  } catch (err) {
    console.error('Generation error:', err)
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: err.message || 'Generation failed' }),
    }
  }
}