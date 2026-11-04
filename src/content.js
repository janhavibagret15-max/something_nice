export const TOGETHER_SINCE = new Date('2025-11-06T00:00:00')
export const FIRST_MET = new Date('2025-12-19T00:00:00')
export const FIRST_ANNIVERSARY = new Date('2026-11-06T00:00:00')
export const UNLOCK_AT = FIRST_ANNIVERSARY

// The message shown when the gift box opens on the anniversary.
// Blank lines make new paragraphs. Replace this with your own words.
export const UNWRAP_MESSAGE = `Happy anniversary, my love.

Placeholder: write your message to him here. A few lines are plenty.

This is for you, and it is ours.`

// The playful question before the gift opens. Only he should know the answer.
// answers: every spelling you will accept (capitals and punctuation are ignored).
// This check is for fun, not security: anyone reading the app's code could see it.
export const LOCK_QUESTION = {
  question: 'Placeholder: a question only he would know?',
  answers: ['placeholder'],
  hint: 'Placeholder: a small clue.',
  wrongReplies: ['Hmm, not quite.', 'Try again, love.', 'You can do better than that.'],
}

// Your album. Add one line per photo. The caption is optional.
// Photos live in the public/album folder.
export const ALBUM = [
  { src: '/album/01.jpg', caption: 'Our first video call' },
  { src: '/album/02.jpg', caption: 'The day we first met' },
  { src: '/album/03.jpg', caption: '' },
  // { src: '/album/04.jpg', caption: '' },
]

// Optional: force a specific photo on a special date (format YYYY-MM-DD)
export const PINNED = {
  '2026-11-06': { src: '/album/01.jpg', caption: 'One year!' },
}

// Daily question on the home screen. One per day, in order, then it starts over.
// Replace these with your own. Add as many as you like.
export const QUESTIONS = [
  'What is one small thing from today you want me to know about?',
  'What is a memory of us you replay when you miss me?',
  'If we had a free weekend together tomorrow, what would we do?',
  'What is something I do that you secretly love?',
  'What are you looking forward to this week?',
  'What song reminds you of us right now?',
  'What is one thing we should try together this year?',
]

// "A reason I love you" on the home screen. One per day, hidden until tapped.
// These are placeholders: write real ones. The more, the longer before they repeat.
export const REASONS = [
  'Placeholder: write a real reason here.',
  'Placeholder: something he does that nobody else notices.',
  'Placeholder: a moment you knew.',
  'Placeholder: how he makes ordinary days better.',
]

// Our Story: one entry per moment. Newest goes at the bottom.
// An entry only appears once its date has arrived, so you can add future ones now.
//   date     YYYY-MM-DD
//   version  the little tag on the timeline (v1.0, v1.1, ...)
//   photo    optional, e.g. '/album/02.jpg'
export const TIMELINE = [
  { date: '2025-11-06', version: 'v1.0', title: 'Day one', text: 'Placeholder: how it began, in your words.' },
  { date: '2025-12-19', version: 'v1.1', title: 'The day we first met', text: 'Placeholder: what you remember about that day.', photo: '/album/02.jpg' },
  { date: '2026-11-06', version: 'v2.0', title: 'One year', text: 'Placeholder: what this year meant.' },
]

// Time capsule: sealed until a year from now. Write notes to your future selves.
export const CAPSULE = {
  opensOn: '2027-11-06',
  notes: [
    { from: 'Written on our first anniversary', text: 'Placeholder: a note to the two of you, one year from now.' },
  ],
}

// Open When letters. "when" completes: "Take when ..."
export const LETTERS = [
  { id: 'miss', when: 'you miss me', text: 'Placeholder: write the letter he reads when he misses you.' },
  { id: 'stressed', when: 'you are stressed', text: 'Placeholder: something calming, from you.' },
  { id: 'sleep', when: 'you cannot sleep', text: 'Placeholder: a good-night letter.' },
  { id: 'laugh', when: 'you need a laugh', text: 'Placeholder: a silly memory or joke only you two get.' },
]

// Scratch cards. kind is 'memory', 'coupon' or 'surprise'. The reveal is what's hidden.
export const SCRATCH_CARDS = [
  { id: 's1', kind: 'memory', reveal: 'Placeholder: a memory of us.' },
  { id: 's2', kind: 'coupon', reveal: 'Coupon: one movie night, you pick.' },
  { id: 's3', kind: 'surprise', reveal: 'Placeholder: a surprise.' },
]

// Things to look forward to. The home screen shows the nearest one automatically.
//
//   label       completes the sentence "N days until ..."
//   date        a one-time date, YYYY-MM-DD
//   month + day repeats every year
//   day         with monthly: true, repeats every month
//   since       optional start date, makes the progress bar fill up
//   showWithin  only show the countdown in the last N days (0 = only on the day itself)
//   kind        'anniversary' or 'monthsary' gives an automatic "Happy ..." message
//   todayText   optional message for the day itself
//
// If two things fall on the same day, the one listed first wins.
export const EVENTS = [
  { label: 'our anniversary', month: 11, day: 6, kind: 'anniversary', showWithin: 7 },
  { label: 'our monthsary', day: 6, monthly: true, kind: 'monthsary', showWithin: 0 },

  // EXAMPLE ONLY: change this to your real next meet-up date, or delete the line.
  { label: 'we see each other', date: '2026-12-20', since: '2026-11-06', todayText: 'Today we see each other!' },

  // { label: 'his birthday', month: 1, day: 1, showWithin: 14 },
  // { label: 'my birthday', month: 1, day: 1, showWithin: 14 },
]