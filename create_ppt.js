const pptxgen = require('pptxgenjs');

let pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';

// Define master slide for consistent styling
pptx.defineSlideMaster({
  title: 'MASTER_SLIDE',
  background: { color: '1C1C1C' },
  objects: [
    { rect: { x: 0, y: 0, w: '100%', h: 0.7, fill: { color: 'FFC000' } } },
    { text: { text: 'ChalChitra - Project Evaluation', options: { x: 0.2, y: 0.1, w: 6, h: 0.5, color: '1C1C1C', fontSize: 20, bold: true } } }
  ]
});

// SLIDE 1: Title
let slide1 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide1.addText('ChalChitra', { x: 0.5, y: 1.5, w: 9, fontSize: 44, bold: true, color: 'FFC000', align: 'center' });
slide1.addText('A Modern Movie & Trailer Platform', { x: 0.5, y: 2.3, w: 9, fontSize: 24, color: 'FFFFFF', align: 'center' });
slide1.addText('Team Members:\n[Name 1] - [Roll 1]\n[Name 2] - [Roll 2]', { x: 0.5, y: 3.2, w: 9, fontSize: 18, color: 'CCCCCC', align: 'center' });
slide1.addText('Technologies: HTML5, CSS3, Vanilla JS, JSON Server, Axios', { x: 0.5, y: 4.5, w: 9, fontSize: 16, color: 'FFC000', align: 'center', italic: true });

// SLIDE 2: About
let slide2 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide2.addText('About the Project', { x: 0.5, y: 0.8, w: 9, fontSize: 32, bold: true, color: 'FFC000' });
slide2.addText([
  { text: 'Introduction: ', options: { bold: true, color: 'FFFFFF' } },
  { text: 'ChalChitra is a dynamic web application for browsing movies, trailers, and web series.\n\n', options: { color: 'CCCCCC' } },
  { text: 'Problem Statement: ', options: { bold: true, color: 'FFFFFF' } },
  { text: 'Users need a centralized platform to explore localized entertainment content seamlessly.\n\n', options: { color: 'CCCCCC' } },
  { text: 'Objective: ', options: { bold: true, color: 'FFFFFF' } },
  { text: 'To build a responsive, multi-lingual interface separating DOM logic from API services.\n\n', options: { color: 'CCCCCC' } },
  { text: 'Key Features: ', options: { bold: true, color: 'FFFFFF' } },
  { text: 'Multi-lingual (EN, HI, TE), Watchlists, YouTube Trailer Embeds, Admin CRUD Panel.', options: { color: 'CCCCCC' } }
], { x: 0.5, y: 1.5, w: 9, h: 3.5, fontSize: 18, bullet: true });

// SLIDE 3: Flow & Diagrams
let slide3 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide3.addText('Project Flow & Architecture', { x: 0.5, y: 0.8, w: 9, fontSize: 32, bold: true, color: 'FFC000' });
slide3.addText('1. Frontend UI (HTML/CSS)', { x: 1, y: 2, w: 2.5, h: 1, color: 'FFFFFF', fill: { color: '333333' }, align: 'center', fontSize: 16 });
slide3.addText('?', { x: 3.7, y: 2, w: 1, h: 1, color: 'FFC000', align: 'center', fontSize: 24, bold: true });
slide3.addText('2. Service Layer (JS/Axios)', { x: 4.9, y: 2, w: 2.5, h: 1, color: 'FFFFFF', fill: { color: '333333' }, align: 'center', fontSize: 16 });
slide3.addText('?', { x: 7.6, y: 2, w: 1, h: 1, color: 'FFC000', align: 'center', fontSize: 24, bold: true });
slide3.addText('3. JSON Server (db.json)', { x: 8.8, y: 2, w: 2, h: 1, color: 'FFFFFF', fill: { color: '333333' }, align: 'center', fontSize: 16 });
slide3.addText('Data Flow (DFD):\nUser actions trigger DOM events -> Services make REST API calls (GET/POST) -> JSON Server updates db.json -> UI re-renders synchronously.', { x: 0.5, y: 3.5, w: 9, fontSize: 18, color: 'CCCCCC' });

// SLIDE 4: Modules
let slide4 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide4.addText('Modules & Features', { x: 0.5, y: 0.8, w: 9, fontSize: 32, bold: true, color: 'FFC000' });
slide4.addText([
  { text: 'User Module:\n', options: { bold: true, color: 'FFFFFF' } },
  { text: 'Browse movies, filter by genre, add to favorites/watchlist, toggle languages (EN/HI/TE).\n\n', options: { color: 'CCCCCC' } },
  { text: 'Admin Module:\n', options: { bold: true, color: 'FFFFFF' } },
  { text: 'Secure login, add new movies, edit existing movie details, and delete records.\n\n', options: { color: 'CCCCCC' } },
  { text: 'Services & Exception Module:\n', options: { bold: true, color: 'FFFFFF' } },
  { text: 'API calls isolated in movieService.js. Network errors gracefully caught in apiException.js.', options: { color: 'CCCCCC' } }
], { x: 0.5, y: 1.6, w: 9, fontSize: 18, bullet: true });

// SLIDE 5: Code
let slide5 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide5.addText('Key Code Logic (Exception Handling)', { x: 0.5, y: 0.8, w: 9, fontSize: 32, bold: true, color: 'FFC000' });
slide5.addText(`// exception/apiException.js\nfunction handleApiError(error, defaultMessage = "Error") {\n    let message = defaultMessage;\n    if (error.response && error.response.data && error.response.data.message) {\n        message = error.response.data.message;\n    } else if (error.message) {\n        message = error.message;\n    }\n    alert("Error: " + message);\n    throw new ApiException(message, error.response?.status, error);\n}`, { x: 0.5, y: 1.5, w: 9, h: 3.2, fill: { color: '2D2D2D' }, fontFace: 'Courier New', fontSize: 14, color: 'A9B7C6' });
slide5.addText('Highlights our custom error interception mechanism for robust API calls.', { x: 0.5, y: 4.9, w: 9, fontSize: 16, color: 'FFC000', italic: true });

// SLIDE 6: Output Screenshots
let slide6 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide6.addText('Application Output', { x: 0.5, y: 0.8, w: 9, fontSize: 32, bold: true, color: 'FFC000' });
slide6.addText('[ Please Paste Home Page Screenshot Here ]', { x: 0.5, y: 1.5, w: 4.2, h: 3, fill: { color: '333333' }, align: 'center', color: 'AAAAAA' });
slide6.addText('[ Please Paste Admin Panel Screenshot Here ]', { x: 5.3, y: 1.5, w: 4.2, h: 3, fill: { color: '333333' }, align: 'center', color: 'AAAAAA' });

// SLIDE 7: Challenges & Learning
let slide7 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide7.addText('Challenges & Learnings', { x: 0.5, y: 0.8, w: 9, fontSize: 32, bold: true, color: 'FFC000' });
slide7.addText([
  { text: 'Challenge: ', options: { bold: true, color: 'FFFFFF' } },
  { text: 'Cross-Origin Resource Sharing (CORS) blocked ES Modules natively over file:/// protocols.\n', options: { color: 'CCCCCC' } },
  { text: 'Solution: ', options: { bold: true, color: 'FFC000' } },
  { text: 'Refactored to load decoupled scripts sequentially, keeping separation of concerns without module blocking.\n\n', options: { color: 'CCCCCC' } },
  { text: 'Challenge: ', options: { bold: true, color: 'FFFFFF' } },
  { text: 'Managing global variables and state (like currentUser) without a framework.\n', options: { color: 'CCCCCC' } },
  { text: 'Learning: ', options: { bold: true, color: 'FFC000' } },
  { text: 'Gained deep knowledge of DOM manipulation, asynchronous JS (async/await), and HTTP concepts.', options: { color: 'CCCCCC' } }
], { x: 0.5, y: 1.6, w: 9, fontSize: 18, bullet: true });

// SLIDE 8: Q&A
let slide8 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide8.addText('Thank You!', { x: 0.5, y: 2, w: 9, fontSize: 54, bold: true, color: 'FFC000', align: 'center' });
slide8.addText('Any Questions?', { x: 0.5, y: 3, w: 9, fontSize: 28, color: 'FFFFFF', align: 'center' });
slide8.addText('We are ready to showcase the live project and codebase.', { x: 0.5, y: 4, w: 9, fontSize: 16, color: 'CCCCCC', align: 'center', italic: true });

pptx.writeFile({ fileName: 'ChalChitra_Project_Evaluation.pptx' }).then(fileName => {
    console.log(`created file: ${fileName}`);
});
