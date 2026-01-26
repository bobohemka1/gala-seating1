/**
 * Helper script to bulk update ticket assignments
 * 
 * Usage: node scripts/update-tickets.js
 * 
 * Edit the TICKET_ASSIGNMENTS below with your data, then run this script.
 * It will update data/seating.json automatically.
 */

const fs = require('fs');
const path = require('path');

// ============================================
// EDIT THIS SECTION WITH YOUR TICKET DATA
// ============================================

// Format: table number -> array of ticket numbers
// Example: Table 1 gets tickets 1-10, Table 2 gets tickets 11-20, etc.

const TICKET_ASSIGNMENTS = {
  // Corporate tables (1-28, typically 10 seats each)
  1: [],   // Julius Meinl Living - add tickets like [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  2: [],   // Helaba
  3: [],   // Corwin
  4: [],   // Dual Asset
  5: [],   // Capexus
  6: [],   // ASB Czech Republic
  7: [],   // CBRE
  8: [],   // Cushman & Wakefield
  9: [],   // CTP
  10: [],  // Savills
  11: [],  // Colliers
  12: [],  // 108 Real Estate
  13: [],  // iO Partners
  14: [],  // Panattoni
  15: [],  // Mint Investments
  16: [],  // Knight Frank
  17: [],  // ARETE
  18: [],  // Sentient
  19: [],  // GLP/Marq
  20: [],  // ZDR Investments
  21: [],  // Westpoint
  22: [],  // Wilsons
  23: [],  // REassurance
  24: [],  // White & Case
  25: [],  // TPA Group
  26: [],  // Charnwood
  27: [],  // Quadra Underwriting
  28: [],  // AFI Czech Republic
  
  // Mixed tables (29-43)
  29: [],  // Daramis, Tempus, Roman Pecenka
  30: [],  // Rowan Legal
  31: [],  // Crestyl, Aareal, E Factory
  32: [],  // CMS consortium
  33: [],  // VŠE / ISTI
  34: [],  // Avison Young
  35: [],  // Logicor consortium
  36: [],  // Wolf Theiss consortium
  37: [],  // Clifford Chance, Skanska, Penta
  38: [],  // Giese & Partner, Unicredit, SB Gruppe
  39: [],  // Kinstellar consortium
  40: [],  // Havel & Partners consortium
  41: [],  // McLean table
  42: [],  // REALS, Prusak Group, Atica Rea
  43: [],  // Strabag consortium
};

// ============================================
// HELPER FUNCTION: Generate sequential tickets
// ============================================

// Use this to easily fill in sequential ticket ranges
// Example: range(1, 10) returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

// Example usage (uncomment and modify as needed):
// TICKET_ASSIGNMENTS[1] = range(1, 10);    // Table 1 gets tickets 1-10
// TICKET_ASSIGNMENTS[2] = range(11, 20);   // Table 2 gets tickets 11-20
// TICKET_ASSIGNMENTS[3] = range(21, 30);   // etc.

// ============================================
// DON'T EDIT BELOW THIS LINE
// ============================================

function updateSeatingData() {
  const seatingPath = path.join(__dirname, '..', 'data', 'seating.json');
  
  // Load current seating data
  const seatingData = JSON.parse(fs.readFileSync(seatingPath, 'utf8'));
  
  // Update ticket assignments
  let updatedCount = 0;
  let totalTickets = 0;
  
  for (const [tableNum, tickets] of Object.entries(TICKET_ASSIGNMENTS)) {
    if (seatingData.tables[tableNum]) {
      seatingData.tables[tableNum].tickets = tickets;
      if (tickets.length > 0) {
        updatedCount++;
        totalTickets += tickets.length;
      }
    } else {
      console.warn(`Warning: Table ${tableNum} not found in seating data`);
    }
  }
  
  // Save updated data
  fs.writeFileSync(seatingPath, JSON.stringify(seatingData, null, 2));
  
  console.log('✓ Seating data updated successfully');
  console.log(`  - Tables with tickets: ${updatedCount}`);
  console.log(`  - Total tickets assigned: ${totalTickets}`);
  
  // Validate - check for duplicates and gaps
  const allTickets = [];
  for (const tickets of Object.values(TICKET_ASSIGNMENTS)) {
    allTickets.push(...tickets);
  }
  
  const duplicates = allTickets.filter((item, index) => allTickets.indexOf(item) !== index);
  if (duplicates.length > 0) {
    console.warn(`\n⚠️  Warning: Duplicate tickets found: ${[...new Set(duplicates)].join(', ')}`);
  }
  
  const sorted = [...new Set(allTickets)].sort((a, b) => a - b);
  if (sorted.length > 0) {
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const missing = [];
    for (let i = min; i <= max; i++) {
      if (!sorted.includes(i)) {
        missing.push(i);
      }
    }
    if (missing.length > 0 && missing.length < 20) {
      console.warn(`\n⚠️  Warning: Gap in ticket sequence: ${missing.join(', ')}`);
    } else if (missing.length >= 20) {
      console.warn(`\n⚠️  Warning: ${missing.length} gaps in ticket sequence`);
    }
  }
}

// Run the update
updateSeatingData();
