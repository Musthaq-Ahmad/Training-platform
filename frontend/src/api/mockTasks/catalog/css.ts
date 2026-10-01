// Generated from the Phase 1 and Phase 2 Trainee Guides (task text is the guides' wording).
// Task ids follow the day page: `${dayId}-t-${sequenceOrder}`.
import type { CatalogDay } from '../types';

export const cssDays: CatalogDay[] = [
  {
    dayId: 'css-day-01',
    dayNumber: 1,
    courseTitle: 'CSS',
    tasks: [
      {
        id: 'css-day-01-t-1',
        sequenceOrder: 1,
        title: 'Selector Challenge Sheet',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**CSS · Day 1: Selectors, Box Model, Colours & Typography** · Task 1 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a complete CSS design system (variables, type scale, colour palette) applied to your Week 1 home page.\n\n## What to do\n\n1. Create selectors.html with a specific DOM structure (a ul inside a main, inside a div, with mixed classes). Write CSS to: select every second li using nth-child, select all email inputs, select elements with both class=card AND class=featured, select the first p directly inside an article, select p elements immediately preceded by an h2\n2. Write rules using all five pseudo-classes: :hover, :focus, :first-child, :last-child, :nth-child(3n+1)\n3. Write ::before and ::after rules on the same element that add visible decorative content\n4. Write an attribute selector that styles all external links (href starting with https) differently from internal links\n",
      },
      {
        id: 'css-day-01-t-2',
        sequenceOrder: 2,
        title: 'Specificity Battle - Predict Before Running',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**CSS · Day 1: Selectors, Box Model, Colours & Typography** · Task 2 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a complete CSS design system (variables, type scale, colour palette) applied to your Week 1 home page.\n\n## What to do\n\n1. Create specificity.html. Add fifteen conflicting CSS rules targeting the same element using different selector types (element, class, ID, inline, !important)\n2. Before adding the stylesheet to the HTML, write your prediction of the winning rule for each group. Note your prediction in a comment above each rule.\n3. Link the stylesheet and run in browser. For every case where you were wrong, write a one-sentence explanation of why\n4. Write the specificity score in (0,0,0,0) format as a comment above each selector\n",
      },
      {
        id: 'css-day-01-t-3',
        sequenceOrder: 3,
        title: 'Box Model Deep Dive',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**CSS · Day 1: Selectors, Box Model, Colours & Typography** · Task 3 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a complete CSS design system (variables, type scale, colour palette) applied to your Week 1 home page.\n\n## What to do\n\n1. Create boxmodel.html with eight div elements. Apply different combinations of margin, padding, border, and set background-color on each area to visualise them\n2. Demonstrate box-sizing: content-box vs border-box: create two identical-width containers (300px), one of each type, and show visually that border-box includes padding and border in the width\n3. Demonstrate margin collapsing: two adjacent divs with top and bottom margins - measure the actual gap (it collapses to the larger value, not the sum)\n4. Show negative margins: use negative margin to overlap one element over another\n",
      },
      {
        id: 'css-day-01-t-4',
        sequenceOrder: 4,
        title: 'CSS Custom Properties Design System',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**CSS · Day 1: Selectors, Box Model, Colours & Typography** · Task 4 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a complete CSS design system (variables, type scale, colour palette) applied to your Week 1 home page.\n\n## What to do\n\n1. Create design-system.css with all custom properties in :root: --color-primary, --color-secondary, --color-accent, --color-success, --color-warning, --color-error, --color-text, --color-bg, plus five tints and shades of primary\n2. Define the same colour four ways for your primary swatch: hex, rgb(), hsl(), and oklch() - they must look identical in the browser\n3. Add a [data-theme='dark'] block that overrides the colour variables for a dark theme\n4. Apply your design system to the Week 1 home page. Toggle the theme in DevTools by adding data-theme='dark' to the html element.\n",
      },
      {
        id: 'css-day-01-t-5',
        sequenceOrder: 5,
        title: 'Typography System',
        isStretchGoal: false,
        estimatedMinutes: 55,
        instructionsMarkdown:
          "**CSS · Day 1: Selectors, Box Model, Colours & Typography** · Task 5 of 8 · about 55 min\n\n## Today's goal\nBy the end of the day you will have built a complete CSS design system (variables, type scale, colour palette) applied to your Week 1 home page.\n\n## What to do\n\n1. Create typography.html demonstrating a complete type scale: set html { font-size: 62.5% } so 1rem = 10px. Define sizes: 1.2rem, 1.4rem, 1.6rem, 1.8rem, 2.0rem, 2.4rem, 3.0rem, 3.6rem,\n2. 8rem, 6.0rem\n3. Import two Google Fonts using @import in the CSS: a serif for headings and a sans-serif for body text. Add font-display: swap to prevent invisible text during load.\n4. Demonstrate font-weight variants: 300, 400, 500, 600, 700. Show which ones are synthetic (not a real font file) vs native.\n5. Set line-height as unitless (1.5) and letter-spacing and word-spacing values. Apply text-overflow: ellipsis with overflow: hidden and white-space: nowrap to create a text truncation effect.\n",
      },
      {
        id: 'css-day-01-t-6',
        sequenceOrder: 6,
        title: 'Backgrounds, Borders & Shadows',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**CSS · Day 1: Selectors, Box Model, Colours & Typography** · Task 6 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a complete CSS design system (variables, type scale, colour palette) applied to your Week 1 home page.\n\n## What to do\n\n1. Create effects.html. Demonstrate every background property on separate elements: background-color, background-image with a URL, background-size (cover, contain, and specific px), background-position, background-repeat, background-attachment: fixed\n2. Create two linear-gradient and two radial-gradient backgrounds - at least one uses three colour stops and transparent\n3. Demonstrate four border styles (solid, dashed, dotted, double), border-radius as a circle (50%), pill (9999px), and individual corners with different values\n4. Add: a soft box-shadow (elevation), a hard offset shadow, an inner inset shadow, and layered multiple shadows on one element\n",
      },
      {
        id: 'css-day-01-t-7',
        sequenceOrder: 7,
        title: 'Pseudo-Classes & Pseudo-Elements',
        isStretchGoal: false,
        estimatedMinutes: 55,
        instructionsMarkdown:
          "**CSS · Day 1: Selectors, Box Model, Colours & Typography** · Task 7 of 8 · about 55 min\n\n## Today's goal\nBy the end of the day you will have built a complete CSS design system (variables, type scale, colour palette) applied to your Week 1 home page.\n\n## What to do\n\n1. Create pseudo.html and build a navigation bar using :hover and :focus-visible (not :focus) for interactive states - add a comment explaining the difference\n2. Build a custom styled checkbox: hide the default input[type=checkbox] with appearance: none, recreate a checkmark using ::before on a label that is displayed when :checked\n3. Build a numbered list using CSS counters: counter-reset on the ol, counter-increment on li, and content: counter() in a ::before pseudo-element\n4. Build a pure CSS tooltip: position::after as absolute, toggle it visible with :hover on the parent. The tooltip text comes from a data-tooltip attribute using attr()\n",
      },
      {
        id: 'css-day-01-t-8',
        sequenceOrder: 8,
        title: 'Apply Styles to Week 1 Home Page',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**CSS · Day 1: Selectors, Box Model, Colours & Typography** · Task 8 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a complete CSS design system (variables, type scale, colour palette) applied to your Week 1 home page.\n\n## What to do\n\n1. Style index.html from Week 1 using your design system variables, type scale, box model corrections, backgrounds, and shadows\n2. All CSS must be in an external stylesheet - zero inline styles and zero style attributes in the HTML\n3. The page must look intentionally designed - not browser defaults - but does not need to be complete. Focus on applying today's concepts.\n4. Take a screenshot before (browser defaults) and after. Commit with message: 'style: apply day 1 CSS to home page'\n",
      },
      {
        id: 'css-day-01-t-9',
        sequenceOrder: 9,
        title: 'Build a complete CSS design-system documentation page - a living style guide',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**CSS · Day 1: Selectors, Box Model, Colours & Typography** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nBuild a complete CSS design-system documentation page - a living style guide. It must display: all colour swatches from your custom properties (with hex values overlaid using ::after), the full type scale with labels, all shadow variants, all border-radius options, and a button states section (default, hover, focus, active, disabled). Everything must update automatically if you change one custom property in :root.\n',
      },
    ],
  },
  {
    dayId: 'css-day-02',
    dayNumber: 2,
    courseTitle: 'CSS',
    tasks: [
      {
        id: 'css-day-02-t-1',
        sequenceOrder: 1,
        title: 'Every Container Property',
        isStretchGoal: false,
        estimatedMinutes: 35,
        instructionsMarkdown:
          "**CSS · Day 2: CSS Flexbox - Every Property, Real Layouts** · Task 1 of 8 · about 35 min\n\n## Today's goal\nBy the end of the day you will have built a fully styled navigation bar, card grid, page header with hero, and the About page - all using Flexbox.\n\n## What to do\n\n1. Create flexbox.html with a nine-item flex container. Demonstrate every justify-content value with eight items: flex-start, flex-end, center, space-between, space-around, space-evenly\n2. Demonstrate every align-items value: stretch, flex-start, flex-end, center, baseline - make baseline visible by giving items different font sizes\n3. Demonstrate align-content on a wrapped container with fifteen items (requires flex-wrap: wrap): flex-start, flex-end, center, space-between, space-around, stretch\n4. Demonstrate flex-direction: row, row-reverse, column, column-reverse on separate containers\n",
      },
      {
        id: 'css-day-02-t-2',
        sequenceOrder: 2,
        title: 'Every Item Property',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**CSS · Day 2: CSS Flexbox - Every Property, Real Layouts** · Task 2 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a fully styled navigation bar, card grid, page header with hero, and the About page - all using Flexbox.\n\n## What to do\n\n1. Create a five-item flex row. Set flex-grow: 0 1 2 1 0 and take a screenshot showing how remaining space distributes\n2. Show flex-shrink: create a row where total item widths exceed the container. Set different shrink values and explain how each item reduces\n3. Show flex-basis: 0, auto, 200px, 33.333% - explain the difference between flex-basis and width\n4. Show the order property: reorder items 5,1,3,2,4 using CSS order without changing HTML\n5. Show align-self: override the container's align-items on one specific item\n",
      },
      {
        id: 'css-day-02-t-3',
        sequenceOrder: 3,
        title: 'Navigation Bar',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**CSS · Day 2: CSS Flexbox - Every Property, Real Layouts** · Task 3 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a fully styled navigation bar, card grid, page header with hero, and the About page - all using Flexbox.\n\n## What to do\n\n1. Build a sticky navigation bar: logo on the left, navigation links centred (using flex: 1 and justify-content: center on a nav element), and Login/Sign Up buttons on the right\n2. Add gap for consistent spacing between nav items. Add hover and focus-visible styles.\n3. At 768px screen width, hide the nav links (set display: none). Leave a hamburger placeholder button visible (no JavaScript yet).\n4. The bar must stay visible on scroll: position: sticky, top: 0, z-index: 100. Add a subtle box-shadow when sticky.\n",
      },
      {
        id: 'css-day-02-t-4',
        sequenceOrder: 4,
        title: 'Card Component System',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**CSS · Day 2: CSS Flexbox - Every Property, Real Layouts** · Task 4 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a fully styled navigation bar, card grid, page header with hero, and the About page - all using Flexbox.\n\n## What to do\n\n1. Build a card component: image on top, content area (title h3, description, tags, footer with price and button) - the footer must always align to the bottom regardless of content length using flex-direction: column and margin-top: auto on the footer\n2. Build a horizontal card variant: image on the left (fixed 160px wide), content on the right - switch layout using a media query at 600px\n3. Build a six-card grid using a flex container with flex-wrap: wrap and flex: 1 1 calc(33.333% - 2rem) - three columns on desktop, two on tablet (700px), one on mobile (480px)\n",
      },
      {
        id: 'css-day-02-t-5',
        sequenceOrder: 5,
        title: 'Holy Grail Layout',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**CSS · Day 2: CSS Flexbox - Every Property, Real Layouts** · Task 5 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a fully styled navigation bar, card grid, page header with hero, and the About page - all using Flexbox.\n\n## What to do\n\n1. Build the classic Holy Grail: full-width header, three-column middle (fixed-width left sidebar, flexible main content, fixed-width right aside), full-width footer - using only Flexbox, no Grid\n2. Main content must grow to fill all remaining space. Sidebars must have fixed width.\n3. Below 600px: stack all three columns with main content first (use order property)\n4. Add min-height: 100vh on the outer wrapper so the footer is always pushed to the bottom\n",
      },
      {
        id: 'css-day-02-t-6',
        sequenceOrder: 6,
        title: 'Style Checkout Form with Flexbox',
        isStretchGoal: false,
        estimatedMinutes: 55,
        instructionsMarkdown:
          "**CSS · Day 2: CSS Flexbox - Every Property, Real Layouts** · Task 6 of 8 · about 55 min\n\n## Today's goal\nBy the end of the day you will have built a fully styled navigation bar, card grid, page header with hero, and the About page - all using Flexbox.\n\n## What to do\n\n1. Take your checkout form from Wednesday and style it using Flexbox\n2. Two-column layout on desktop: label left (fixed 180px), input right (fills remaining width)\n3. On mobile (below 600px): stack label above input\n4. Paired fields (e.g. first name + last name, expiry month + year) side by side using a flex row with gap\n5. Submit and cancel buttons right-aligned using a flex row with justify-content: flex-end\n6. Style focus states, error states (red border + error message below), and the submit button hover state\n",
      },
      {
        id: 'css-day-02-t-7',
        sequenceOrder: 7,
        title: 'Apply Flexbox to Week 1 Blog Page',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**CSS · Day 2: CSS Flexbox - Every Property, Real Layouts** · Task 7 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a fully styled navigation bar, card grid, page header with hero, and the About page - all using Flexbox.\n\n## What to do\n\n1. Style blog.html from Week 1 completely using Flexbox for all layout\n2. Sticky header using Flexbox. Sidebar + main content as a Flexbox row. Each article card using internal Flexbox for layout.\n3. Responsive: single column below 768px using media query\n4. Add hover effects on article cards: lift with box-shadow transition\n",
      },
      {
        id: 'css-day-02-t-8',
        sequenceOrder: 8,
        title: 'Style About Page Footer Component',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**CSS · Day 2: CSS Flexbox - Every Property, Real Layouts** · Task 8 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a fully styled navigation bar, card grid, page header with hero, and the About page - all using Flexbox.\n\n## What to do\n\n1. Style the About page from Week 1\n2. Build a rich four-column footer: brand column (logo text + tagline + social icons as circular icon buttons), and three navigation columns. Use Flexbox for the four-column layout with flex-wrap: wrap.\n3. On tablet (below 900px): two columns. On mobile (below 600px): one column.\n4. Bottom bar: copyright left, legal links right - justify-content: space-between\n",
      },
      {
        id: 'css-day-02-t-9',
        sequenceOrder: 9,
        title: 'Build a full e-commerce product listing page using only Flexbox for all layouts',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**CSS · Day 2: CSS Flexbox - Every Property, Real Layouts** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nBuild a full e-commerce product listing page using only Flexbox for all layouts. Include: sticky header with search bar as a flex row, a filter sidebar at fixed 260px, a product grid that goes from four to two to one column at two breakpoints, each product card with image, badges (sale/new using position: absolute), title, star rating row, price, and add-to-cart button. Cart icon badge with a counter.\n',
      },
    ],
  },
  {
    dayId: 'css-day-03',
    dayNumber: 3,
    courseTitle: 'CSS',
    tasks: [
      {
        id: 'css-day-03-t-1',
        sequenceOrder: 1,
        title: 'Grid Sizing Methods - All Seven',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**CSS · Day 3: CSS Grid - Every Property, Complex Layouts** · Task 1 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a dashboard layout, a magazine-style content page, and the Services page fully styled with Grid.\n\n## What to do\n\n1. Create grid.html with seven grid containers, each demonstrating a different column sizing method: fixed px, percentage %, fr units, auto, minmax(200px, 1fr), repeat(3, 1fr), and repeat(auto-fill, minmax(200px, 1fr))\n2. Show the fr unit with different ratios (1fr 2fr 1fr) and verify the proportions in DevTools\n3. Demonstrate the implicit grid: add more children than your explicit tracks. Use grid-auto-rows: minmax(100px, auto) to size overflow rows.\n4. Show column-gap, row-gap, and the gap shorthand\n",
      },
      {
        id: 'css-day-03-t-2',
        sequenceOrder: 2,
        title: 'Line-Based Placement & Spanning',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**CSS · Day 3: CSS Grid - Every Property, Complex Layouts** · Task 2 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a dashboard layout, a magazine-style content page, and the Services page fully styled with Grid.\n\n## What to do\n\n1. Create a 4×4 explicit grid and place eight items manually using grid-column-start/end and grid-row-start/end\n2. Use the shorthand: grid-column: 1 / 3 and grid-row: 2 / 4 on separate items\n3. Use the span keyword: grid-column: span 2 on three items spanning different numbers\n4. Use negative line numbers: grid-column: 1 / -1 to make an item span the full row\n5. Demonstrate dense packing: grid-auto-flow: dense - show how it fills gaps compared to the default\n",
      },
      {
        id: 'css-day-03-t-3',
        sequenceOrder: 3,
        title: 'Named Grid Areas - Magazine Layout',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**CSS · Day 3: CSS Grid - Every Property, Complex Layouts** · Task 3 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a dashboard layout, a magazine-style content page, and the Services page fully styled with Grid.\n\n## What to do\n\n1. Create a full magazine layout using grid-template-areas with at least a 4-column, 5-row grid. Define areas: header, nav, hero, article1, article2, sidebar, ad, footer\n2. Place every section using grid-area: header; etc.\n3. Write a media query at 900px that redefines the areas to a two-column layout\n4. Write a media query at 600px that redefines to a single column with sections in reading order\n",
      },
      {
        id: 'css-day-03-t-4',
        sequenceOrder: 4,
        title: 'Responsive Grid Without Media Queries',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**CSS · Day 3: CSS Grid - Every Property, Complex Layouts** · Task 4 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a dashboard layout, a magazine-style content page, and the Services page fully styled with Grid.\n\n## What to do\n\n1. Create a product grid that responds fully without any @media query: grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr))\n2. Show the difference between auto-fill and auto-fit using a wide container: auto-fill leaves empty tracks, auto-fit does not\n3. Add a last-item spanning trick: the last item spans to the end using grid-column: auto / -1\n4. Add a featured item that spans 2 columns and 2 rows using grid-column: span 2 / grid-row: span 2 - verify it still works when the column count changes\n",
      },
      {
        id: 'css-day-03-t-5',
        sequenceOrder: 5,
        title: 'Admin Dashboard Layout',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**CSS · Day 3: CSS Grid - Every Property, Complex Layouts** · Task 5 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a dashboard layout, a magazine-style content page, and the Services page fully styled with Grid.\n\n## What to do\n\n1. Build a complete admin dashboard: full-width top header bar, left sidebar (fixed 240px), right main area divided into: a stats row (four equal cards using Grid), a large chart placeholder, and two smaller panels side by side\n2. Use named areas for the overall structure. Use nested grids for the stats row.\n3. The sidebar collapses to 60px icon-only width below 1024px. Full layout stacks to single column below 768px.\n4. Apply your colour system custom properties\n",
      },
      {
        id: 'css-day-03-t-6',
        sequenceOrder: 6,
        title: 'CSS Grid Calendar',
        isStretchGoal: false,
        estimatedMinutes: 55,
        instructionsMarkdown:
          "**CSS · Day 3: CSS Grid - Every Property, Complex Layouts** · Task 6 of 8 · about 55 min\n\n## Today's goal\nBy the end of the day you will have built a dashboard layout, a magazine-style content page, and the Services page fully styled with Grid.\n\n## What to do\n\n1. Build a month calendar using CSS Grid: seven equal columns (Mon–Sun). Rows auto-generate for each week.\n2. Place the first day of the month using grid-column based on its day of the week. Subsequent days flow naturally.\n3. Mark some dates as events (different background colour). Mark today's date with a circle using ::before\n4. Add a narrow Week column at the start: make the main grid 8 columns, add a header and week number in column 1, push day columns to 2–8\n5. Below 480px: display as a single-column day list\n",
      },
      {
        id: 'css-day-03-t-7',
        sequenceOrder: 7,
        title: 'Style Week 1 Services Page',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**CSS · Day 3: CSS Grid - Every Property, Complex Layouts** · Task 7 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a dashboard layout, a magazine-style content page, and the Services page fully styled with Grid.\n\n## What to do\n\n1. Apply full Grid styling to services.html\n2. Three-column service card grid using CSS Grid (not Flexbox)\n3. Pricing comparison table styled with a highlighted 'recommended' column\n4. Call-to-action section with a two-column Grid (text + form)\n5. Fully responsive at 768px (two columns) and 480px (one column)\n",
      },
      {
        id: 'css-day-03-t-8',
        sequenceOrder: 8,
        title: 'Combine Grid and Flexbox',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**CSS · Day 3: CSS Grid - Every Property, Complex Layouts** · Task 8 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a dashboard layout, a magazine-style content page, and the Services page fully styled with Grid.\n\n## What to do\n\n1. Build a portfolio project showcase section that uses Grid for the overall tile layout and Flexbox inside each tile for the image, tags, title, and description\n2. Featured project tiles span 2 columns and 2 rows using grid-column: span 2 and grid-row: span 2\n3. Non-featured tiles have an image-on-top layout (Flexbox column). Featured tiles have an image-on-left layout (Flexbox row).\n4. Add hover overlay content (project name + two links) using transform and transition on an overlay div\n",
      },
      {
        id: 'css-day-03-t-9',
        sequenceOrder: 9,
        title:
          'Recreate a newspaper homepage layout using CSS Grid: header spanning full width, a top…',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**CSS · Day 3: CSS Grid - Every Property, Complex Layouts** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nRecreate a newspaper homepage layout using CSS Grid: header spanning full width, a top navigation bar, a breaking news banner, then a main content grid with: one large feature story (spans 3 columns and 2 rows), two secondary stories beside it, a row of four small stories below (2×2), and a right aside column with trending stories and a newsletter signup. Use named areas throughout. Three responsive breakpoints.\n',
      },
    ],
  },
  {
    dayId: 'css-day-04',
    dayNumber: 4,
    courseTitle: 'CSS',
    tasks: [
      {
        id: 'css-day-04-t-1',
        sequenceOrder: 1,
        title: 'Mobile-First Responsive System',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**CSS · Day 4: Responsive Design, CSS Animations & Transitions** · Task 1 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a fully responsive website across three breakpoints, animated components, a dark mode system, and the Team page fully styled.\n\n## What to do\n\n1. Create responsive.html. Write all base styles for the narrowest screen first (320px). Add min-width breakpoints upward: 480px, 768px, 1024px, 1280px\n2. A navigation section: icon-only at 320px, text labels visible at 480px, horizontal at 768px, with a secondary nav visible at 1024px+\n3. A content grid: one column at 320px, two columns at 600px, three at 900px, four at 1280px - using the same container, only changing grid-template-columns\n4. Test every breakpoint in Chrome DevTools responsive mode\n",
      },
      {
        id: 'css-day-04-t-2',
        sequenceOrder: 2,
        title: 'Fluid Typography & Spacing with clamp()',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**CSS · Day 4: Responsive Design, CSS Animations & Transitions** · Task 2 of 8 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built a fully responsive website across three breakpoints, animated components, a dark mode system, and the Team page fully styled.\n\n## What to do\n\n1. Replace all fixed-size headings with clamp() values: h1: clamp(2.4rem, 5vw + 1rem, 5.6rem) - verify it scales smoothly by dragging the browser window\n2. Create a complete fluid type scale for h1–h6 and body using clamp() - minimum, preferred, and maximum values for each\n3. Use clamp() for fluid padding and gap spacing: padding: clamp(1rem, 3vw, 3rem)\n4. Use a container query: @container (min-width: 500px) to change a card layout based on its container, not the viewport\n",
      },
      {
        id: 'css-day-04-t-3',
        sequenceOrder: 3,
        title: 'Transitions - Every Timing Function',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**CSS · Day 4: Responsive Design, CSS Animations & Transitions** · Task 3 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a fully responsive website across three breakpoints, animated components, a dark mode system, and the Team page fully styled.\n\n## What to do\n\n1. Create transitions.html and demonstrate all five timing functions on identical boxes: linear, ease, ease-in, ease-out, ease-in-out - record the visual difference\n2. Use the DevTools transition editor to find a bouncy cubic-bezier value. Apply it to a button hover effect.\n3. Build a staggered sequence: when hovering a card, the title transitions first, then the description 50ms later, then the button 100ms later - using transition-delay\n4. Add a transition on outline for focus states - the ring should animate in, not snap. Never remove the focus ring, only style it.\n",
      },
      {
        id: 'css-day-04-t-4',
        sequenceOrder: 4,
        title: 'CSS Keyframe Animations',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**CSS · Day 4: Responsive Design, CSS Animations & Transitions** · Task 4 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a fully responsive website across three breakpoints, animated components, a dark mode system, and the Team page fully styled.\n\n## What to do\n\n1. Create a CSS spinner loading animation using @keyframes rotate and animation: rotate 1s linear infinite\n2. Create a skeleton loading animation: a shimmer effect using a moving linear-gradient background and animation-direction: alternate\n3. Create a card entry animation: the card slides up 20px and fades in when it gains the class=visible (add the class manually in DevTools to test)\n4. Create a notification bell shake animation triggered by :hover\n5. Wrap ALL animations in @media (prefers-reduced-motion: no-preference) - they must be completely off by default\n",
      },
      {
        id: 'css-day-04-t-5',
        sequenceOrder: 5,
        title: 'Style Team Page - Responsive Card Grid',
        isStretchGoal: false,
        estimatedMinutes: 55,
        instructionsMarkdown:
          "**CSS · Day 4: Responsive Design, CSS Animations & Transitions** · Task 5 of 8 · about 55 min\n\n## Today's goal\nBy the end of the day you will have built a fully responsive website across three breakpoints, animated components, a dark mode system, and the Team page fully styled.\n\n## What to do\n\n1. Style team.html completely: circular profile images (border-radius: 50%), name as h3, role and bio as p elements, social icon links as a flex row\n2. CSS Grid for the card layout: four columns at desktop, two at tablet (768px), one at mobile (480px)\n3. Card hover effect: card lifts with box-shadow transition and social icons fade in from opacity: 0 to 1\n4. Department filter row: a Flexbox row of filter tags - use the :target selector on the department sections to show/hide them when a filter link is clicked\n",
      },
      {
        id: 'css-day-04-t-6',
        sequenceOrder: 6,
        title: 'CSS-Only Interactive Components',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**CSS · Day 4: Responsive Design, CSS Animations & Transitions** · Task 6 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a fully responsive website across three breakpoints, animated components, a dark mode system, and the Team page fully styled.\n\n## What to do\n\n1. Build a CSS-only accordion: a hidden checkbox input, a label (the visible header), and a content div. When the checkbox :checked, the content expands using max-height transition.\n2. Build a CSS-only tabs component using radio inputs: clicking a tab (label) changes which panel is visible using the :checked + adjacent sibling selector\n3. Build a star rating component: five reversed radio inputs. Selecting a star fills that star and all previous ones using the ~ (general sibling) selector and Unicode star characters in ::before\n4. None of these components use any JavaScript\n",
      },
      {
        id: 'css-day-04-t-7',
        sequenceOrder: 7,
        title: 'Dark Mode with prefers-color-scheme',
        isStretchGoal: false,
        estimatedMinutes: 50,
        instructionsMarkdown:
          "**CSS · Day 4: Responsive Design, CSS Animations & Transitions** · Task 7 of 8 · about 50 min\n\n## Today's goal\nBy the end of the day you will have built a fully responsive website across three breakpoints, animated components, a dark mode system, and the Team page fully styled.\n\n## What to do\n\n1. Add a complete dark mode to your Week 1 home page using @media (prefers-color-scheme: dark) - override the colour custom properties defined in :root\n2. Every element must be readable and visually distinct in both modes - no invisible borders, no unreadable text contrast\n3. Add a manual toggle button: a checkbox that adds data-theme='dark' to the html element (write the CSS selector html[data-theme='dark'] to override the system preference)\n4. Force the dark mode query in Chrome DevTools (Rendering tab) and verify every page element\n",
      },
      {
        id: 'css-day-04-t-8',
        sequenceOrder: 8,
        title: 'Print Stylesheet',
        isStretchGoal: false,
        estimatedMinutes: 45,
        instructionsMarkdown:
          "**CSS · Day 4: Responsive Design, CSS Animations & Transitions** · Task 8 of 8 · about 45 min\n\n## Today's goal\nBy the end of the day you will have built a fully responsive website across three breakpoints, animated components, a dark mode system, and the Team page fully styled.\n\n## What to do\n\n1. Create print.css linked with media='print'\n2. Hide navigation, sidebars, buttons, ads, animations, and interactive elements\n3. Expand all collapsed accordion panels and show all tab panels\n4. Add content: ' (' attr(href) ')' using ::after on all external links so URLs are visible in print\n5. Use page-break-avoid on headings to prevent orphaned headers at the bottom of a page\n6. Test by printing the Services page to PDF - it should be clean and readable\n",
      },
      {
        id: 'css-day-04-t-9',
        sequenceOrder: 9,
        title:
          'Build a fully animated, responsive landing page for a fictional SaaS product using only…',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**CSS · Day 4: Responsive Design, CSS Animations & Transitions** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nBuild a fully animated, responsive landing page for a fictional SaaS product using only HTML and CSS. Include: animated gradient hero, features section with intersection-observer-style animations using :has() or :target hacks, pricing toggle (monthly/annual using checkbox), testimonial carousel using radio inputs, full dark mode, and a CSS-only hamburger menu that opens a slide-in drawer. Responsive at three breakpoints.\n',
      },
    ],
  },
  {
    dayId: 'css-day-05',
    dayNumber: 5,
    courseTitle: 'CSS',
    tasks: [
      {
        id: 'css-day-05-t-1',
        sequenceOrder: 1,
        title: 'CSS Architecture Setup',
        isStretchGoal: false,
        estimatedMinutes: 30,
        instructionsMarkdown:
          "**CSS · Day 5: Week 2 Project - Style the Complete Five-Page Website** · Task 1 of 6 · about 30 min\n\n## Today's goal\nBy the end of the day you will have built all five pages from Week 1 are fully styled, responsive at three breakpoints, consistent, and deployed as an updated GitHub Pages site.\n\n## What to do\n\n1. Create a /css folder structure: base.css (reset, variables, typography), layout.css (header, footer, grid structure), components.css (cards, buttons, forms, badges), pages.css (page-specific rules), and main.css that imports all four using @import\n2. Add a global CSS reset: *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n3. Move your design system custom properties and type scale into base.css\n4. Commit: 'style: set up CSS architecture and design tokens'\n",
      },
      {
        id: 'css-day-05-t-2',
        sequenceOrder: 2,
        title: 'Style Home + About Pages',
        isStretchGoal: false,
        estimatedMinutes: 80,
        instructionsMarkdown:
          "**CSS · Day 5: Week 2 Project - Style the Complete Five-Page Website** · Task 2 of 6 · about 80 min\n\n## Today's goal\nBy the end of the day you will have built all five pages from Week 1 are fully styled, responsive at three breakpoints, consistent, and deployed as an updated GitHub Pages site.\n\n## What to do\n\n1. Home: header with sticky nav, full-viewport hero with gradient overlay, three-column features grid (Grid), testimonials row (Flexbox), styled footer\n2. About: timeline section using dl styled as a vertical timeline, mission quote styled as a large pull-quote, values cards using Grid\n3. Both: responsive at 768px and 480px. Lighthouse Performance 70+. Accessibility 90+.\n4. Commit each page as you complete it\n",
      },
      {
        id: 'css-day-05-t-3',
        sequenceOrder: 3,
        title: 'Style Services Page',
        isStretchGoal: false,
        estimatedMinutes: 70,
        instructionsMarkdown:
          "**CSS · Day 5: Week 2 Project - Style the Complete Five-Page Website** · Task 3 of 6 · about 70 min\n\n## Today's goal\nBy the end of the day you will have built all five pages from Week 1 are fully styled, responsive at three breakpoints, consistent, and deployed as an updated GitHub Pages site.\n\n## What to do\n\n1. Service cards grid with hover lift effect and colour accent on hover\n2. Pricing comparison table: zebra-striped rows, sticky header row, highlighted recommended column\n3. Call-to-action section with an accent background\n4. Responsive: cards stack at 768px. Fully mobile-friendly.\n",
      },
      {
        id: 'css-day-05-t-4',
        sequenceOrder: 4,
        title: 'Style Team + Contact Pages',
        isStretchGoal: false,
        estimatedMinutes: 75,
        instructionsMarkdown:
          "**CSS · Day 5: Week 2 Project - Style the Complete Five-Page Website** · Task 4 of 6 · about 75 min\n\n## Today's goal\nBy the end of the day you will have built all five pages from Week 1 are fully styled, responsive at three breakpoints, consistent, and deployed as an updated GitHub Pages site.\n\n## What to do\n\n1. Team: profile card grid with hover effect, department filter bar, responsive grid\n2. Contact: floating label animation on all inputs, custom styled checkbox and select (appearance: none), map embed styled in a rounded container, error and success states for form fields\n3. Both: 90+ Lighthouse Accessibility. Responsive.\n",
      },
      {
        id: 'css-day-05-t-5',
        sequenceOrder: 5,
        title: 'Global Polish & Consistency Pass',
        isStretchGoal: false,
        estimatedMinutes: 55,
        instructionsMarkdown:
          "**CSS · Day 5: Week 2 Project - Style the Complete Five-Page Website** · Task 5 of 6 · about 55 min\n\n## Today's goal\nBy the end of the day you will have built all five pages from Week 1 are fully styled, responsive at three breakpoints, consistent, and deployed as an updated GitHub Pages site.\n\n## What to do\n\n1. Review all five pages: button styles consistent, card styles consistent, heading hierarchy styles consistent, navigation active state consistent\n2. Every interactive element (links, buttons, inputs) must have :hover AND :focus-visible styles\n3. Add a page-entry fade animation to the main element on all pages (wrapped in prefers-reduced-motion)\n4. Check all pages in Firefox and Chrome - fix any differences in rendering\n",
      },
      {
        id: 'css-day-05-t-6',
        sequenceOrder: 6,
        title: 'Audit, Fix & Deploy',
        isStretchGoal: false,
        estimatedMinutes: 40,
        instructionsMarkdown:
          "**CSS · Day 5: Week 2 Project - Style the Complete Five-Page Website** · Task 6 of 6 · about 40 min\n\n## Today's goal\nBy the end of the day you will have built all five pages from Week 1 are fully styled, responsive at three breakpoints, consistent, and deployed as an updated GitHub Pages site.\n\n## What to do\n\n1. Run Lighthouse on all five pages: target Performance 70+, Accessibility 90+, Best Practices 90+\n2. Fix the top three issues on each page\n3. Run Stylelint - fix all errors\n4. Check colour contrast using the WebAIM checker - all text must meet WCAG AA\n5. Push all changes. Confirm GitHub Pages deployment is live and correct.\n6. Final commit: 'project: week 2 CSS complete - all five pages styled and responsive'\n",
      },
      {
        id: 'css-day-05-t-7',
        sequenceOrder: 7,
        title: 'Add a fully animated mobile navigation drawer using only CSS',
        isStretchGoal: true,
        estimatedMinutes: null,
        instructionsMarkdown:
          '**CSS · Day 5: Week 2 Project - Style the Complete Five-Page Website** · Daily challenge (stretch goal)\n\n> Attempt this only when every main task for today is finished. Never skip a main task for it.\n\n## Challenge\nAdd a fully animated mobile navigation drawer using only CSS. The drawer slides in from the left using transform: translateX(-100%) toggled by a checkbox, with a semi-transparent overlay using ::before on the body. Smooth open/close transitions. A close button inside the drawer. The hamburger icon animates into an X using transitions on three span elements. Focus management markers added (for JavaScript next week).\n',
      },
    ],
  },
];
