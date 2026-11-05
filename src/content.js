export const TOGETHER_SINCE = new Date('2025-11-06T00:00:00')
export const FIRST_MET = new Date('2025-12-19T00:00:00')
export const FIRST_ANNIVERSARY = new Date('2026-11-06T00:00:00')
export const UNLOCK_AT = new Date('2026-11-06T06:00:00')

// The message shown when the gift box opens on the anniversary.
// Blank lines make new paragraphs. Replace this with your own words.
export const UNWRAP_MESSAGE = `Happy anniversary, my love.

Exactly at 6am today an year ago, you made my heart skip a lot of beats, we could have never imagined we would come this far and now all we can imagine is a forever "Us", I love you infinity, I love you more than anything Dr Kunal Alha.

This is for you, and it is ours.`

// The playful question before the gift opens. Only he should know the answer.
// answers: every spelling you will accept (capitals and punctuation are ignored).
// This check is for fun, not security: anyone reading the app's code could see it.
export const LOCK_QUESTION = {
  question: 'What is it that I always said I hate, but is one of the most loved thing for me now?',
  answers: ['kiss'],
  hint: 'You always love it!',
  wrongReplies: ['Try again, love.', 'You can do better than that.', 'Kunalll!?'],
}

// Your album. Add one line per photo. The caption is optional.
// Photos live in the public/album folder.
export const ALBUM = [
  { src: '/album/01.jpg', caption: 'My man trying to be cahlantly non-chalant' },
  { src: '/album/02.jpg', caption: 'Narcissist or does not want to show me to the world?' },
  { src: '/album/03.jpg', caption: 'Last best hug of the first best meet' },
  { src: '/album/04.jpg', caption: 'As if I asked you to kiss me! Huhh!' },
  { src: '/album/05.jpg', caption: 'I know you secretly love me chipka-chipking you' },
  { src: '/album/06.jpg', caption: 'Sometimes you show the real you(CHALANT insaan)' },
  { src: '/album/07.jpg', caption: 'Acchaaaaaa, style marle!' },
  { src: '/album/08.jpg', caption: 'Mera kuchupuchuuuuu' },
  { src: '/album/09.jpg', caption: 'I doubt your gender sometimes, you look a bitchy non chalant aunty' },
  { src: '/album/10.jpg', caption: 'Ye last time kab aai thi? what day?' },
  { src: '/album/11.jpg', caption: 'Iss narcissist ko kissi kar dugi mein, phir pagal ho jaayega ye, mere pyaar mein' },
  { src: '/album/12.jpg', caption: 'Meine Schatz' },
  { src: '/album/13.jpg', caption: 'Cutuuuuu patutoooooo' },
  { src: '/album/14.jpg', caption: 'me and my idhar aa batati hun tujhe' },
  { src: '/album/15.jpg', caption: 'My handsome, smart and hot man, MINE and MINE' },
]

// Optional: force a specific photo on a special date (format YYYY-MM-DD)
export const PINNED = {
  '2026-11-06': { src: '/album/03.jpg', caption: 'One year!' },
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
  'Because you baby me and I am your baby.',
  'You made yourself the first person I think of in need of anything.',
  'You are patient with me and I am full of chaos.',
  'You make me miss you even when I am angry, which is almost impossible and yet here I am.',
  'You can make my worst day, baddest mood into the best time.',
  'Because I want to beat you at loving, its you loving me VS me loving you.',
  'Because you know exactly what to say to me.',
  'You are the hottest man alive in the universe.',
  'Because you deserve the best I can or anyone can ever give.',
  'You turn me on.',
  'You are the cutest creature.',
  'You are my baby.',
  'You sometimes do the best hawa mein baatein and sometimes I am in hawa',
  'Because you and me deserve me and you respectively.',
  'You are the perfect and only man who can make me crazy about him.',
  'I love being with you and I would love for it to be forever.',
  'Because I can never give up pani puri for anyone but you.'
]

// Our Story: one entry per moment. Newest goes at the bottom.
// An entry only appears once its date has arrived, so you can add future ones now.
//   date     YYYY-MM-DD
//   version  the little tag on the timeline (v1.0, v1.1, ...)
//   photo    optional, e.g. '/album/02.jpg'
export const TIMELINE = [
  { date: '2025-11-06', version: 'v1.0', title: 'You, me and maybe Day1?', text: 'When you called me at 6 am, I was very sleepy and was a little angry at you when you insisted so much to be on the VC, but the moment you began that poem, I realised how much you love me and how much I have already fallen for you. I was ridiculously happy and was thinking about it for the whole day and the following days and even now I sometimes think about it and cannot believe how can someone love me and most importantly make me feel this much loved and precious.' },
  { date: '2025-12-19', version: 'v1.1', title: 'The day we first met', text: 'I remember how desperate I was to meet you and how very excited I was, but as soon as I was at the stay I was nervous and when you cam maybe even more, I tried to give you the warmest hug but somehow awkwardly failed at it! I tried to meet your eyes but I was too shy to do that and when we cuddled I tried to do it but I failed again, but when you keppt asking me to come closer and closer there was a moment I overcame everything and hugged you as tight as I could, with all the strength I built missing you,, with all the yearn I wanted to hug you earlier with, with all the warmth that kept igniting with time and with all the love I with held for a long long time, and after that I never wanted to let go, I want to be in your arms always like that and I promise that I will always hold you like that. But even with that much peace we could not sleep at all, we just stayed there, holding each other and when we held each others gaze, sleeping on the same pillow, I vividly remember the butterflies in my stomach when you came closer to me, so much close that I could feel your breath over my lips and we were not just breating the same air but all the same molecules, you mine and me yours, I saw how you touched my lips with yours while your eyes were closed and mine were focused on you, how you kissed me and I was just there and you kept doing that and your tongue was touching me and then inside and I was still just looking at you and feeling a whole new feeling a whole new thing, since that moment I knew there is no going back for me, I love this man and I love how he loves me, how he kisses me, gentle and sharp at the same time. If I would say these are my most memorable moments from our first me I would be lying but these are undeniably my most favorite ones, no, few of my most favorite ones, I would not write few, but the other things I love is the gin and lemon, you being awkward and shy, you speakimg into my ear on our date, ice cream and its stains and your jacket colour(hahhahahaha)', photo: '/album/02.jpg' },
  { date: '2026-11-06', version: 'v2.0', title: 'One year', text: 'Just consider its not Nov 6 yet and we are yet to make the memories of our first anniversary, I will add all those soon!' },
]

// Time capsule: sealed until a year from now. Write notes to your future selves.
export const CAPSULE = {
  opensOn: '2027-11-06',
  notes: [
    { from: 'Written on our first anniversary', text: 'I cannot believe we would not be together for our 1st anniversary, I HATE PEDIAAAA, I will make sure to change our clocks when we meet and we will celebrate a lot our 1 year together!!!on Nov 6, with some intended human errors.' },
  ],
}

// Open When letters. "when" completes: "Take when ..."
export const LETTERS = [
  { id: 'miss', when: 'you miss me', text: 'First of all I miss you the same or maybe more, but if we would have been together I would have hugged you so tight, I miss you when you take time in the washroom or on the call, but as soon as you are back I stick to you, just imagine this time just as much as the call or I am in the washroom and as soon as it ends and I am back to you I will stick to you, very very very tight!' },
  { id: 'stressed', when: 'you are stressed', text: 'If you can handle me this patiently you can do anything baby, literally ANYTHING. You have no realization but you are best at it and EVERYTHING.' },
  { id: 'sleep', when: 'you cannot sleep', text: 'Did I sleep early again!? or am I home? or am I angry? whatever it is, I always want to be right beside you, cuddling or over you and if we would have been together, I would have run my fingers through your hair and give you a lot of soft kisses and make you warm by cuddling.' },
  { id: 'laugh', when: 'you need a laugh', text: 'Am I the funniest or am I the funniest? I know you are bored as your smart, pretty and funny gf is not around you and what does a tall, plain bf do without his amazing wife, but you can just call me, I can tell you some "cool" things yk being from Acoola.' },
  { id: 'argue', when: 'we had an argument', text: 'I am sure you made me angry, but yk that I will push you away when I do not even want that at all, I miss you so much so very much and I cannot be out of character, if I am pushing you away just pull me harder and closer and remember I AM JUST A BABY, YOUR BABY.' },
]

// Scratch cards. kind is 'memory', 'coupon' or 'surprise'. The reveal is what's hidden.
export const SCRATCH_CARDS = [
  { id: 's1', kind: 'memory', reveal: 'Your laugh: There is this laugh of yours you give me, when yoou do smething witty, I cannot explain that but I remember that very vividly, I love love lve that! it is something like, no I do not want to say how it is, but it is very natural and you seem the cutest creature to me when you do that.' },
  { id: 's2', kind: 'coupon', reveal: 'Coupon: you are right pass, valid for any 1, JUST 1 argument!' },
  { id: 's3', kind: 'surprise', reveal: 'You get a spicy pic: you decide what I wear and what not.' },
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
  { label: 'our anniversary', month: 11, day: 6, kind: 'anniversary', showWithin: 5 },
  { label: 'our monthsary', day: 6, monthly: true, kind: 'monthsary', showWithin: 0 },

  // EXAMPLE ONLY: change this to your real next meet-up date, or delete the line.
  { label: 'we see each other', date: '2026-12-20', since: '2026-11-06', todayText: 'Today we see each other!' },

  { label: 'his birthday', month: 8, day: 6, showWithin: 5 },
  { label: 'my birthday', month: 1, day: 15, showWithin: 5 },
]