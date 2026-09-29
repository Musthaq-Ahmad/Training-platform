import type { ContentTopic } from '../../../types';

export const mdnCanvasTutorialTopics = {
  'mdn-canvas-tutorial': {
    id: 'mdn-canvas-tutorial',
    heading: 'The <canvas> element',
    blocks: [
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="canvas" width="150" height="150"></canvas>',
        },
      },
      {
        type: 'paragraph',
        text: "At first sight a <canvas> looks like the <img> element, with the only clear difference being that it doesn't have the src and alt attributes. Indeed, the <canvas> element has only two attributes, width and height. These are both optional and can also be set using DOM properties. When no width and height attributes are specified, the canvas will initially be 300 pixels wide and 150 pixels high. The element can be sized arbitrarily by CSS, but during rendering the image is scaled to fit its layout size: if the CSS sizing doesn't respect the ratio of the initial canvas, it will appear distorted.",
      },
      {
        type: 'paragraph',
        text: 'Note: If your renderings seem distorted, try specifying your width and height attributes explicitly in the <canvas> attributes, and not using CSS.',
      },
      {
        type: 'paragraph',
        text: "The id attribute isn't specific to the <canvas> element but is one of the global HTML attributes which can be applied to any HTML element (like class for instance). It is always a good idea to supply an id because this makes it much easier to identify it in a script.",
      },
      {
        type: 'paragraph',
        text: "The <canvas> element can be styled just like any normal image (margin, border, background…). These rules, however, don't affect the actual drawing on the canvas. We'll see how this is done in a dedicated chapter of this tutorial. When no styling rules are applied to the canvas it will initially be fully transparent.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Accessible content',
      },
      {
        type: 'paragraph',
        text: "The <canvas> element, like the <img>, <video>, <audio>, and <picture> elements, must be made accessible by providing fallback text to be displayed when the media doesn't load or the user is unable to experience it as intended. You should always provide fallback content, captions, and alternative text, as appropriate for the media type.",
      },
      {
        type: 'paragraph',
        text: "Providing fallback content is very straightforward: just insert the alternate content inside the <canvas> element to be accessed by screen readers, spiders, and other automated bots. Browsers, by default, will ignore the content inside the container, rendering the canvas normally unless <canvas> isn't supported.",
      },
      {
        type: 'paragraph',
        text: 'For example, we could provide a text description of the canvas content or provide a static image of the dynamically rendered content. This can look something like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="stockGraph" width="150" height="150">\n  current stock price: $3.15 + 0.15\n</canvas>\n\n<canvas id="clock" width="150" height="150">\n  <img src="images/clock.png" width="150" height="150" alt="A clock" />\n</canvas>',
        },
      },
      {
        type: 'paragraph',
        text: "Telling the user to use a different browser that supports canvas does not help users who can't read the canvas at all. Providing useful fallback text or sub DOM adds accessibility to an otherwise non-accessible element.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Required &lt;/canvas&gt; tag',
      },
      {
        type: 'paragraph',
        text: "As a consequence of the way fallback is provided, unlike the <img> element, the <canvas> element requires the closing tag (&lt;/canvas&gt;). If this tag is not present, the rest of the document would be considered the fallback content and wouldn't be displayed.",
      },
      {
        type: 'paragraph',
        text: 'If fallback content is not needed, a simple &lt;canvas id="foo" role="presentation" …&gt;&lt;/canvas&gt; is fully compatible with all browsers that support canvas at all. This should only be used if the canvas is purely presentational.',
      },
      {
        type: 'paragraph',
        text: 'The <canvas> element creates a fixed-size drawing surface that exposes one or more rendering contexts, which are used to create and manipulate the content shown. In this tutorial, we focus on the 2D rendering context. Other contexts may provide different types of rendering; for example, WebGL uses a 3D context based on OpenGL ES.',
      },
      {
        type: 'paragraph',
        text: 'The canvas is initially blank. To display something, a script first needs to access the rendering context and draw on it. The <canvas> element has a method called getContext(), used to obtain the rendering context and its drawing functions. getContext() takes one parameter, the type of context. For 2D graphics, such as those covered by this tutorial, you specify "2d" to get a CanvasRenderingContext2D.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const canvas = document.getElementById("canvas");\nconst ctx = canvas.getContext("2d");',
        },
      },
      {
        type: 'paragraph',
        text: 'The first line in the script retrieves the node in the DOM representing the <canvas> element by calling the document.getElementById() method. Once you have the element node, you can access the drawing context using its getContext() method.',
      },
      {
        type: 'paragraph',
        text: 'The fallback content is displayed in browsers which do not support <canvas>. Scripts can also check for support programmatically by testing for the presence of the getContext() method. Our code snippet from above becomes something like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const canvas = document.getElementById("canvas");\n\nif (canvas.getContext) {\n  const ctx = canvas.getContext("2d");\n  // drawing code here\n} else {\n  // canvas-unsupported code here\n}',
        },
      },
      {
        type: 'paragraph',
        text: "Here is a minimalistic template, which we'll be using as a starting point for later examples.",
      },
      {
        type: 'paragraph',
        text: 'Note: It is not good practice to embed a script inside HTML. We do it here to keep the example concise.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<!doctype html>\n<html lang="en-US">\n  <head>\n    <meta charset="utf-8" />\n    <title>Canvas tutorial</title>\n    <style>\n      canvas {\n        border: 1px solid black;\n      }\n    </style>\n  </head>\n  <body>\n    <canvas id="canvas" width="150" height="150"></canvas>\n    <script>\n      function draw() {\n        const canvas = document.getElementById("canvas");\n        const ctx = canvas.getContext("2d");\n      }\n      draw();\n    </script>\n  </body>\n</html>',
        },
      },
      {
        type: 'paragraph',
        text: 'The script includes a function called draw(), which is executed once the page finishes loading; this is done by putting the script after the main body content. This function, or one like it, could also be called using setTimeout(), setInterval(), or the load event handler, as long as the page has been loaded first.',
      },
      {
        type: 'paragraph',
        text: 'At this point, this document should be rendered blank.',
      },
      {
        type: 'paragraph',
        text: "To begin, let's take a look at an example that draws two intersecting rectangles, one of which has alpha transparency. We'll explore how this works in more detail in later examples. Update your script element content to this:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'canvas {\n  border: 1px solid black;\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const canvas = document.getElementById("my-canvas");\n  const ctx = canvas.getContext("2d");\n\n  ctx.fillStyle = "rgb(200 0 0)";\n  ctx.fillRect(10, 10, 50, 50);\n\n  ctx.fillStyle = "rgb(0 0 200 / 50%)";\n  ctx.fillRect(30, 30, 50, 50);\n}\ndraw();',
        },
      },
      {
        type: 'paragraph',
        text: 'This example looks like this:',
      },
      {
        type: 'list',
        ordered: false,
        items: ['Previous', 'Next'],
      },
      {
        type: 'paragraph',
        text: 'Before we can start drawing, we need to talk about the canvas grid or coordinate space. Our HTML skeleton from the previous page had a canvas element 150 pixels wide and 150 pixels high.',
      },
      {
        type: 'image',
        src: '/src/content/assets/js/canvas_default_grid.png',
        alt: 'Canvas grid with a blue square demonstrating coordinates and axes.',
      },
      {
        type: 'paragraph',
        text: "Normally 1 unit in the grid corresponds to 1 pixel on the canvas. The origin of this grid is positioned in the top left corner at coordinate (0,0). All elements are placed relative to this origin. So the position of the top left corner of the blue square becomes x pixels from the left and y pixels from the top, at coordinate (x,y). Later in this tutorial we'll see how we can translate the origin to a different position, rotate the grid and even scale it, but for now we'll stick to the default.",
      },
      {
        type: 'paragraph',
        text: 'Unlike SVG, <canvas> only supports two primitive shapes: rectangles and paths (lists of points connected by lines). All other shapes must be created by combining one or more paths. Luckily, we have an assortment of path drawing functions which make it possible to compose very complex shapes.',
      },
      {
        type: 'paragraph',
        text: "First let's look at the rectangle. There are three functions that draw rectangles on the canvas:",
      },
      {
        type: 'paragraph',
        text: 'fillRect(x, y, width, height)',
      },
      {
        type: 'paragraph',
        text: 'Draws a filled rectangle.',
      },
      {
        type: 'paragraph',
        text: 'strokeRect(x, y, width, height)',
      },
      {
        type: 'paragraph',
        text: 'Draws a rectangular outline.',
      },
      {
        type: 'paragraph',
        text: 'clearRect(x, y, width, height)',
      },
      {
        type: 'paragraph',
        text: 'Clears the specified rectangular area, making it fully transparent.',
      },
      {
        type: 'paragraph',
        text: "Each of these three functions takes the same parameters. x and y specify the position on the canvas (relative to the origin) of the top-left corner of the rectangle. width and height provide the rectangle's size.",
      },
      {
        type: 'paragraph',
        text: 'Below is the draw() function from the previous page, but now it is making use of these three functions.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Rectangular shape example',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const canvas = document.getElementById("my-canvas");\n  const ctx = canvas.getContext("2d");\n\n  ctx.fillRect(25, 25, 100, 100);\n  ctx.clearRect(45, 45, 60, 60);\n  ctx.strokeRect(50, 50, 50, 50);\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'paragraph',
        text: "This example's output is shown below.",
      },
      {
        type: 'paragraph',
        text: "The fillRect() function draws a large black square 100 pixels on each side. The clearRect() function then erases a 60x60 pixel square from the center, and then strokeRect() is called to create a rectangular outline 50x50 pixels within the cleared square (conceptually 50x50; in reality it's 52x52, as the next section will explain).",
      },
      {
        type: 'paragraph',
        text: "In upcoming pages we'll see two alternative methods for clearRect(), and we'll also see how to change the color and stroke style of the rendered shapes.",
      },
      {
        type: 'paragraph',
        text: "Unlike the path functions we'll see in the next section, all three rectangle functions draw immediately to the canvas.",
      },
      {
        type: 'paragraph',
        text: "In the rectangle example above, and in all the examples to come, you may notice that the shapes' edges may appear blurrier than the equivalent shapes drawn with SVG or CSS. This is not because the canvas API is incapable of drawing sharp edges, but rather because of the way the canvas grid maps to the actual pixels on the screen, and also, in certain cases, because of how the browser scales the canvas. If the above example is not apparent enough, let's enlarge the canvas using CSS:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="canvas" width="15" height="15"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '#canvas {\n  width: 300px;\n  height: 300px;\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const canvas = document.getElementById("canvas");\n  const ctx = canvas.getContext("2d");\n  ctx.strokeRect(2, 2, 10, 10);\n  ctx.fillRect(7, 7, 1, 1);\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'paragraph',
        text: 'In this example, we create our canvas really small (15x15), but then use CSS to scale it up to 300x300 pixels. As a result, each canvas pixel is now represented by a 20x20 block of CSS pixels. We draw a stroked rectangle from (2,2) to (12,12) and a filled rectangle from (7,7) to (8,8). It appears really blurry. This is because by default, when the browser scales raster images, it uses a smoothing algorithm to interpolate the extra pixels. This is great for photographs or canvas graphics with curly edges, but not so great for straight-edged shapes. To fix this, we can set image-rendering to pixelated:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '#canvas {\n  image-rendering: pixelated;\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'Now, when the browser scales the canvas, it preserves the pixelation of the original as much as possible.',
      },
      {
        type: 'paragraph',
        text: "Note: image-rendering: pixelated is not without its problems as a crisp-edge-preservation technique. When CSS pixels don't align with device pixels (if the devicePixelRatio is not an integer), certain pixels may be drawn larger than others, resulting in a non-uniform appearance. This is not an easy problem to solve, however, because it is impossible to fill device pixels precisely when the CSS pixels cannot accurately map to them.",
      },
      {
        type: 'paragraph',
        text: 'But now another issue becomes apparent, one that you can actually also observe in the original rectangle example: the stroked rectangle is not only 2 pixels wide instead of 1, but also appears gray rather than the default black. This is because of how the coordinates are interpreted as shape boundaries.',
      },
      {
        type: 'paragraph',
        text: 'If you look at the grid diagram above again, you can see that coordinates like 2 or 12 do not identify a pixel, but rather the edge between two pixels. In the images below, the grid represents the canvas coordinate grid. The squares between grid lines are actual on-screen pixels. In the first grid image below, a rectangle from (2,1) to (5,5) is filled. The entire area between them (light red) falls on pixel boundaries, so the resulting filled rectangle will have crisp edges.',
      },
      {
        type: 'image',
        src: '/src/content/assets/js/canvas-grid.png',
        alt: 'Three coordinate grids. The grid lines are actual pixels on the screen. The top left corner of each grid is labeled (0,0). In the first grid, a rectangle from (2,1) to (5,5) is filled in light-red color. In the second grid, (3,1) to (3,5) is joined with a 1-pixel thick royal blue line. The royal-blue line is centered on a grid line, extends from 2.5 to 3.5 on the x access, halfway into the pixels on either side of the graph line, with a light blue background on either side extending from 2 to 4 on the x-access. To avoid the light blue blur extension of the line in the second coordinate grid, the path in, the third coordinate grid is a royal-blue from line (3.5,1) to (3.5,5). The 1 pixel line width ends up completely and precisely filling a single pixel vertical line.',
      },
      {
        type: 'paragraph',
        text: 'If you consider a path from (3,1) to (3,5) with a line thickness of 1.0, you end up with the situation in the second image. The actual area to be filled (dark blue) only extends halfway into the pixels on either side of the path. An approximation of this has to be rendered, which means that those pixels being only partially shaded, and results in the entire area (the light blue and dark blue) being filled in with a color only half as dark as the actual stroke color. This is what happens with the 1.0 width line in the strokeRect() call in the rectangle example above.',
      },
      {
        type: 'paragraph',
        text: 'To fix this, you have to be very precise in your path creation. Knowing that a 1.0 width line will extend half a unit to either side of the path, creating the path from centers of pixels results in the situation in the third image—the 1.0 line width ends up completely and precisely filling a single pixel vertical line.',
      },
      {
        type: 'paragraph',
        text: "Note: Be aware that in our vertical line example, the Y position still referenced an integer grid line position—if it hadn't, we would see pixels with half coverage at the endpoints.",
      },
      {
        type: 'paragraph',
        text: 'So this is why we said earlier that the strokeRect(50, 50, 50, 50) call in the rectangle example was conceptually 50x50, but in reality it is 52x52. The actual filled region for the outline starts at (49.5, 49.5) and ends at (100.5, 100.5), and because of the partially filled pixels, the actually filled area is from (49,49) to (101,101), which is 52x52, and the edges are 2-pixel wide. To get a solid 1-pixel wide outline that is exactly 50x50, you would need to shrink the rectangle by the thickness of the outline (1px), and move it by half the thickness (0.5px):',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const canvas = document.getElementById("canvas");\n  const ctx = canvas.getContext("2d");\n  ctx.strokeRect(2.5, 2.5, 9, 9);\n  ctx.fillRect(7, 7, 1, 1);\n}',
        },
      },
      {
        type: 'paragraph',
        text: 'For even-width lines, each half ends up being an integer number of pixels, so you want a path that is between pixels (that is, (3,1) to (3,5)), instead of down the middle of pixels.',
      },
      {
        type: 'paragraph',
        text: 'While slightly painful when initially working with scalable 2D graphics, paying attention to the pixel grid and the position of paths ensures that your drawings will look correct regardless of scaling or any other transformations involved. A 1.0-width vertical line drawn at the correct position will become a crisp 2-pixel line when scaled up by 2, and will appear at the correct position.',
      },
      {
        type: 'paragraph',
        text: "This phenomenon of partially filled pixels also extends to shapes that don't align to the pixel grid. For example, consider a rotated rectangle (you'll learn about drawing it in the next section). To see what it's like with and without image-rendering: pixelated, we have two canvases side by side, and a third one drawn at full scale, with grid lines:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="canvas1" width="12" height="12"></canvas>\n<canvas id="canvas2" width="12" height="12"></canvas>\n<canvas id="canvas3" width="240" height="240"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'html,\nbody {\n  width: 800px;\n  overflow-x: scroll;\n}\n\n@media (width < 500px) {\n  html,\n  body {\n    width: 300px;\n  }\n}\n\n#canvas1,\n#canvas2 {\n  width: 240px;\n  height: 240px;\n}\n#canvas2 {\n  image-rendering: pixelated;\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw(canvasId) {\n  const canvas = document.getElementById(canvasId);\n  const ctx = canvas.getContext("2d");\n  ctx.beginPath();\n  ctx.moveTo(3, 2);\n  ctx.lineTo(9, 4.5);\n  ctx.lineTo(6.5, 10.5);\n  ctx.lineTo(0.5, 8);\n  ctx.closePath();\n  ctx.fill();\n}\n\nfunction drawFullScale() {\n  const canvas = document.getElementById("canvas3");\n  const ctx = canvas.getContext("2d");\n  ctx.beginPath();\n  ctx.moveTo(60, 40);\n  ctx.lineTo(180, 90);\n  ctx.lineTo(130, 210);\n  ctx.lineTo(10, 160);\n  ctx.closePath();\n  ctx.fill();\n  ctx.strokeStyle = "lightgray";\n  for (let i = 0; i < 16; i++) {\n    ctx.moveTo(i * 20, 0);\n    ctx.lineTo(i * 20, 300);\n    ctx.moveTo(0, i * 20);\n    ctx.lineTo(300, i * 20);\n    ctx.stroke();\n  }\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw("canvas1");\ndraw("canvas2");\ndrawFullScale();',
        },
      },
      {
        type: 'paragraph',
        text: "If scaling up an image makes it appear blurrier than intended, then scaling down an image would make it appear sharper. For example, if you want a canvas to appear as 300x150 pixels on the screen, you can create it as 600x300 pixels and then use CSS to scale it down. This is especially useful on high-DPI screens (such as Apple's Retina displays) where a CSS pixel is represented by multiple screen pixels, so if you faithfully paint a 300x150 pixel canvas, it will not have the same pixel resolution as other elements on the page.",
      },
      {
        type: 'paragraph',
        text: "Now let's look at paths. A path is a list of points, connected by segments of lines that can be of different shapes, curved or not, of different width and of different color. A path, or even a subpath, can be closed. To make shapes using paths, we take some extra steps:",
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        items: [
          'First, you create the path.',
          'Then you use drawing commands to draw into the path.',
          'Once the path has been created, you can stroke or fill the path to render it.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Here are the functions used to perform these steps:',
      },
      {
        type: 'paragraph',
        text: 'beginPath()',
      },
      {
        type: 'paragraph',
        text: 'Creates a new path. Once created, future drawing commands are directed into the path and used to build the path up.',
      },
      {
        type: 'paragraph',
        text: 'Path methods',
      },
      {
        type: 'paragraph',
        text: 'Methods to set different paths for objects.',
      },
      {
        type: 'paragraph',
        text: 'closePath()',
      },
      {
        type: 'paragraph',
        text: 'Adds a straight line to the path, going to the start of the current sub-path.',
      },
      {
        type: 'paragraph',
        text: 'stroke()',
      },
      {
        type: 'paragraph',
        text: 'Draws the shape by stroking its outline.',
      },
      {
        type: 'paragraph',
        text: 'fill()',
      },
      {
        type: 'paragraph',
        text: "Draws a solid shape by filling the path's content area.",
      },
      {
        type: 'paragraph',
        text: 'The first step to create a path is to call the beginPath(). Internally, paths are stored as a list of sub-paths (lines, arcs, etc.) which together form a shape. Every time this method is called, the list is reset and we can start drawing new shapes.',
      },
      {
        type: 'paragraph',
        text: 'Note: When the current path is empty, such as immediately after calling beginPath(), or on a newly created canvas, the first path construction command is always treated as a moveTo(), regardless of what it actually is. For that reason, you will almost always want to specifically set your starting position after resetting a path.',
      },
      {
        type: 'paragraph',
        text: "The second step is calling the methods that actually specify the paths to be drawn. We'll see these shortly.",
      },
      {
        type: 'paragraph',
        text: "The third, and an optional step, is to call closePath(). This method tries to close the shape by drawing a straight line from the current point to the start. If the shape has already been closed or there's only one point in the list, this function does nothing.",
      },
      {
        type: 'paragraph',
        text: "Note: When you call fill(), any open shapes are closed automatically, so you don't have to call closePath(). This is not the case when you call stroke().",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Drawing a triangle',
      },
      {
        type: 'paragraph',
        text: 'For example, the code for drawing a triangle would look something like this:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="100" height="100"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const canvas = document.getElementById("my-canvas");\n  const ctx = canvas.getContext("2d");\n\n  ctx.beginPath();\n  ctx.moveTo(75, 50);\n  ctx.lineTo(100, 75);\n  ctx.lineTo(100, 25);\n  ctx.fill();\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'paragraph',
        text: 'The result looks like this:',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Moving the pen',
      },
      {
        type: 'paragraph',
        text: "One very useful function, which doesn't actually draw anything but becomes part of the path list described above, is the moveTo() function. You can probably best think of this as lifting a pen or pencil from one spot on a piece of paper and placing it on the next.",
      },
      {
        type: 'paragraph',
        text: 'moveTo(x, y)',
      },
      {
        type: 'paragraph',
        text: 'Moves the pen to the coordinates specified by x and y.',
      },
      {
        type: 'paragraph',
        text: 'When the canvas is initialized or beginPath() is called, you typically will want to use the moveTo() function to place the starting point somewhere else. We could also use moveTo() to draw unconnected paths. Take a look at the smiley face below.',
      },
      {
        type: 'paragraph',
        text: 'To try this for yourself, you can use the code snippet below. Just paste it into the draw() function we saw earlier.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const canvas = document.getElementById("my-canvas");\n  const ctx = canvas.getContext("2d");\n\n  ctx.beginPath();\n  ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle\n  ctx.moveTo(110, 75);\n  ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)\n  ctx.moveTo(65, 65);\n  ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye\n  ctx.moveTo(95, 65);\n  ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye\n  ctx.stroke();\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'paragraph',
        text: 'The result looks like this:',
      },
      {
        type: 'paragraph',
        text: "If you'd like to see the connecting lines, you can remove the lines that call moveTo().",
      },
      {
        type: 'paragraph',
        text: 'Note: To learn more about the arc() function, see the Arcs section below.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Lines',
      },
      {
        type: 'paragraph',
        text: 'For drawing straight lines, use the lineTo() method.',
      },
      {
        type: 'paragraph',
        text: 'lineTo(x, y)',
      },
      {
        type: 'paragraph',
        text: 'Draws a line from the current drawing position to the position specified by x and y.',
      },
      {
        type: 'paragraph',
        text: "This method takes two arguments, x and y, which are the coordinates of the line's end point. The starting point is dependent on previously drawn paths, where the end point of the previous path is the starting point for the following, etc. The starting point can also be changed by using the moveTo() method.",
      },
      {
        type: 'paragraph',
        text: 'The example below draws two triangles, one filled and one outlined.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const canvas = document.getElementById("my-canvas");\n  const ctx = canvas.getContext("2d");\n\n  // Filled triangle\n  ctx.beginPath();\n  ctx.moveTo(25, 25);\n  ctx.lineTo(105, 25);\n  ctx.lineTo(25, 105);\n  ctx.fill();\n\n  // Stroked triangle\n  ctx.beginPath();\n  ctx.moveTo(125, 125);\n  ctx.lineTo(125, 45);\n  ctx.lineTo(45, 125);\n  ctx.closePath();\n  ctx.stroke();\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'paragraph',
        text: 'This starts by calling beginPath() to start a new shape path. We then use the moveTo() method to move the starting point to the desired position. Below this, two lines are drawn which make up two sides of the triangle.',
      },
      {
        type: 'paragraph',
        text: "You'll notice the difference between the filled and stroked triangle. This is, as mentioned above, because shapes are automatically closed when a path is filled, but not when they are stroked. If we left out the closePath() for the stroked triangle, only two lines would have been drawn, not a complete triangle.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Arcs',
      },
      {
        type: 'paragraph',
        text: 'To draw arcs or circles, we use the arc() or arcTo() methods.',
      },
      {
        type: 'paragraph',
        text: 'arc(x, y, radius, startAngle, endAngle, counterclockwise)',
      },
      {
        type: 'paragraph',
        text: 'Draws an arc which is centered at (x, y) position with radius r starting at startAngle and ending at endAngle going in the given direction indicated by counterclockwise (defaulting to clockwise).',
      },
      {
        type: 'paragraph',
        text: 'arcTo(x1, y1, x2, y2, radius)',
      },
      {
        type: 'paragraph',
        text: 'Draws an arc with the given control points and radius, connected to the previous point by a straight line.',
      },
      {
        type: 'paragraph',
        text: "Let's have a more detailed look at the arc method, which takes six parameters: x and y are the coordinates of the center of the circle on which the arc should be drawn. radius is self-explanatory. The startAngle and endAngle parameters define the start and end points of the arc in radians, along the curve of the circle. These are measured from the x axis. The counterclockwise parameter is a Boolean value which, when true, draws the arc counterclockwise; otherwise, the arc is drawn clockwise.",
      },
      {
        type: 'paragraph',
        text: 'Note: Angles in the arc function are measured in radians, not degrees. To convert degrees to radians you can use the following JavaScript expression: radians = (Math.PI/180)*degrees.',
      },
      {
        type: 'paragraph',
        text: "The following example is a little more complex than the ones we've seen above. It draws 12 different arcs all with different angles and fills.",
      },
      {
        type: 'paragraph',
        text: "The two for loops are for looping through the rows and columns of arcs. For each arc, we start a new path by calling beginPath(). In the code, each of the parameters for the arc is in a variable for clarity, but you wouldn't necessarily do that in real life.",
      },
      {
        type: 'paragraph',
        text: 'The x and y coordinates should be clear enough. radius and startAngle are fixed. The endAngle starts at 180 degrees (half a circle) in the first column and is increased by steps of 90 degrees, culminating in a complete circle in the last column.',
      },
      {
        type: 'paragraph',
        text: 'The statement for the clockwise parameter results in the first and third row being drawn as clockwise arcs and the second and fourth row as counterclockwise arcs. Finally, the if statement makes the top half stroked arcs and the bottom half filled arcs.',
      },
      {
        type: 'paragraph',
        text: 'Note: This example requires a slightly larger canvas than the others on this page: 150 x 200 pixels.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="200"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const canvas = document.getElementById("my-canvas");\n  const ctx = canvas.getContext("2d");\n\n  for (let i = 0; i < 4; i++) {\n    for (let j = 0; j < 3; j++) {\n      ctx.beginPath();\n      const x = 25 + j * 50; // x coordinate\n      const y = 25 + i * 50; // y coordinate\n      const radius = 20; // Arc radius\n      const startAngle = 0; // Starting point on circle\n      const endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle\n      const counterclockwise = i % 2 !== 0; // clockwise or counterclockwise\n\n      ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);\n\n      if (i > 1) {\n        ctx.fill();\n      } else {\n        ctx.stroke();\n      }\n    }\n  }\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Bezier and quadratic curves',
      },
      {
        type: 'paragraph',
        text: 'The next type of paths available are Bézier curves, available in both cubic and quadratic varieties. These are generally used to draw complex organic shapes.',
      },
      {
        type: 'paragraph',
        text: 'quadraticCurveTo(cp1x, cp1y, x, y)',
      },
      {
        type: 'paragraph',
        text: 'Draws a quadratic Bézier curve from the current pen position to the end point specified by x and y, using the control point specified by cp1x and cp1y.',
      },
      {
        type: 'paragraph',
        text: 'bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)',
      },
      {
        type: 'paragraph',
        text: 'Draws a cubic Bézier curve from the current pen position to the end point specified by x and y, using the control points specified by (cp1x, cp1y) and (cp2x, cp2y).',
      },
      {
        type: 'image',
        src: '/src/content/assets/js/canvas_curves.png',
        alt: 'Quadratic and Bezier curve comparison.',
      },
      {
        type: 'paragraph',
        text: 'The difference between these is that a quadratic Bézier curve has a start and an end point (blue dots) and just one control point (indicated by the red dot) while a cubic Bézier curve uses two control points.',
      },
      {
        type: 'paragraph',
        text: 'The x and y parameters in both of these methods are the coordinates of the end point. cp1x and cp1y are the coordinates of the first control point, and cp2x and cp2y are the coordinates of the second control point.',
      },
      {
        type: 'paragraph',
        text: "Using quadratic and cubic Bézier curves can be quite challenging, because unlike vector drawing software like Adobe Illustrator, we don't have direct visual feedback as to what we're doing. This makes it pretty hard to draw complex shapes. In the following example, we'll be drawing some simple organic shapes, but if you have the time and, most of all, the patience, much more complex shapes can be created.",
      },
      {
        type: 'paragraph',
        text: "There's nothing very difficult in these examples. In both cases we see a succession of curves being drawn which finally result in a complete shape.",
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Quadratic Bezier curves',
      },
      {
        type: 'paragraph',
        text: 'This example uses multiple quadratic Bézier curves to render a speech balloon.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const canvas = document.getElementById("my-canvas");\n  const ctx = canvas.getContext("2d");\n\n  // Quadratic curves example\n  ctx.beginPath();\n  ctx.moveTo(75, 25);\n  ctx.quadraticCurveTo(25, 25, 25, 62.5);\n  ctx.quadraticCurveTo(25, 100, 50, 100);\n  ctx.quadraticCurveTo(50, 120, 30, 125);\n  ctx.quadraticCurveTo(60, 120, 65, 100);\n  ctx.quadraticCurveTo(125, 100, 125, 62.5);\n  ctx.quadraticCurveTo(125, 25, 75, 25);\n  ctx.stroke();\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'subheading',
        level: 4,
        text: 'Cubic Bezier curves',
      },
      {
        type: 'paragraph',
        text: 'This example draws a heart using cubic Bézier curves.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const canvas = document.getElementById("my-canvas");\n  const ctx = canvas.getContext("2d");\n\n  // Cubic curves example\n  ctx.beginPath();\n  ctx.moveTo(75, 40);\n  ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);\n  ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);\n  ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);\n  ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);\n  ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);\n  ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);\n  ctx.fill();\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Rectangles',
      },
      {
        type: 'paragraph',
        text: "In addition to the three methods we saw in Drawing rectangles, which draw rectangular shapes directly to the canvas, there's also the rect() method, which adds a rectangular path to a currently open path.",
      },
      {
        type: 'paragraph',
        text: 'rect(x, y, width, height)',
      },
      {
        type: 'paragraph',
        text: 'Draws a rectangle whose top-left corner is specified by (x, y) with the specified width and height.',
      },
      {
        type: 'paragraph',
        text: 'Before this method is executed, the moveTo() method is automatically called with the parameters (x,y). In other words, the current pen position is automatically reset to the default coordinates.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Making combinations',
      },
      {
        type: 'paragraph',
        text: "So far, each example on this page has used only one type of path function per shape. However, there's no limitation to the number or types of paths you can use to create a shape. So in this final example, let's combine all of the path functions to make a set of very famous game characters.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="200" height="185"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const canvas = document.getElementById("my-canvas");\n  const ctx = canvas.getContext("2d");\n\n  roundedRect(ctx, 12, 12, 184, 168, 15);\n  roundedRect(ctx, 19, 19, 170, 154, 9);\n  roundedRect(ctx, 53, 53, 49, 33, 10);\n  roundedRect(ctx, 53, 119, 49, 16, 6);\n  roundedRect(ctx, 135, 53, 49, 33, 10);\n  roundedRect(ctx, 135, 119, 25, 49, 10);\n\n  ctx.beginPath();\n  ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);\n  ctx.lineTo(31, 37);\n  ctx.fill();\n\n  for (let i = 0; i < 8; i++) {\n    ctx.fillRect(51 + i * 16, 35, 4, 4);\n  }\n\n  for (let i = 0; i < 6; i++) {\n    ctx.fillRect(115, 51 + i * 16, 4, 4);\n  }\n\n  for (let i = 0; i < 8; i++) {\n    ctx.fillRect(51 + i * 16, 99, 4, 4);\n  }\n\n  ctx.beginPath();\n  ctx.moveTo(83, 116);\n  ctx.lineTo(83, 102);\n  ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);\n  ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);\n  ctx.lineTo(111, 116);\n  ctx.lineTo(106.333, 111.333);\n  ctx.lineTo(101.666, 116);\n  ctx.lineTo(97, 111.333);\n  ctx.lineTo(92.333, 116);\n  ctx.lineTo(87.666, 111.333);\n  ctx.lineTo(83, 116);\n  ctx.fill();\n\n  ctx.fillStyle = "white";\n  ctx.beginPath();\n  ctx.moveTo(91, 96);\n  ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);\n  ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);\n  ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);\n  ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);\n  ctx.moveTo(103, 96);\n  ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);\n  ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);\n  ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);\n  ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);\n  ctx.fill();\n\n  ctx.fillStyle = "black";\n  ctx.beginPath();\n  ctx.arc(101, 102, 2, 0, Math.PI * 2, true);\n  ctx.fill();\n\n  ctx.beginPath();\n  ctx.arc(89, 102, 2, 0, Math.PI * 2, true);\n  ctx.fill();\n}\n\n// A utility function to draw a rectangle with rounded corners.\n\nfunction roundedRect(ctx, x, y, width, height, radius) {\n  ctx.beginPath();\n  ctx.moveTo(x, y + radius);\n  ctx.arcTo(x, y + height, x + radius, y + height, radius);\n  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);\n  ctx.arcTo(x + width, y, x + width - radius, y, radius);\n  ctx.arcTo(x, y, x, y + radius, radius);\n  ctx.stroke();\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'paragraph',
        text: 'The resulting image looks like this:',
      },
      {
        type: 'paragraph',
        text: "We won't go over this in detail, since it's actually surprisingly simple. The most important things to note are the use of the fillStyle property on the drawing context, and the use of a utility function (in this case roundedRect()). Using utility functions for bits of drawing you do often can be very helpful and reduce the amount of code you need, as well as its complexity.",
      },
      {
        type: 'paragraph',
        text: "We'll take another look at fillStyle, in more detail, later in this tutorial. Here, all we're doing is using it to change the fill color for paths from the default color of black to white, and then back again.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Shapes with holes',
      },
      {
        type: 'paragraph',
        text: 'To draw a shape with a hole in it, we need to draw the hole in different clock directions as we draw the outer shape. We either draw the outer shape clockwise and the inner shape counterclockwise or the outer shape counterclockwise and the inner shape clockwise.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const canvas = document.getElementById("my-canvas");\n  const ctx = canvas.getContext("2d");\n\n  ctx.beginPath();\n\n  // Outer shape clockwise ⟳\n  ctx.moveTo(0, 0);\n  ctx.lineTo(150, 0);\n  ctx.lineTo(75, 129.9);\n\n  // Inner shape counterclockwise ↺\n  ctx.moveTo(75, 20);\n  ctx.lineTo(50, 60);\n  ctx.lineTo(100, 60);\n\n  ctx.fill();\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'paragraph',
        text: 'In the example above, the outer triangle goes clockwise (move to the top-left corner, then draw a line to the top-right corner, and finish at the bottom) and the inner triangle goes counterclockwise (move to the top, then line to the bottom-left corner, and finish at the bottom-right).',
      },
      {
        type: 'paragraph',
        text: "As we have seen in the last example, there can be a series of paths and drawing commands to draw objects onto your canvas. To simplify the code and to improve performance, the Path2D object, available in recent versions of browsers, lets you cache or record these drawing commands. You are able to play back your paths quickly. Let's see how we can construct a Path2D object:",
      },
      {
        type: 'paragraph',
        text: 'Path2D()',
      },
      {
        type: 'paragraph',
        text: 'The Path2D() constructor returns a newly instantiated Path2D object, optionally with another path as an argument (creates a copy), or optionally with a string consisting of SVG path data.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'new Path2D(); // empty path object\nnew Path2D(path); // copy from another Path2D object\nnew Path2D(d); // path from SVG path data',
        },
      },
      {
        type: 'paragraph',
        text: 'All path methods like moveTo, rect, arc or quadraticCurveTo, etc., which we got to know above, are available on Path2D objects.',
      },
      {
        type: 'paragraph',
        text: 'The Path2D API also adds a way to combine paths using the addPath method. This can be useful when you want to build objects from several components, for example.',
      },
      {
        type: 'paragraph',
        text: 'Path2D.addPath(path [, transform])',
      },
      {
        type: 'paragraph',
        text: 'Adds a path to the current path with an optional transformation matrix.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Path2D example',
      },
      {
        type: 'paragraph',
        text: 'In this example, we are creating a rectangle and a circle. Both are stored as a Path2D object, so that they are available for later usage. With the new Path2D API, several methods got updated to optionally accept a Path2D object to use instead of the current path. Here, stroke and fill are used with a path argument to draw both objects onto the canvas, for example.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="130" height="100"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const canvas = document.getElementById("my-canvas");\n  const ctx = canvas.getContext("2d");\n\n  const rectangle = new Path2D();\n  rectangle.rect(10, 10, 50, 50);\n\n  const circle = new Path2D();\n  circle.arc(100, 35, 25, 0, 2 * Math.PI);\n\n  ctx.stroke(rectangle);\n  ctx.fill(circle);\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Using SVG paths',
      },
      {
        type: 'paragraph',
        text: 'Another powerful feature of the new canvas Path2D API is using SVG path data to initialize paths on your canvas. This might allow you to pass around path data and re-use them in both, SVG and canvas.',
      },
      {
        type: 'paragraph',
        text: 'The path will move to point (M10 10) and then move horizontally 80 points to the right (h 80), then 80 points down (v 80), then 80 points to the left (h -80), and then back to the start (z). You can see this example on the Path2D constructor page.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const p = new Path2D("M10 10 h 80 v 80 h -80 Z");',
        },
      },
      {
        type: 'list',
        ordered: false,
        items: ['Previous', 'Next'],
      },
      {
        type: 'paragraph',
        text: 'Up until now we have only seen methods of the drawing context. If we want to apply colors to a shape, there are two important properties we can use: fillStyle and strokeStyle.',
      },
      {
        type: 'paragraph',
        text: 'fillStyle = color',
      },
      {
        type: 'paragraph',
        text: 'Sets the style used when filling shapes.',
      },
      {
        type: 'paragraph',
        text: 'strokeStyle = color',
      },
      {
        type: 'paragraph',
        text: "Sets the style for shapes' outlines.",
      },
      {
        type: 'paragraph',
        text: "color is a string representing a CSS <color>, a gradient object, or a pattern object. We'll look at gradient and pattern objects later. By default, the stroke and fill color are set to black (CSS color value #000000).",
      },
      {
        type: 'paragraph',
        text: 'Note: When you set the strokeStyle and/or fillStyle property, the new value becomes the default for all shapes being drawn from then on. For every shape you want in a different color, you will need to reassign the fillStyle or strokeStyle property.',
      },
      {
        type: 'paragraph',
        text: 'The valid strings you can enter should, according to the specification, be CSS <color> values. Each of the following examples describe the same color.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// these all set the fillStyle to \'orange\'\n\nctx.fillStyle = "orange";\nctx.fillStyle = "#FFA500";\nctx.fillStyle = "rgb(255 165 0)";\nctx.fillStyle = "rgb(255 165 0 / 100%)";',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'A fillStyle example',
      },
      {
        type: 'paragraph',
        text: 'In this example, we once again use two for loops to draw a grid of rectangles, each in a different color. The resulting image should look something like the screenshot. There is nothing too spectacular happening here. We use the two variables i and j to generate a unique RGB color for each square, and only modify the red and green values. The blue channel has a fixed value. By modifying the channels, you can generate all kinds of palettes. By increasing the steps, you can achieve something that looks like the color palettes Photoshop uses.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const ctx = document.getElementById("my-canvas").getContext("2d");\n  for (let i = 0; i < 6; i++) {\n    for (let j = 0; j < 6; j++) {\n      ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)} ${Math.floor(\n        255 - 42.5 * j,\n      )} 0)`;\n      ctx.fillRect(j * 25, i * 25, 25, 25);\n    }\n  }\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150"\n  >A 6 by 6 square grid displaying 36 different colors</canvas\n>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'paragraph',
        text: 'The result looks like this:',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'A strokeStyle example',
      },
      {
        type: 'paragraph',
        text: "This example is similar to the one above, but uses the strokeStyle property to change the colors of the shapes' outlines. We use the arc() method to draw circles instead of squares.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const ctx = document.getElementById("my-canvas").getContext("2d");\n  for (let i = 0; i < 6; i++) {\n    for (let j = 0; j < 6; j++) {\n      ctx.strokeStyle = `rgb(0 ${Math.floor(255 - 42.5 * i)} ${Math.floor(\n        255 - 42.5 * j,\n      )})`;\n      ctx.beginPath();\n      ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, 2 * Math.PI, true);\n      ctx.stroke();\n    }\n  }\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'paragraph',
        text: 'The result looks like this:',
      },
      {
        type: 'paragraph',
        text: 'In addition to drawing opaque shapes to the canvas, we can also draw semi-transparent (or translucent) shapes. This is done by either setting the globalAlpha property or by assigning a semi-transparent color to the stroke and/or fill style.',
      },
      {
        type: 'paragraph',
        text: 'globalAlpha = transparencyValue',
      },
      {
        type: 'paragraph',
        text: 'Applies the specified transparency value to all future shapes drawn on the canvas. The value must be between 0.0 (fully transparent) to 1.0 (fully opaque). This value is 1.0 (fully opaque) by default.',
      },
      {
        type: 'paragraph',
        text: "The globalAlpha property can be useful if you want to draw a lot of shapes on the canvas with similar transparency, but otherwise it's generally more useful to set the transparency on individual shapes when setting their colors.",
      },
      {
        type: 'paragraph',
        text: 'Because the strokeStyle and fillStyle properties accept CSS rgb color values, we can use the following notation to assign a transparent color to them.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '// Assigning transparent colors to stroke and fill style\n\nctx.strokeStyle = "rgb(255 0 0 / 50%)";\nctx.fillStyle = "rgb(255 0 0 / 50%)";',
        },
      },
      {
        type: 'paragraph',
        text: 'The rgb() function has an optional extra parameter. The last parameter sets the transparency value of this particular color. The valid range is specified as a percentage between 0% (fully transparent) and 100% (fully opaque) or as a number between 0.0 (equivalent to 0%) and 1.0 (equivalent to 100%).',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'A globalAlpha example',
      },
      {
        type: 'paragraph',
        text: "In this example, we'll draw a background of four different colored squares. On top of these, we'll draw a set of semi-transparent circles. The globalAlpha property is set at 0.2 which will be used for all shapes from that point on. Every step in the for loop draws a set of circles with an increasing radius. The final result is a radial gradient. By overlaying ever more circles on top of each other, we effectively reduce the transparency of the circles that have already been drawn. By increasing the step count and in effect drawing more circles, the background would completely disappear from the center of the image.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const ctx = document.getElementById("my-canvas").getContext("2d");\n  // draw background\n  ctx.fillStyle = "#ffdd00";\n  ctx.fillRect(0, 0, 75, 75);\n  ctx.fillStyle = "#66cc00";\n  ctx.fillRect(75, 0, 75, 75);\n  ctx.fillStyle = "#0099ff";\n  ctx.fillRect(0, 75, 75, 75);\n  ctx.fillStyle = "#ff3300";\n  ctx.fillRect(75, 75, 75, 75);\n  ctx.fillStyle = "white";\n\n  // set transparency value\n  ctx.globalAlpha = 0.2;\n\n  // Draw semi transparent circles\n  for (let i = 0; i < 7; i++) {\n    ctx.beginPath();\n    ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);\n    ctx.fill();\n  }\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'An example using rgb() with alpha transparency',
      },
      {
        type: 'paragraph',
        text: "In this second example, we do something similar to the one above, but instead of drawing circles on top of each other, I've drawn small rectangles with increasing opacity. Using rgb() gives you a little more control and flexibility because we can set the fill and stroke style individually.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const ctx = document.getElementById("my-canvas").getContext("2d");\n\n  // Draw background\n  ctx.fillStyle = "rgb(255 221 0)";\n  ctx.fillRect(0, 0, 150, 37.5);\n  ctx.fillStyle = "rgb(102 204 0)";\n  ctx.fillRect(0, 37.5, 150, 37.5);\n  ctx.fillStyle = "rgb(0 153 255)";\n  ctx.fillRect(0, 75, 150, 37.5);\n  ctx.fillStyle = "rgb(255 51 0)";\n  ctx.fillRect(0, 112.5, 150, 37.5);\n\n  // Draw semi transparent rectangles\n  for (let i = 0; i < 10; i++) {\n    ctx.fillStyle = `rgb(255 255 255 / ${(i + 1) / 10})`;\n    for (let j = 0; j < 4; j++) {\n      ctx.fillRect(5 + i * 14, 5 + j * 37.5, 14, 27.5);\n    }\n  }\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'paragraph',
        text: 'There are several properties which allow us to style lines.',
      },
      {
        type: 'paragraph',
        text: 'lineWidth = value',
      },
      {
        type: 'paragraph',
        text: 'Sets the width of lines drawn in the future.',
      },
      {
        type: 'paragraph',
        text: 'lineCap = type',
      },
      {
        type: 'paragraph',
        text: 'Sets the appearance of the ends of lines.',
      },
      {
        type: 'paragraph',
        text: 'lineJoin = type',
      },
      {
        type: 'paragraph',
        text: 'Sets the appearance of the "corners" where lines meet.',
      },
      {
        type: 'paragraph',
        text: 'miterLimit = value',
      },
      {
        type: 'paragraph',
        text: 'Establishes a limit on the miter when two lines join at a sharp angle, to let you control how thick the junction becomes.',
      },
      {
        type: 'paragraph',
        text: 'getLineDash()',
      },
      {
        type: 'paragraph',
        text: 'Returns the current line dash pattern array containing an even number of non-negative numbers.',
      },
      {
        type: 'paragraph',
        text: 'setLineDash(segments)',
      },
      {
        type: 'paragraph',
        text: 'Sets the current line dash pattern.',
      },
      {
        type: 'paragraph',
        text: 'lineDashOffset = value',
      },
      {
        type: 'paragraph',
        text: 'Specifies where to start a dash array on a line.',
      },
      {
        type: 'paragraph',
        text: "You'll get a better understanding of what these do by looking at the examples below.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'A lineWidth example',
      },
      {
        type: 'paragraph',
        text: 'This property sets the current line thickness. Values must be positive numbers. By default this value is set to 1.0 units.',
      },
      {
        type: 'paragraph',
        text: "The line width is the thickness of the stroke centered on the given path. In other words, the area that's drawn extends to half the line width on either side of the path. Because canvas coordinates do not directly reference pixels, special care must be taken to obtain crisp horizontal and vertical lines.",
      },
      {
        type: 'paragraph',
        text: "In the example below, 10 straight lines are drawn with increasing line widths. The line on the far left is 1.0 units wide. However, the leftmost and all other odd-integer-width thickness lines do not appear crisp, because of the path's positioning.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const ctx = document.getElementById("my-canvas").getContext("2d");\n  for (let i = 0; i < 10; i++) {\n    ctx.lineWidth = 1 + i;\n    ctx.beginPath();\n    ctx.moveTo(5 + i * 14, 5);\n    ctx.lineTo(5 + i * 14, 140);\n    ctx.stroke();\n  }\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'paragraph',
        text: 'Note: If you are wondering about the lines appearing gray near the edge instead of black, check the Seeing blurry edges? section in the previous chapter.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'A lineCap example',
      },
      {
        type: 'paragraph',
        text: 'The lineCap property determines how the end points of every line are drawn. There are three possible values for this property and those are: butt, round and square. By default this property is set to butt:',
      },
      {
        type: 'paragraph',
        text: 'butt',
      },
      {
        type: 'paragraph',
        text: 'The ends of lines are squared off at the endpoints.',
      },
      {
        type: 'paragraph',
        text: 'round',
      },
      {
        type: 'paragraph',
        text: 'The ends of lines are rounded.',
      },
      {
        type: 'paragraph',
        text: 'square',
      },
      {
        type: 'paragraph',
        text: "The ends of lines are squared off by adding a box with an equal width and half the height of the line's thickness.",
      },
      {
        type: 'paragraph',
        text: "Only start and final endpoints of a path are affected: if a path is closed with closePath(), there's no start and final endpoint; instead, all endpoints in the path are connected to their attached previous and next segment using the current setting of the lineJoin style.",
      },
      {
        type: 'paragraph',
        text: "In this example, we'll draw three lines, each with a different value for the lineCap property. I also added two guides to see the exact differences between the three. Each of these lines starts and ends exactly on these guides.",
      },
      {
        type: 'paragraph',
        text: "The line on the left uses the default butt option. You'll notice that it's drawn completely flush with the guides. The second is set to use the round option. This adds a semicircle to the end that has a radius half the width of the line. The line on the right uses the square option. This adds a box with an equal width and half the height of the line thickness.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const ctx = document.getElementById("my-canvas").getContext("2d");\n\n  // Draw guides\n  ctx.strokeStyle = "#0099ff";\n  ctx.beginPath();\n  ctx.moveTo(10, 10);\n  ctx.lineTo(140, 10);\n  ctx.moveTo(10, 140);\n  ctx.lineTo(140, 140);\n  ctx.stroke();\n\n  // Draw lines\n  ctx.strokeStyle = "black";\n  ["butt", "round", "square"].forEach((lineCap, i) => {\n    ctx.lineWidth = 15;\n    ctx.lineCap = lineCap;\n    ctx.beginPath();\n    ctx.moveTo(25 + i * 50, 10);\n    ctx.lineTo(25 + i * 50, 140);\n    ctx.stroke();\n  });\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'A lineJoin example',
      },
      {
        type: 'paragraph',
        text: 'The lineJoin property determines how two connecting segments (of lines, arcs or curves) with non-zero lengths in a shape are joined together (degenerate segments with zero lengths, whose specified endpoints and control points are exactly at the same position, are skipped).',
      },
      {
        type: 'paragraph',
        text: 'There are three possible values for this property: round, bevel and miter. By default this property is set to miter. Note that the lineJoin setting has no effect if the two connected segments have the same direction, because no joining area will be added in this case:',
      },
      {
        type: 'paragraph',
        text: 'round',
      },
      {
        type: 'paragraph',
        text: 'Rounds off the corners of a shape by filling an additional sector of disc centered at the common endpoint of connected segments. The radius for these rounded corners is equal to half the line width.',
      },
      {
        type: 'paragraph',
        text: 'bevel',
      },
      {
        type: 'paragraph',
        text: 'Fills an additional triangular area between the common endpoint of connected segments, and the separate outside rectangular corners of each segment.',
      },
      {
        type: 'paragraph',
        text: 'miter',
      },
      {
        type: 'paragraph',
        text: 'Connected segments are joined by extending their outside edges to connect at a single point, with the effect of filling an additional lozenge-shaped area. This setting is affected by the miterLimit property which is explained below.',
      },
      {
        type: 'paragraph',
        text: 'The example below draws three different paths, demonstrating each of these three lineJoin property settings; the output is shown above.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const ctx = document.getElementById("my-canvas").getContext("2d");\n  ctx.lineWidth = 10;\n  ["round", "bevel", "miter"].forEach((lineJoin, i) => {\n    ctx.lineJoin = lineJoin;\n    ctx.beginPath();\n    ctx.moveTo(-5, 5 + i * 40);\n    ctx.lineTo(35, 45 + i * 40);\n    ctx.lineTo(75, 5 + i * 40);\n    ctx.lineTo(115, 45 + i * 40);\n    ctx.lineTo(155, 5 + i * 40);\n    ctx.stroke();\n  });\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'A demo of the miterLimit property',
      },
      {
        type: 'paragraph',
        text: "As you've seen in the previous example, when joining two lines with the miter option, the outside edges of the two joining lines are extended up to the point where they meet. For lines which are at large angles with each other, this point is not far from the inside connection point. However, as the angles between each line decrease, the distance (miter length) between these points increases exponentially.",
      },
      {
        type: 'paragraph',
        text: 'The miterLimit property determines how far the outside connection point can be placed from the inside connection point. If two lines exceed this value, a bevel join gets drawn instead. Note that the maximum miter length is the product of the line width measured in the current coordinate system, by the value of this miterLimit property (whose default value is 10.0 in the HTML <canvas>), so the miterLimit can be set independently from the current display scale or any affine transforms of paths: it only influences the effectively rendered shape of line edges.',
      },
      {
        type: 'paragraph',
        text: 'More exactly, the miter limit is the maximum allowed ratio of the extension length (in the HTML canvas, it is measured between the outside corner of the joined edges of the line and the common endpoint of connecting segments specified in the path) to half the line width. It can equivalently be defined as the maximum allowed ratio of the distance between the inside and outside points of junction of edges, to the total line width. It is then equal to the cosecant of half the minimum inner angle of connecting segments below which no miter join will be rendered, but only a bevel join:',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'miterLimit = max miterLength / lineWidth = 1 / sin ( min θ / 2 )',
          'The default miter limit of 10.0 will strip all miters for sharp angles below about 11 degrees.',
          'A miter limit equal to √2 ≈ 1.4142136 (rounded up) will strip miters for all acute angles, keeping miter joins only for obtuse or right angles.',
          'A miter limit equal to 1.0 is valid but will disable all miters.',
          'Values below 1.0 are invalid for the miter limit.',
        ],
      },
      {
        type: 'paragraph',
        text: "Here's a little demo in which you can set miterLimit dynamically and see how this effects the shapes on the canvas. The blue lines show where the start and endpoints for each of the lines in the zig-zag pattern are.",
      },
      {
        type: 'paragraph',
        text: 'If you specify a miterLimit value below 4.2 in this demo, none of the visible corners will join with a miter extension, but only with a small bevel near the blue lines; with a miterLimit above 10, most corners in this demo should join with a miter far away from the blue lines, and whose height is decreasing between corners from left to right because they connect with growing angles; with intermediate values, the corners on the left side will only join with a bevel near the blue lines, and the corners on the right side with a miter extension (also with a decreasing height).',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const ctx = document.getElementById("my-canvas").getContext("2d");\n\n  // Clear canvas\n  ctx.clearRect(0, 0, 150, 150);\n\n  // Draw guides\n  ctx.strokeStyle = "#0099ff";\n  ctx.lineWidth = 2;\n  ctx.strokeRect(-5, 50, 160, 50);\n\n  // Set line styles\n  ctx.strokeStyle = "black";\n  ctx.lineWidth = 10;\n\n  // check input\n  if (document.getElementById("miterLimit").checkValidity()) {\n    ctx.miterLimit = parseFloat(document.getElementById("miterLimit").value);\n  }\n\n  // Draw lines\n  ctx.beginPath();\n  ctx.moveTo(0, 100);\n  for (let i = 0; i < 24; i++) {\n    const dy = i % 2 === 0 ? 25 : -25;\n    ctx.lineTo(i ** 1.5 * 2, 75 + dy);\n  }\n  ctx.stroke();\n  return false;\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>\n<div>\n  Change the <code>miterLimit</code> by entering a new value below and clicking\n  the redraw button.<br /><br />\n  <label for="miterLimit">Miter limit</label>\n  <input type="number" id="miterLimit" min="1" />\n  <button id="redraw">Redraw</button>\n</div>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'body {\n  display: flex;\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'document.getElementById("miterLimit").value = document\n  .getElementById("my-canvas")\n  .getContext("2d").miterLimit;\ndraw();\n\nconst redraw = document.getElementById("redraw");\nredraw.addEventListener("click", draw);',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'Using line dashes',
      },
      {
        type: 'paragraph',
        text: 'The setLineDash method and the lineDashOffset property specify the dash pattern for lines. The setLineDash method accepts a list of numbers that specifies distances to alternately draw a line and a gap and the lineDashOffset property sets an offset where to start the pattern.',
      },
      {
        type: 'paragraph',
        text: 'In this example we are creating a marching ants effect. It is an animation technique often found in selection tools of computer graphics programs. It helps the user to distinguish the selection border from the image background by animating the border. In a later part of this tutorial, you can learn how to do this and other basic animations.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="111" height="111" role="presentation"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const ctx = document.getElementById("my-canvas").getContext("2d");\nlet offset = 0;\n\nfunction draw() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  ctx.setLineDash([4, 2]);\n  ctx.lineDashOffset = -offset;\n  ctx.strokeRect(10, 10, 100, 100);\n}\n\nfunction march() {\n  offset++;\n  if (offset > 5) {\n    offset = 0;\n  }\n  draw();\n  setTimeout(march, 20);\n}\n\nmarch();',
        },
      },
      {
        type: 'paragraph',
        text: 'Just like any normal drawing program, we can fill and stroke shapes using linear, radial and conic gradients. We create a CanvasGradient object by using one of the following methods. We can then assign this object to the fillStyle or strokeStyle properties.',
      },
      {
        type: 'paragraph',
        text: 'createLinearGradient(x1, y1, x2, y2)',
      },
      {
        type: 'paragraph',
        text: 'Creates a linear gradient object with a starting point of (x1, y1) and an end point of (x2, y2).',
      },
      {
        type: 'paragraph',
        text: 'createRadialGradient(x1, y1, r1, x2, y2, r2)',
      },
      {
        type: 'paragraph',
        text: 'Creates a radial gradient. The parameters represent two circles, one with its center at (x1, y1) and a radius of r1, and the other with its center at (x2, y2) with a radius of r2.',
      },
      {
        type: 'paragraph',
        text: 'createConicGradient(angle, x, y)',
      },
      {
        type: 'paragraph',
        text: 'Creates a conic gradient object with a starting angle of angle in radians, at the position (x, y).',
      },
      {
        type: 'paragraph',
        text: 'For example:',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const lineargradient = ctx.createLinearGradient(0, 0, 150, 150);\nconst radialgradient = ctx.createRadialGradient(75, 75, 0, 75, 75, 100);',
        },
      },
      {
        type: 'paragraph',
        text: "Once we've created a CanvasGradient object we can assign colors to it by using the addColorStop() method.",
      },
      {
        type: 'paragraph',
        text: 'gradient.addColorStop(position, color)',
      },
      {
        type: 'paragraph',
        text: 'Creates a new color stop on the gradient object. The position is a number between 0.0 and 1.0 and defines the relative position of the color in the gradient, and the color argument must be a string representing a CSS <color>, indicating the color the gradient should reach at that offset into the transition.',
      },
      {
        type: 'paragraph',
        text: 'You can add as many color stops to a gradient as you need. Below is a very simple linear gradient from white to black.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const lineargradient = ctx.createLinearGradient(0, 0, 150, 150);\nlineargradient.addColorStop(0, "white");\nlineargradient.addColorStop(1, "black");',
        },
      },
      {
        type: 'subheading',
        level: 3,
        text: 'A createLinearGradient example',
      },
      {
        type: 'paragraph',
        text: "In this example, we'll create two different gradients. As you can see here, both the strokeStyle and fillStyle properties can accept a canvasGradient object as valid input.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const ctx = document.getElementById("my-canvas").getContext("2d");\n\n  // Create gradients\n  const linGrad = ctx.createLinearGradient(0, 0, 0, 150);\n  linGrad.addColorStop(0, "#00ABEB");\n  linGrad.addColorStop(0.5, "white");\n  linGrad.addColorStop(0.5, "#26C000");\n  linGrad.addColorStop(1, "white");\n\n  const linGrad2 = ctx.createLinearGradient(0, 50, 0, 95);\n  linGrad2.addColorStop(0.5, "black");\n  linGrad2.addColorStop(1, "transparent");\n\n  // assign gradients to fill and stroke styles\n  ctx.fillStyle = linGrad;\n  ctx.strokeStyle = linGrad2;\n\n  // draw shapes\n  ctx.fillRect(10, 10, 130, 130);\n  ctx.strokeRect(50, 50, 50, 50);\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'paragraph',
        text: "The first is a background gradient. As you can see, we assigned two colors at the same position. You do this to make very sharp color transitions—in this case from white to green. Normally, it doesn't matter in what order you define the color stops, but in this special case, it does significantly. If you keep the assignments in the order you want them to appear, this won't be a problem.",
      },
      {
        type: 'paragraph',
        text: "In the second gradient, we didn't assign the starting color (at position 0.0) since it wasn't strictly necessary, because it will automatically assume the color of the next color stop. Therefore, assigning the black color at position 0.5 automatically makes the gradient, from the start to this stop, black.",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'A createRadialGradient example',
      },
      {
        type: 'paragraph',
        text: 'In this example, we\'ll define four different radial gradients. Because we have control over the start and closing points of the gradient, we can achieve more complex effects than we would normally have in the "classic" radial gradients we see in, for instance, Photoshop (that is, a gradient with a single center point where the gradient expands outward in a circular shape).',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const ctx = document.getElementById("my-canvas").getContext("2d");\n\n  // Create gradients\n  const radGrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);\n  radGrad.addColorStop(0, "#A7D30C");\n  radGrad.addColorStop(0.9, "#019F62");\n  radGrad.addColorStop(1, "transparent");\n\n  const radGrad2 = ctx.createRadialGradient(105, 105, 20, 112, 120, 50);\n  radGrad2.addColorStop(0, "#FF5F98");\n  radGrad2.addColorStop(0.75, "#FF0188");\n  radGrad2.addColorStop(1, "transparent");\n\n  const radGrad3 = ctx.createRadialGradient(95, 15, 15, 102, 20, 40);\n  radGrad3.addColorStop(0, "#00C9FF");\n  radGrad3.addColorStop(0.8, "#00B5E2");\n  radGrad3.addColorStop(1, "transparent");\n\n  const radGrad4 = ctx.createRadialGradient(0, 150, 50, 0, 140, 90);\n  radGrad4.addColorStop(0, "#F4F201");\n  radGrad4.addColorStop(0.8, "#E4C700");\n  radGrad4.addColorStop(1, "transparent");\n\n  // draw shapes\n  ctx.fillStyle = radGrad4;\n  ctx.fillRect(0, 0, 150, 150);\n  ctx.fillStyle = radGrad3;\n  ctx.fillRect(0, 0, 150, 150);\n  ctx.fillStyle = radGrad2;\n  ctx.fillRect(0, 0, 150, 150);\n  ctx.fillStyle = radGrad;\n  ctx.fillRect(0, 0, 150, 150);\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'paragraph',
        text: "In this case, we've offset the starting point slightly from the end point to achieve a spherical 3D effect. It's best to try to avoid letting the inside and outside circles overlap because this results in strange effects which are hard to predict.",
      },
      {
        type: 'paragraph',
        text: "The last color stop in each of the four gradients uses a fully transparent color. If you want to have a nice transition from this to the previous color stop, both colors should be equal. This isn't very obvious from the code because it uses two different CSS color methods as a demonstration, but in the first gradient #019F62 = rgb(1 159 98 / 100%).",
      },
      {
        type: 'subheading',
        level: 3,
        text: 'A createConicGradient example',
      },
      {
        type: 'paragraph',
        text: "In this example, we'll define two different conic gradients. A conic gradient differs from a radial gradient as, instead of creating circles, it circles around a point.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const ctx = document.getElementById("my-canvas").getContext("2d");\n\n  // Create gradients\n  const conicGrad1 = ctx.createConicGradient(2, 62, 75);\n  conicGrad1.addColorStop(0, "#A7D30C");\n  conicGrad1.addColorStop(1, "white");\n\n  const conicGrad2 = ctx.createConicGradient(0, 187, 75);\n  // we multiply our values by Math.PI/180 to convert degrees to radians\n  conicGrad2.addColorStop(0, "black");\n  conicGrad2.addColorStop(0.25, "black");\n  conicGrad2.addColorStop(0.25, "white");\n  conicGrad2.addColorStop(0.5, "white");\n  conicGrad2.addColorStop(0.5, "black");\n  conicGrad2.addColorStop(0.75, "black");\n  conicGrad2.addColorStop(0.75, "white");\n  conicGrad2.addColorStop(1, "white");\n\n  // draw shapes\n  ctx.fillStyle = conicGrad1;\n  ctx.fillRect(12, 25, 100, 100);\n  ctx.fillStyle = conicGrad2;\n  ctx.fillRect(137, 25, 100, 100);\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="250" height="150" role="presentation"\n  >A conic gradient</canvas\n>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'paragraph',
        text: 'The first gradient is positioned in the center of the first rectangle and moves a green color stop at the start, to a white one at the end. The angle starts at 2 radians, which is noticeable because of the beginning/end line pointing south east.',
      },
      {
        type: 'paragraph',
        text: 'The second gradient is also positioned at the center of the second rectangle. This one has multiple color stops, alternating from black to white at each quarter of the rotation. This gives us the checkered effect.',
      },
      {
        type: 'paragraph',
        text: 'In one of the examples on the previous page, we used a series of loops to create a pattern of images. There is, however, a much simpler method: the createPattern() method.',
      },
      {
        type: 'paragraph',
        text: 'createPattern(image, type)',
      },
      {
        type: 'paragraph',
        text: 'Creates and returns a new canvas pattern object. image is the source of the image (that is, an HTMLImageElement, a SVGImageElement, another HTMLCanvasElement or an OffscreenCanvas, an HTMLVideoElement or a VideoFrame, or an ImageBitmap). type is a string indicating how to use the image.',
      },
      {
        type: 'paragraph',
        text: 'The type specifies how to use the image in order to create the pattern, and must be one of the following string values:',
      },
      {
        type: 'paragraph',
        text: 'repeat',
      },
      {
        type: 'paragraph',
        text: 'Tiles the image in both vertical and horizontal directions.',
      },
      {
        type: 'paragraph',
        text: 'repeat-x',
      },
      {
        type: 'paragraph',
        text: 'Tiles the image horizontally but not vertically.',
      },
      {
        type: 'paragraph',
        text: 'repeat-y',
      },
      {
        type: 'paragraph',
        text: 'Tiles the image vertically but not horizontally.',
      },
      {
        type: 'paragraph',
        text: 'no-repeat',
      },
      {
        type: 'paragraph',
        text: "Doesn't tile the image. It's used only once.",
      },
      {
        type: 'paragraph',
        text: "We use this method to create a CanvasPattern object which is very similar to the gradient methods we've seen above. Once we've created a pattern, we can assign it to the fillStyle or strokeStyle properties. For example:",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'const img = new Image();\nimg.src = "some-image.png";\nconst pattern = ctx.createPattern(img, "repeat");',
        },
      },
      {
        type: 'paragraph',
        text: 'Note: Like with the drawImage() method, you must make sure the image you use is loaded before calling this method or the pattern may be drawn incorrectly.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'A createPattern example',
      },
      {
        type: 'paragraph',
        text: "In this last example, we'll create a pattern to assign to the fillStyle property. The only thing worth noting is the use of the image's onload handler. This is to make sure the image is loaded before it is assigned to the pattern.",
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const ctx = document.getElementById("my-canvas").getContext("2d");\n\n  // create new image object to use as pattern\n  const img = new Image();\n  img.src = "canvas_create_pattern.png";\n  img.onload = () => {\n    // create pattern\n    const pattern = ctx.createPattern(img, "repeat");\n    ctx.fillStyle = pattern;\n    ctx.fillRect(0, 0, 150, 150);\n  };\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="150" role="presentation"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'paragraph',
        text: 'Using shadows involves just four properties:',
      },
      {
        type: 'paragraph',
        text: 'shadowOffsetX = float',
      },
      {
        type: 'paragraph',
        text: "Indicates the horizontal distance the shadow should extend from the object. This value isn't affected by the transformation matrix. The default is 0.",
      },
      {
        type: 'paragraph',
        text: 'shadowOffsetY = float',
      },
      {
        type: 'paragraph',
        text: "Indicates the vertical distance the shadow should extend from the object. This value isn't affected by the transformation matrix. The default is 0.",
      },
      {
        type: 'paragraph',
        text: 'shadowBlur = float',
      },
      {
        type: 'paragraph',
        text: "Indicates the size of the blurring effect; this value doesn't correspond to a number of pixels and is not affected by the current transformation matrix. The default value is 0.",
      },
      {
        type: 'paragraph',
        text: 'shadowColor = color',
      },
      {
        type: 'paragraph',
        text: 'A standard CSS color value indicating the color of the shadow effect; by default, it is fully-transparent black.',
      },
      {
        type: 'paragraph',
        text: "The properties shadowOffsetX and shadowOffsetY indicate how far the shadow should extend from the object in the X and Y directions; these values aren't affected by the current transformation matrix. Use negative values to cause the shadow to extend up or to the left, and positive values to cause the shadow to extend down or to the right. These are both 0 by default.",
      },
      {
        type: 'paragraph',
        text: "The shadowBlur property indicates the size of the blurring effect; this value doesn't correspond to a number of pixels and is not affected by the current transformation matrix. The default value is 0.",
      },
      {
        type: 'paragraph',
        text: 'The shadowColor property is a standard CSS color value indicating the color of the shadow effect; by default, it is fully-transparent black.',
      },
      {
        type: 'subheading',
        level: 3,
        text: 'A shadowed text example',
      },
      {
        type: 'paragraph',
        text: 'This example draws a text string with a shadowing effect.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const ctx = document.getElementById("my-canvas").getContext("2d");\n\n  ctx.shadowOffsetX = 2;\n  ctx.shadowOffsetY = 2;\n  ctx.shadowBlur = 2;\n  ctx.shadowColor = "rgb(0 0 0 / 50%)";\n\n  ctx.font = "20px Times New Roman";\n  ctx.fillStyle = "Black";\n  ctx.fillText("Sample String", 5, 30);\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="150" height="80" role="presentation"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'paragraph',
        text: 'We will look at the font property and fillText method in the next chapter about drawing text.',
      },
      {
        type: 'paragraph',
        text: 'When using fill (or clip and isPointInPath) you can optionally provide a fill rule algorithm by which to determine if a point is inside or outside a path and thus if it gets filled or not. This is useful when a path intersects itself or is nested.',
      },
      {
        type: 'paragraph',
        text: 'Two values are possible:',
      },
      {
        type: 'paragraph',
        text: 'nonzero',
      },
      {
        type: 'paragraph',
        text: 'The non-zero winding rule, which is the default rule.',
      },
      {
        type: 'paragraph',
        text: 'evenodd',
      },
      {
        type: 'paragraph',
        text: 'The even-odd winding rule.',
      },
      {
        type: 'paragraph',
        text: 'In this example we are using the evenodd rule.',
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'function draw() {\n  const ctx = document.getElementById("my-canvas").getContext("2d");\n  ctx.beginPath();\n  ctx.arc(50, 50, 30, 0, Math.PI * 2, true);\n  ctx.arc(50, 50, 15, 0, Math.PI * 2, true);\n  ctx.fill("evenodd");\n}',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: '<canvas id="my-canvas" width="100" height="100" role="presentation"></canvas>',
        },
      },
      {
        type: 'code',
        code: {
          filename: 'example',
          language: 'javascript',
          code: 'draw();',
        },
      },
      {
        type: 'list',
        ordered: false,
        items: ['Previous', 'Next'],
      },
    ],
  },
} satisfies Record<string, ContentTopic>;
