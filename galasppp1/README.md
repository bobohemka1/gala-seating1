# ThePrime Gala 2026 - Seating Lookup App

A simple, elegant web app for guests and hostesses to find table assignments by ticket number.

## Features

- 🎫 Enter ticket number (1-480) to find table assignment
- 📱 Mobile-first design - works great on phones
- 🌙 Dark, elegant theme matching Gala aesthetics
- ⚡ Fast, instant lookup
- 📊 Shows table number, type, and company names

## Quick Start

### Local Development

```bash
npm install
npm start
```

App will run at `http://localhost:3000`

### Deploy to Railway

1. Push this folder to a GitHub repo
2. Connect the repo to Railway
3. Railway will auto-detect Node.js and deploy
4. Set no special environment variables needed (PORT is auto-set)

Or use Railway CLI:
```bash
railway login
railway init
railway up
```

## Adding Ticket Numbers

The seating data is in `data/seating.json`. Each table has a `tickets` array that you need to populate.

### Format

```json
"1": { 
  "type": "Corporate", 
  "companies": ["Julius Meinl Living"], 
  "tickets": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 
}
```

### Adding Tickets

1. Open `data/seating.json`
2. Find the table number
3. Add ticket numbers to the `tickets` array
4. Save and redeploy

### Example: If Table 1 has tickets 1-10

```json
"1": { 
  "type": "Corporate", 
  "companies": ["Julius Meinl Living"], 
  "tickets": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 
}
```

### Example: If Table 7 has tickets 61-70

```json
"7": { 
  "type": "Corporate", 
  "companies": ["CBRE"], 
  "tickets": [61, 62, 63, 64, 65, 66, 67, 68, 69, 70] 
}
```

## Bulk Update Helper

If you have ticket assignments in a spreadsheet, you can use the helper script:

```bash
node scripts/update-tickets.js
```

See `scripts/update-tickets.js` for the format.

## File Structure

```
├── server.js           # Express server
├── package.json        # Dependencies
├── data/
│   └── seating.json    # Table and ticket data (EDIT THIS)
├── public/
│   └── index.html      # The web app UI
└── scripts/
    └── update-tickets.js  # Helper for bulk updates
```

## Tables Overview (from PDF)

- Tables 1-28: Corporate (single company)
- Tables 29-43: Mixed (multiple companies)
- Total: 43 tables, up to 480 tickets

## Customization

### Change Event Details

Edit `data/seating.json`:
```json
{
  "event": "ThePrime Gala 2026",
  "venue": "Your Venue Here",
  "date": "January 28, 2026",
  ...
}
```

### Change Colors

Edit CSS variables in `public/index.html`:
```css
:root {
  --gold: #c9a962;
  --bg-primary: #0a0a0a;
  ...
}
```

## Support

Contact Robert McLean - robert@rmctalks.com
