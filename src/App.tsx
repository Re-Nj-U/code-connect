import './App.css'
import { ListCard } from './Component/List Card'
import { Card } from './Component/card'

/* ── Icon SVGs — exact exports from Figma (fill="currentColor" → --color-list-icon) ── */

// Figma node I46:69;36:138  — "Map" glyph, Font Awesome 6 Pro
const MapIcon = () => (
  <svg width="20" height="16" viewBox="0 0 23 18" fill="currentColor"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M22.5499 0.239468C22.8293 0.399113 22.9889 0.718404 22.9889 0.997783V14.408C22.9889 14.8071 22.7095 15.1663 22.3503 15.3259L15.6452 17.8803C15.4457 17.9601 15.2062 17.9601 15.0067 17.8803L7.66297 15.4457L1.27716 17.8803C0.997783 18 0.638581 17.9601 0.399113 17.7605C0.119734 17.6009 0 17.2816 0 16.9623V3.55211C0 3.15299 0.239468 2.8337 0.59867 2.67406L7.30377 0.119734C7.50333 0.0399113 7.74279 0.0399113 7.94235 0.119734L15.286 2.55432L21.6718 0.119734C21.9512 0 22.3104 0.0399113 22.5499 0.239468ZM1.91574 4.2306V15.6053L6.7051 13.7694V2.39468L1.91574 4.2306ZM14.3681 15.6452V4.27051L8.62084 2.35477V13.7295L14.3681 15.6452ZM16.2838 15.6053L21.0732 13.7694V2.39468L16.2838 4.2306V15.6053Z" />
  </svg>
)

// Figma node I46:107;36:138 — "check" glyph, Font Awesome 6 Pro
const CheckIcon = () => (
  <svg width="20" height="14" viewBox="0 0 18 13" fill="currentColor"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M17.6424 0.357616C18 0.754967 18 1.35099 17.6424 1.70861L7.15232 12.1987C6.75497 12.596 6.15894 12.596 5.80132 12.1987L0.397351 6.7947C0 6.43709 0 5.84106 0.397351 5.48344C0.754967 5.08609 1.35099 5.08609 1.70861 5.48344L6.43709 10.2119L16.2914 0.357616C16.649 0 17.245 0 17.6026 0.357616H17.6424Z" />
  </svg>
)

function App() {
  return (
    /* Figma: "Test app" FRAME (46:68)
       VERTICAL, gap=32px, padding=32px 16px, bg=--color-btn-secondary */
    <div className="test-app">

      {/* ── List container (46:125) ───────────────────────────
          VERTICAL, gap=16px (VariableID:1:7), FILL/HUG        */}
      <div className="test-app__list-container">

        {/* Instance 46:69 — Text="Map", Dissabled=Default */}
        <ListCard text="Map" iconNode={<MapIcon />} />

        {/* Instance 46:107 — Text="Checking", Dissabled=Default */}
        <ListCard text="Checking" iconNode={<CheckIcon />} />

        {/* Instance 46:116 — Text="My Family", Dissabled=Default */}
        <ListCard text="My Family" />

      </div>

      {/* ── Card 46:70 ────────────────────────────────────────
          Asset Type=Icon, Variant=Stroke, Direction=Horizontal
          heading="My test card", body="Hellooo"
          Button: Type=Primary, Icon=No, text="Press here"      */}
      <Card
        heading="My test card"
        body="Hellooo"
        showButton={true}
        buttonText="Press here"
        buttonVariant="primary"
        buttonIcon={false}
        assetType="icon"
        variant="stroke"
        direction="horizontal"
      />

      {/* ── Card 46:71 ────────────────────────────────────────
          Asset Type=Icon, Variant=Stroke, Direction=Horizontal
          heading="Disable", body="Hello 2nd"
          Button#113:15=false (hidden)                           */}
      <Card
        heading="Disable"
        body="Hello 2nd"
        showButton={false}
        assetType="icon"
        variant="stroke"
        direction="horizontal"
      />

      {/* ── Card 46:72 ────────────────────────────────────────
          Asset Type=Image, Variant=Stroke, Direction=Horizontal
          heading="Title", body="daandjbajhdbjasbd"
          Button: Type=Secondary, Icon=Yes, text="dhashdha"      */}
      <Card
        heading="Title"
        body="daandjbajhdbjasbd"
        showButton={true}
        buttonText="dhashdha"
        buttonVariant="secondary"
        buttonIcon={true}
        assetType="image"
        variant="stroke"
        direction="vertical"
      />

    </div>
  )
}

export default App
