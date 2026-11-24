// ===== CHANGE THESE =====
export const CONFIG = {
  // Supabase > Project Settings > API. Use the anon/publishable key ONLY (never service_role).
  SUPABASE_URL: 'https://YOUR-PROJECT.supabase.co',
  SUPABASE_ANON_KEY: 'YOUR-ANON-OR-PUBLISHABLE-KEY',

  HER_NAME: '[HER_NAME]',
  MY_NAME: '[MY_NAME]',
  NICKNAMES: ['my love'],            // first one shows above her name
  BIRTHDAY: '2005-01-01',            // YYYY-MM-DD (e.g. 14-02-2005 becomes 2005-02-14)
  TOGETHER_SINCE: '2024-01-01',      // YYYY-MM-DD

  TAGLINE: ['you are my favourite hello', 'every day with you is a gift', 'home is wherever you are'],
  NOTES: [
    'You make ordinary days feel like celebrations.',
    'I still smile when your name shows up on my screen.',
    'Thank you for being you. I love you more each day.',
    'My favourite place is next to you.',
    'Whatever tomorrow brings, I want it with you.'
  ],
  CATEGORIES: ['Dates', 'Trips', 'Selfies', 'Festivals', 'Random'],
  // Photos already in the gallery. Put the files in assets/images/sample/
  SAMPLES: [
    { file: '1.jpg', caption: 'Our first date', date: '2024-01-14', category: 'Dates' },
    { file: '2.jpg', caption: 'Golden hour with you', date: '2024-03-02', category: 'Trips' },
    { file: '3.jpg', caption: 'Silly faces', date: '2024-05-19', category: 'Selfies' },
    { file: '4.jpg', caption: 'Festival lights', date: '2024-10-31', category: 'Festivals' },
    { file: '5.jpg', caption: 'Lazy Sunday', date: '2025-02-09', category: 'Random' },
    { file: '6.jpg', caption: 'Dinner for two', date: '2025-06-21', category: 'Dates' }
  ]
};
