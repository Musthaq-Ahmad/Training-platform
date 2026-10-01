// Generated from the Phase 1 and Phase 2 Trainee Guides (task text is the guides' wording).
// Task ids follow the day page: `${dayId}-t-${sequenceOrder}`.
import type { CatalogDay } from '../types';

export const htmlDays: CatalogDay[] = [
  {
    dayId: 'html-day-01',
    dayNumber: 1,
    courseTitle: 'HTML',
    tasks: [
      {
        id: 'html-day-01-t-1',
        sequenceOrder: 1,
        title: 'HTML5 Boilerplate from Memory',
        isStretchGoal: false,
        estimatedMinutes: 20,
        instructionsMarkdown:
          "**HTML · Day 1: HTML5 Document Structure & Text Elements** · Task 1 of 6 · about 20 min\n\n## Today's goal\nBy the end of the day you will have built a personal profile page, a recipe page, and a news article page - all validated to zero W3C errors.\n\n## What to do\n\n1. Open a blank text file and type a complete HTML5 boilerplate without looking anything up: DOCTYPE declaration, html element with lang attribute, head with charset meta, viewport meta, and a title, then a body\n2. Open it in Chrome and confirm the tab title matches what you set\n3. Paste the file into validator.w3.org - fix every error shown before continuing\n4. Write a comment in the file explaining what each line of the head section does\n",
      },
      {
        id: 'html-day-01-t-2',
        sequenceOrder: 2,
        title: 'Personal Profile Page',
        isStretchGoal: false,
        estimatedMinutes: 35,
        instructionsMarkdown:
          "**HTML · Day 1: HTML5 Document Structure & Text Elements** · Task 2 of 6 · about 35 min\n\n## Today's goal\nBy the end of the day you will have built a personal profile page, a recipe page, and a news article page - all validated to zero W3C errors.\n\n## What to do\n\n1. Create profile.html with your name as an h1, a professional tagline as h2, three paragraphs about yourself\n2. Add an unordered list of five technical skills and an ordered list of three career goals\n3. Add at least one external link (href with https://), one email link (mailto:), and one page-internal anchor link (href=#section-id)\n4. Use strong and em for semantic emphasis - not for bold/italic styling. Add a comment explaining your choice for each use.\n5. Validate - zero errors\n",
      },
      {
        id: 'html-day-01-t-3',
        sequenceOrder: 3,
        title: 'Recipe Page with All Three List Types',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**HTML · Day 1: HTML5 Document Structure & Text Elements** · Task 3 of 6 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a personal profile page, a recipe page, and a news article page - all validated to zero W3C errors.\n\n## What to do\n\n1. Create recipe.html for any dish with: ingredients as an unordered list, method steps as an ordered list, a cooking terms glossary as a definition list (dl, dt, dd)\n2. Add a nested list inside the ingredients section: main items at the top level, optional substitutes as nested li items\n3. Add a blockquote with a fictional chef quote - use the cite attribute on the blockquote and a cite element inside it\n4. Add at least three abbr elements (e.g. `<abbr title='tablespoon'>`tbsp`</abbr>`) and three time elements with datetime attributes\n5. Validate - zero errors\n",
      },
      {
        id: 'html-day-01-t-4',
        sequenceOrder: 4,
        title: 'News Article with Semantic Text Elements',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**HTML · Day 1: HTML5 Document Structure & Text Elements** · Task 4 of 6 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a personal profile page, a recipe page, and a news article page - all validated to zero W3C errors.\n\n## What to do\n\n1. Create article.html - a fictional news article of at least 250 words\n2. Use mark to highlight a key phrase, del for a correction (strike-through), ins for the corrected replacement\n3. Add a pre/code block showing a fictional command or snippet mentioned in the article\n4. Add a sup for a footnote reference number and a sub for a chemical formula in the text\n5. Add a figure with an image (use https://picsum.photos/600/400) and a figcaption\n6. Validate - zero errors\n",
      },
      {
        id: 'html-day-01-t-5',
        sequenceOrder: 5,
        title: 'Internal Navigation with Anchor Links',
        isStretchGoal: false,
        estimatedMinutes: 35,
        instructionsMarkdown:
          "**HTML · Day 1: HTML5 Document Structure & Text Elements** · Task 5 of 6 · about 35 min\n\n## Today's goal\nBy the end of the day you will have built a personal profile page, a recipe page, and a news article page - all validated to zero W3C errors.\n\n## What to do\n\n1. Create a single long-scroll page with five distinct sections: About, Skills, Projects, Experience, Contact\n2. Build a navigation bar at the top of the page with anchor links to each section (#about, #skills, etc.)\n3. Add a 'Back to top' link at the bottom of each section that jumps back to the top anchor\n4. Verify every link works correctly in the browser - test by clicking each one\n",
      },
      {
        id: 'html-day-01-t-6',
        sequenceOrder: 6,
        title: 'Every Inline Text Element',
        isStretchGoal: false,
        estimatedMinutes: 30,
        instructionsMarkdown:
          "**HTML · Day 1: HTML5 Document Structure & Text Elements** · Task 6 of 6 · about 30 min\n\n## Today's goal\nBy the end of the day you will have built a personal profile page, a recipe page, and a news article page - all validated to zero W3C errors.\n\n## What to do\n\n1. Create a reference page demonstrating one correct use of every HTML text element: p, span, strong, em, small, b, i, u, s, sup, sub, abbr, cite, q, code, kbd, samp, var, mark, del, ins, time, dfn\n2. Add an HTML comment above each element with its semantic meaning (not its visual effect)\n3. Validate - zero errors\n",
      },
      {
        id: 'html-day-01-t-7',
        sequenceOrder: 7,
        title: 'Build a complete CV for a fictional software engineer in pure HTML',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**HTML · Day 1: HTML5 Document Structure & Text Elements** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nBuild a complete CV for a fictional software engineer in pure HTML. Use a definition list for employment history (date → company/role pairs), an ordered list for education, an unordered list for skills grouped into categories using nested lists, and a projects section using article elements. Validate to zero errors. No inline styles.\n',
      },
    ],
  },
  {
    dayId: 'html-day-02',
    dayNumber: 2,
    courseTitle: 'HTML',
    tasks: [
      {
        id: 'html-day-02-t-1',
        sequenceOrder: 1,
        title: 'Full Semantic Page Rebuild',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**HTML · Day 2: Semantic HTML5 & Web Accessibility** · Task 1 of 6 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a fully semantic blog page and an accessible image gallery, both scoring 90+ on Lighthouse Accessibility.\n\n## What to do\n\n1. Take your Day 1 profile.html and completely rebuild it using proper semantic landmarks: header (contains your name and nav), nav (links to all sections), main, article, section (for each topic area), aside (a related links or bio snippet), footer\n2. Every section and article must have a heading that describes its content - heading levels continue logically from the page h1\n3. The aside must contain genuinely supplementary content - something the reader could skip without missing the main message\n4. Open Chrome DevTools > Accessibility tab and verify that all landmark elements appear in the accessibility tree\n5. Run axe DevTools - resolve every critical and serious issue\n",
      },
      {
        id: 'html-day-02-t-2',
        sequenceOrder: 2,
        title: 'Multi-Article Blog Page',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**HTML · Day 2: Semantic HTML5 & Web Accessibility** · Task 2 of 6 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a fully semantic blog page and an accessible image gallery, both scoring 90+ on Lighthouse Accessibility.\n\n## What to do\n\n1. Create blog.html with a full site structure: header (logo text + tagline), nav (Home, Blog, About, Contact links), main containing three complete articles, aside (Recent Posts and Categories sections), footer\n2. Each article must use: article element, header (with h2 title and time element showing publication date), section for the body text, footer (with the author name in a span and a category tag as a link)\n3. The nav must have aria-label='Main navigation' to distinguish it from the aside nav\n4. Score 90+ on Lighthouse Accessibility before moving to the next task\n",
      },
      {
        id: 'html-day-02-t-3',
        sequenceOrder: 3,
        title: 'ARIA Hands-On',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**HTML · Day 2: Semantic HTML5 & Web Accessibility** · Task 3 of 6 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a fully semantic blog page and an accessible image gallery, both scoring 90+ on Lighthouse Accessibility.\n\n## What to do\n\n1. Create aria-demo.html and add the following ARIA patterns: role='search' on a div wrapping a search input, aria-label='Close menu' on a button that only contains an X character, aria-expanded='false' and aria-controls='menu-id' on a toggle button, role='alert' and aria-live='polite' on a notification div\n2. Add aria-required='true' on three form inputs and aria-describedby pointing to a helper text paragraph beneath each\n3. Add a visually-hidden skip link at the very top of the body: `<a href='#main-content' class='skip-link'>`Skip to main content`</a>` - style it visible on focus using inline style (you will do proper CSS next week)\n4. Run axe DevTools - zero issues\n",
      },
      {
        id: 'html-day-02-t-4',
        sequenceOrder: 4,
        title: 'Accessible Image Gallery',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**HTML · Day 2: Semantic HTML5 & Web Accessibility** · Task 4 of 6 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a fully semantic blog page and an accessible image gallery, both scoring 90+ on Lighthouse Accessibility.\n\n## What to do\n\n1. Create gallery.html with fifteen images from https://picsum.photos/400/300?random=N (change N for each image)\n2. Wrap each in a figure element with a figcaption describing the image subject and context\n3. The alt attribute must be different from the figcaption - alt is for when the image fails to load; figcaption adds contextual information for all users\n4. Add two purely decorative images (use alt='' on them) and explain in an HTML comment why they are decorative\n5. Group images into three thematic sections using section elements, each with an h2 heading\n6. Score 100 on Lighthouse Accessibility - gallery pages often have the easiest path to 100\n",
      },
      {
        id: 'html-day-02-t-5',
        sequenceOrder: 5,
        title: 'Accessibility Audit & Fix',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**HTML · Day 2: Semantic HTML5 & Web Accessibility** · Task 5 of 6 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a fully semantic blog page and an accessible image gallery, both scoring 90+ on Lighthouse Accessibility.\n\n## What to do\n\n1. Open your Day 1 news article page in Chrome\n2. Run Lighthouse and axe DevTools - document every error and warning in a comments.txt file alongside the HTML\n3. Fix every error in the HTML. Run Lighthouse again until the Accessibility score is 90 or above\n4. Add lang='en' to the html element (if missing). Add lang overrides on any non-English words or phrases\n5. Add descriptive page titles to every HTML file you have created so far\n",
      },
      {
        id: 'html-day-02-t-6',
        sequenceOrder: 6,
        title: 'Full Press Release Page',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**HTML · Day 2: Semantic HTML5 & Web Accessibility** · Task 6 of 6 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a fully semantic blog page and an accessible image gallery, both scoring 90+ on Lighthouse Accessibility.\n\n## What to do\n\n1. Create press-release.html for a fictional product launch - write at least 300 words\n2. Full landmark structure: header > main > article > section (×3) > aside > footer\n3. Include: company name as h1, dateline using time element, contact information in the aside using the address element, executive quote in a blockquote with cite, and a link to a fake download (PDF, use href='#' for now)\n4. Score 95+ on Lighthouse Accessibility\n",
      },
      {
        id: 'html-day-02-t-7',
        sequenceOrder: 7,
        title: 'Build a fully semantic, fully accessible portfolio homepage',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          "**HTML · Day 2: Semantic HTML5 & Web Accessibility** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nBuild a fully semantic, fully accessible portfolio homepage. Must include: skip navigation link (visible on focus), primary nav with aria-current='page', hero section with h1, about section with an image and correct alt text, projects grid using article elements, skills section using a dl, and a contact section using the address element. Target: Lighthouse Accessibility score of 100.\n",
      },
    ],
  },
  {
    dayId: 'html-day-03',
    dayNumber: 3,
    courseTitle: 'HTML',
    tasks: [
      {
        id: 'html-day-03-t-1',
        sequenceOrder: 1,
        title: 'Login Form - Accessibility First',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**HTML · Day 3: HTML Forms - Every Input Type & Validation** · Task 1 of 6 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a login form, a full registration form with 15+ input types, a payment form, and a multi-step application form - all accessible and validated.\n\n## What to do\n\n1. Create login.html with: email input (type=email, autocomplete=email), password input (type=password, autocomplete=current-password), a remember-me checkbox, and a submit button\n2. Every input must have a label with a for attribute matching the input id - no placeholder-only labels\n3. Add aria-describedby on the password field pointing to a hint paragraph that says 'Must be at least 8 characters'\n4. Add a show/hide password button with aria-pressed='false' (toggle with JS later - for now just add the button)\n5. Wrap the form in a main element with an h1. Score 100 on Lighthouse Accessibility.\n",
      },
      {
        id: 'html-day-03-t-2',
        sequenceOrder: 2,
        title: 'Full Registration Form - Every Input Type',
        isStretchGoal: false,
        estimatedMinutes: 55,
        instructionsMarkdown:
          "**HTML · Day 3: HTML Forms - Every Input Type & Validation** · Task 2 of 6 · about 55 min\n\n## Today's goal\nBy the end of the day you will have built a login form, a full registration form with 15+ input types, a payment form, and a multi-step application form - all accessible and validated.\n\n## What to do\n\n1. Create register.html. Use at least fifteen different input types: text, email, password, tel, number, url, date, time, datetime-local, month, week, range (for a skill level 1–10), color, checkbox, radio, file\n2. Group fields with fieldset and legend: 'Personal Details' (name, email, phone), 'Account' (username, password, confirm password), 'Preferences' (notifications radio, skill level range, profile colour picker)\n3. Add a datalist to the job title text input with at least eight suggested options\n4. Add required, minlength, maxlength, and pattern attributes where appropriate - e.g. pattern='[A-Za-z0-9_]{3,20}' on username\n5. Validate - zero errors\n",
      },
      {
        id: 'html-day-03-t-3',
        sequenceOrder: 3,
        title: 'Native HTML5 Validation',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**HTML · Day 3: HTML Forms - Every Input Type & Validation** · Task 3 of 6 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a login form, a full registration form with 15+ input types, a payment form, and a multi-step application form - all accessible and validated.\n\n## What to do\n\n1. Create validation.html and build a form that uses only HTML5 native validation (no JavaScript)\n2. Include: required email field, password with minlength=8 and a pattern requiring at least one number, age field (number, min=18, max=99), website URL field, and a date of birth picker that only allows dates before today (set max to today using a fixed date in YYYY-MM-DD format)\n3. Test each field by submitting with wrong data and observe the browser's native validation messages\n4. Add a novalidate attribute, confirm the form now submits without validation, then remove it again\n",
      },
      {
        id: 'html-day-03-t-4',
        sequenceOrder: 4,
        title: 'Payment / Checkout Form',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**HTML · Day 3: HTML Forms - Every Input Type & Validation** · Task 4 of 6 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a login form, a full registration form with 15+ input types, a payment form, and a multi-step application form - all accessible and validated.\n\n## What to do\n\n1. Create checkout.html with three fieldsets: Delivery Address (full name, address lines 1 and 2, city, postcode, country select with at least 20 countries), Payment Details (card number with maxlength=16, expiry month and year selects, CVV with type=password and maxlength=4), Order Notes (optional textarea with maxlength=500)\n2. Required fields must be marked both with the required attribute AND a visible asterisk - add a legend below the form title: 'Fields marked * are required'\n3. The CVV field must have aria-describedby pointing to a tooltip paragraph: '3 or 4 digits on the back of your card'\n4. Score 90+ on Lighthouse Accessibility\n",
      },
      {
        id: 'html-day-03-t-5',
        sequenceOrder: 5,
        title: 'Multi-Section Application Form',
        isStretchGoal: false,
        estimatedMinutes: 60,
        instructionsMarkdown:
          "**HTML · Day 3: HTML Forms - Every Input Type & Validation** · Task 5 of 6 · about 60 min\n\n## Today's goal\nBy the end of the day you will have built a login form, a full registration form with 15+ input types, a payment form, and a multi-step application form - all accessible and validated.\n\n## What to do\n\n1. Create application.html - a job application form for a fictional tech company\n2. Use three fieldsets with clear legends: 'Step 1: Personal Information' (name, email, phone, LinkedIn URL), 'Step 2: Work Experience' (current role text, current company text, years experience number, a textarea for key achievements), 'Step 3: Documents' (CV upload with accept='.pdf,.docx', cover letter upload, portfolio URL)\n3. Add an ordered list at the top as a visual step indicator: Step 1, Step 2, Step 3 - mark the current fieldset's step with aria-current='step'\n4. Add a character counter hint (e.g. 'Max 500 characters') near the textarea\n5. Validate - zero errors. Score 90+ Accessibility.\n",
      },
      {
        id: 'html-day-03-t-6',
        sequenceOrder: 6,
        title: 'Accessible Form Audit',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**HTML · Day 3: HTML Forms - Every Input Type & Validation** · Task 6 of 6 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a login form, a full registration form with 15+ input types, a payment form, and a multi-step application form - all accessible and validated.\n\n## What to do\n\n1. Take all forms created today and run axe DevTools and Lighthouse Accessibility on each\n2. Ensure every form control has a programmatic label (for/id pair, or aria-label, or aria-labelledby - not just a nearby paragraph)\n3. Ensure every required field has both the required HTML attribute and a visible indicator\n4. Check the tab order through every form by pressing Tab in the browser - the tab order must follow the visual reading order\n5. Document any issues that remain and explain why they are hard to fix with HTML alone (JavaScript would be needed)\n",
      },
      {
        id: 'html-day-03-t-7',
        sequenceOrder: 7,
        title:
          'Build a comprehensive job application form including: personal details, a repeatable work…',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          "**HTML · Day 3: HTML Forms - Every Input Type & Validation** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nBuild a comprehensive job application form including: personal details, a repeatable work history section (three previous jobs, each with company, role, start date, end date, a 'Currently work here' checkbox that disables the end date when checked - use HTML disabled attribute manually for now), education section, skills checkboxes grouped by category using fieldsets, and a 500-word supporting statement textarea. All fields accessible. Zero W3C errors.\n",
      },
    ],
  },
  {
    dayId: 'html-day-04',
    dayNumber: 4,
    courseTitle: 'HTML',
    tasks: [
      {
        id: 'html-day-04-t-1',
        sequenceOrder: 1,
        title: 'League Table - Data Table Best Practices',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**HTML · Day 4: Tables, Media, Embeds & Metadata** · Task 1 of 6 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a complex data table with spanning, an accessible audio/video page, a responsive image gallery using srcset, and a page with complete Open Graph metadata.\n\n## What to do\n\n1. Create tables.html and build a twelve-team sports league standings table\n2. Use thead (column headers: Team, Played, Won, Drawn, Lost, GF, GA, GD, Pts), tbody (twelve rows of data), tfoot (a totals or averages row)\n3. Add scope='col' on every th in the thead and scope='row' on every team name th in the tbody\n4. Add a caption element that describes the table for screen readers\n5. Validate - zero errors\n",
      },
      {
        id: 'html-day-04-t-2',
        sequenceOrder: 2,
        title: 'Comparison Table with Spanning',
        isStretchGoal: false,
        estimatedMinutes: 55,
        instructionsMarkdown:
          "**HTML · Day 4: Tables, Media, Embeds & Metadata** · Task 2 of 6 · about 55 min\n\n## Today's goal\nBy the end of the day you will have built a complex data table with spanning, an accessible audio/video page, a responsive image gallery using srcset, and a page with complete Open Graph metadata.\n\n## What to do\n\n1. Build a software pricing comparison table: five plans across the columns (Free, Starter, Pro, Business, Enterprise), fifteen features down the rows\n2. Use colspan=5 on the main header row to span all plan columns\n3. Group features into three categories (Core, Collaboration, Support) using rows where the category cell has rowspan equal to the number of features in that category\n4. Mark the recommended plan column with a class='featured' attribute on its col element inside a colgroup\n5. Use abbr inside th elements where headers are long (e.g. `<abbr title='Maximum Users'>`Max. Users`</abbr>`)\n",
      },
      {
        id: 'html-day-04-t-3',
        sequenceOrder: 3,
        title: 'Weekly Timetable with Multi-Span Cells',
        isStretchGoal: false,
        estimatedMinutes: 35,
        instructionsMarkdown:
          "**HTML · Day 4: Tables, Media, Embeds & Metadata** · Task 3 of 6 · about 35 min\n\n## Today's goal\nBy the end of the day you will have built a complex data table with spanning, an accessible audio/video page, a responsive image gallery using srcset, and a page with complete Open Graph metadata.\n\n## What to do\n\n1. Build a class timetable: rows = hours 09:00–17:00, columns = Monday to Friday\n2. At least three sessions must span multiple hours using rowspan, and at least one session must span multiple days using colspan\n3. Add a time element inside each cell for the session start time\n4. Validate - zero errors\n",
      },
      {
        id: 'html-day-04-t-4',
        sequenceOrder: 4,
        title: 'Audio & Video with Accessibility',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**HTML · Day 4: Tables, Media, Embeds & Metadata** · Task 4 of 6 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a complex data table with spanning, an accessible audio/video page, a responsive image gallery using srcset, and a page with complete Open Graph metadata.\n\n## What to do\n\n1. Create media.html and embed an HTML5 video using a public sample URL (https://www.w3schools.com/html/mov_bbb.mp4 for testing)\n2. Add controls, width='640', a poster image (any placeholder image URL), and a fallback paragraph for unsupported browsers\n3. Create a simple .vtt caption file with at least three cue entries and reference it with a track element (kind='captions', srclang='en', label='English')\n4. Add an audio element with controls, two source elements (use .mp3 and .ogg as type values even if the same src - this demonstrates the format fallback pattern), and a fallback link\n5. Add a details/summary transcript section beneath each media element\n",
      },
      {
        id: 'html-day-04-t-5',
        sequenceOrder: 5,
        title: 'Responsive Images - srcset & picture',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**HTML · Day 4: Tables, Media, Embeds & Metadata** · Task 5 of 6 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a complex data table with spanning, an accessible audio/video page, a responsive image gallery using srcset, and a page with complete Open Graph metadata.\n\n## What to do\n\n1. Create images.html and add eight images using srcset with three size variants each: 400w, 800w, 1200w (use picsum.photos URLs with different dimensions). Add a sizes attribute on each: sizes='(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw'\n2. Add two picture elements for art direction: one shows a wide landscape crop at screens above 800px (use a wide-ratio picsum URL) and a square crop below 800px. Show the correct use of the media attribute on source.\n3. Add loading='lazy' on five images and loading='eager' on the first hero image\n4. Open DevTools Network tab, set the viewport to 400px, reload - verify that smaller image variants are requested\n",
      },
      {
        id: 'html-day-04-t-6',
        sequenceOrder: 6,
        title: 'Complete Metadata for Social Sharing',
        isStretchGoal: false,
        estimatedMinutes: 55,
        instructionsMarkdown:
          "**HTML · Day 4: Tables, Media, Embeds & Metadata** · Task 6 of 6 · about 55 min\n\n## Today's goal\nBy the end of the day you will have built a complex data table with spanning, an accessible audio/video page, a responsive image gallery using srcset, and a page with complete Open Graph metadata.\n\n## What to do\n\n1. Create a page about a fictional product. Add a complete set of head metadata: title, meta description (150 chars), meta keywords, meta author, canonical link element\n2. Add all required Open Graph tags: og:title, og:type, og:url, og:image, og:description, og:site_name\n3. Add Twitter Card tags: twitter:card='summary_large_image', twitter:title, twitter:description, twitter:image\n4. Add a theme-color meta tag and a favicon link element\n5. Test your Open Graph tags at opengraph.xyz and record what the preview looks like\n",
      },
      {
        id: 'html-day-04-t-7',
        sequenceOrder: 7,
        title: 'Build a full sports results archive page',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**HTML · Day 4: Tables, Media, Embeds & Metadata** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nBuild a full sports results archive page. It must contain: a season summary table with colspan and rowspan (teams × match rounds), an audio player for fictional match commentary with a full transcript in a details/summary element, a video embed of the fictional season highlights with a .vtt caption file, a responsive image gallery of match photos using srcset with three variants and correct sizes attribute, and complete Open Graph and Twitter Card metadata. Validate everything.\n',
      },
    ],
  },
  {
    dayId: 'html-day-05',
    dayNumber: 5,
    courseTitle: 'HTML',
    tasks: [
      {
        id: 'html-day-05-t-1',
        sequenceOrder: 1,
        title: 'Project Setup',
        isStretchGoal: false,
        estimatedMinutes: 30,
        instructionsMarkdown:
          "**HTML · Day 5: Week 1 Project - Five-Page Semantic Website** · Task 1 of 6 · about 30 min\n\n## Today's goal\nBy the end of the day you will have built a complete five-page HTML website pushed to GitHub, validated on all pages, and deployed to GitHub Pages.\n\n## What to do\n\n1. Create a new GitHub repository for the project. Clone it locally.\n2. Scaffold the folder structure: index.html, about.html, services.html, team.html, contact.html, plus /images and /media placeholder folders\n3. Write the shared navigation HTML snippet once (you will copy-paste it into each page and mark the active page with aria-current='page')\n4. Add a shared footer snippet. Commit with message: 'chore: scaffold five-page project'\n",
      },
      {
        id: 'html-day-05-t-2',
        sequenceOrder: 2,
        title: 'Build Home Page + About Page',
        isStretchGoal: false,
        estimatedMinutes: 80,
        instructionsMarkdown:
          "**HTML · Day 5: Week 1 Project - Five-Page Semantic Website** · Task 2 of 6 · about 80 min\n\n## Today's goal\nBy the end of the day you will have built a complete five-page HTML website pushed to GitHub, validated on all pages, and deployed to GitHub Pages.\n\n## What to do\n\n1. Home (index.html): full landmark structure, hero section with h1, three-column features section using h2 and h3, three testimonials using blockquote with cite, full metadata (title, description, Open Graph)\n2. About (about.html): company history using dl for year/event pairs, mission statement blockquote, values section with three article elements, address element with company contact info\n3. Both: validate zero errors, 90+ Lighthouse Accessibility\n",
      },
      {
        id: 'html-day-05-t-3',
        sequenceOrder: 3,
        title: 'Build Services Page',
        isStretchGoal: false,
        estimatedMinutes: 70,
        instructionsMarkdown:
          "**HTML · Day 5: Week 1 Project - Five-Page Semantic Website** · Task 3 of 6 · about 70 min\n\n## Today's goal\nBy the end of the day you will have built a complete five-page HTML website pushed to GitHub, validated on all pages, and deployed to GitHub Pages.\n\n## What to do\n\n1. Three service articles (each an article with h2, description, a list of features, and a call-to-action link)\n2. A comparison table of the three services across ten criteria - use thead, tbody, correct scope attributes, and a caption\n3. Full metadata. Validate. 90+ Accessibility.\n",
      },
      {
        id: 'html-day-05-t-4',
        sequenceOrder: 4,
        title: 'Build Team Page + Contact Page',
        isStretchGoal: false,
        estimatedMinutes: 75,
        instructionsMarkdown:
          "**HTML · Day 5: Week 1 Project - Five-Page Semantic Website** · Task 4 of 6 · about 75 min\n\n## Today's goal\nBy the end of the day you will have built a complete five-page HTML website pushed to GitHub, validated on all pages, and deployed to GitHub Pages.\n\n## What to do\n\n1. Team (team.html): twelve team member cards - each a figure with a placeholder image (picsum.photos with rounding), figcaption for name, p for role, p for bio. Group into two departments using section with h2.\n2. Contact (contact.html): full accessible contact form (name, email, phone, department select, message textarea, newsletter checkbox, submit button). Include an iframe Google Maps embed with title attribute. Add an address element for the physical address.\n3. Both: validate, 90+ Accessibility\n",
      },
      {
        id: 'html-day-05-t-5',
        sequenceOrder: 5,
        title: 'Cross-link, Polish & Final Validation',
        isStretchGoal: false,
        estimatedMinutes: 60,
        instructionsMarkdown:
          "**HTML · Day 5: Week 1 Project - Five-Page Semantic Website** · Task 5 of 6 · about 60 min\n\n## Today's goal\nBy the end of the day you will have built a complete five-page HTML website pushed to GitHub, validated on all pages, and deployed to GitHub Pages.\n\n## What to do\n\n1. Ensure every page has the same navigation with aria-current='page' on the correct link for each page\n2. Ensure every page has a unique, descriptive title and meta description\n3. Ensure every page has a consistent footer\n4. Run W3C Validation on all five pages - zero errors on every page\n5. Run Lighthouse Accessibility on all five pages - 90+ on every page\n6. Commit each page as a separate commit with a message format: 'feat: complete [page name] page'\n",
      },
      {
        id: 'html-day-05-t-6',
        sequenceOrder: 6,
        title: 'README + GitHub Pages Deploy',
        isStretchGoal: false,
        estimatedMinutes: 30,
        instructionsMarkdown:
          "**HTML · Day 5: Week 1 Project - Five-Page Semantic Website** · Task 6 of 6 · about 30 min\n\n## Today's goal\nBy the end of the day you will have built a complete five-page HTML website pushed to GitHub, validated on all pages, and deployed to GitHub Pages.\n\n## What to do\n\n1. Write a README.md: project name, description, screenshot of the home page (take a screenshot), list of pages and what each contains, tech used, and how to open locally\n2. Deploy to GitHub Pages: Settings > Pages > Source > main branch > root folder\n3. Share the live URL with your pod. Visit a pod partner's site and report one thing you notice.\n4. Final commit: 'project: week 1 HTML project complete - deployed to GitHub Pages'\n",
      },
      {
        id: 'html-day-05-t-7',
        sequenceOrder: 7,
        title:
          'Add a sixth page - a Products page - with a filterable data table of twelve products…',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**HTML · Day 5: Week 1 Project - Five-Page Semantic Website** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nAdd a sixth page - a Products page - with a filterable data table of twelve products (name, category, price, stock status, rating). Add a form above the table with a category select and an in-stock-only checkbox to filter the results. All HTML native - no JavaScript this week. Add print-friendly link elements in the head.\n',
      },
    ],
  },
];
