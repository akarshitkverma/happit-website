# Happit Website — Complete Static Site

## 📁 Folder Structure

```
happit/
├── index.html              ← Homepage (with mini catch-the-toy game!)
├── css/
│   ├── styles.css          ← Global design tokens, typography, utilities
│   ├── nav.css             ← Navigation styles
│   └── footer.css          ← Footer styles
├── js/
│   ├── components.js       ← Shared nav + footer HTML, injected on every page
│   ├── main.js             ← Homepage interactions (carousel, newsletter, etc.)
│   └── game.js             ← Hero mini-game logic
└── pages/
    ├── categories.html     ← All toy categories with filterable product grids
    ├── about.html          ← Our story, values, team
    ├── safety.html         ← Safety standards, certifications, process
    ├── reviews.html        ← Customer reviews with rating breakdown
    ├── faq.html            ← Accordion FAQ with category filters
    ├── contact.html        ← Contact form + bulk order info
    ├── privacy.html        ← Privacy Policy
    └── terms.html          ← Terms of Service
```

## 🚀 How to Use

### 1. Open Locally
Just double-click `index.html` — no server required. All pages work from the file system.

### 2. Customise Your Amazon Links
In `js/components.js`, line 3:
```js
const AMAZON_URL = 'https://www.amazon.in/s?k=happit';
```
Replace with your actual Amazon store URL or individual product ASINs.

Also update the Amazon links in `pages/categories.html` for each product card.

### 3. Update Product Details
- **Product names, descriptions, images**: Edit `pages/categories.html`
- **Homepage products**: Edit the product cards in `index.html`
- **Reviews**: Edit review text in `pages/reviews.html`

### 4. Add Real Photos
Replace the emoji product images by adding `<img>` tags inside `.prod-img` divs.
Example:
```html
<div class="prod-img" style="background:#EDE7F9">
  <img src="../images/rainbow-puzzle.jpg" alt="Rainbow Puzzle Set" style="max-height:160px;object-fit:contain"/>
</div>
```

### 5. Update Contact Info
In `pages/contact.html`, update:
- Email addresses
- Social media links (@instagram, facebook, youtube)
- Physical address if needed

### 6. Deploy / Host
Upload the entire `happit/` folder to any static hosting:
- **Netlify**: Drag and drop the folder at netlify.com/drop
- **GitHub Pages**: Push to a GitHub repo and enable Pages
- **Vercel**: `npx vercel` in the folder
- **Any web host**: Upload via FTP

## 🎨 Design Tokens
All colours and styles are in `css/styles.css` under `:root { }`.
Main brand colour: `--coral: #F4735A` (matches Happit logo).

## 🎮 Hero Game
The mini-game is in `js/game.js`. It auto-starts when a user clicks "Let's Play".
- Catch falling toys with the basket
- Combo multipliers for consecutive catches
- Game over screen links directly to Amazon

## 📧 Newsletter
Currently shows a success message on submit. To connect to a real email service:
- **Mailchimp**: Replace the form with Mailchimp's embedded form code
- **ConvertKit**: Use their inline form embed
- **Formspree**: `action="https://formspree.io/f/YOUR_ID"` on the form

---
Made with 💛 for Happit | hello@happit.in
