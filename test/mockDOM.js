const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = (new JSDOM(`
<!doctype html>
<html>
<body>
    <div id="container"></div>
    <div id="border"></div>
    <h1 id="text" class="text"></h1>
    <div id="gui">
        <div class="gui-element" id="playPause"><p>PAUSE</p></div>
        <div class="gui-element" id="restart"><p>RESTART</p></div>
        <div class="gui-element" id="shuffle"><p>SHUFFLE ARROWS</p></div>
        <div class="gui-element" id="random"><p>RANDOM SQUARE</p></div>
        <div class="gui-element" id="resize"><p>RESIZE BOARD</p></div>
        <div class="resize-box">
            <span id="size-text">BOARD SIZE</span>
            <input id="resize-input" type="number" value="4" min="1" max="20" onkeydown="game.resizeOnEnter(this)"/>
        </div>
    </div>
</body>
</html>`)).window;

global.document = document;
global.window = document.defaultView;

Object.keys(window).forEach(key => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});