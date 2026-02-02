// Define standard Islamic Events (Month Index 0-11, Day 1-30)
// Month 0 = Muharram, 11 = Dhul-Hijjah
export const islamicEvents = [
  { key: 'new_year', month: 0, day: 1 },
  { key: 'ashura', month: 0, day: 10 },
  { key: 'mawlid', month: 2, day: 12 },
  { key: 'isra', month: 6, day: 27 },
  { key: 'shaban', month: 7, day: 15 },
  { key: 'ramadan_start', month: 8, day: 1 },
  { key: 'laylat_qadr', month: 8, day: 27 }, // Common view
  { key: 'eid_fitr', month: 9, day: 1 },
  { key: 'arafah', month: 11, day: 9 },
  { key: 'eid_adha', month: 11, day: 10 },
];

export function getHijriDate(date: Date) {
  // Use browser built-in Intl API for Umm al-Qura calendar
  return new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

// Helper to get raw numeric parts to compare dates
export function getHijriParts(date: Date) {
  const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }).formatToParts(date);

  const d = parts.find(p => p.type === 'day')?.value;
  const m = parts.find(p => p.type === 'month')?.value;
  const y = parts.find(p => p.type === 'year')?.value;

  return {
    day: parseInt(d || '1'),
    month: parseInt(m || '1') - 1, // 0-indexed for comparison
    year: parseInt(y || '1445')
  };
}