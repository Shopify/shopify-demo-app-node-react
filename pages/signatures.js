import { Page } from '@shopify/polaris';
import './signatures.css';

 // Variables for referencing the canvas and 2dcanvas context
let canvas;
let ctx;

 // Variables to keep track of the mouse position and left-button status
let mouseX;
let mouseY;
let mouseDown = 0;

 // Variables to keep track of the touch position
let touchX;
let touchY;

 // Keep track of the old/last position when drawing a line
 // We set it to -1 at the start to indicate that we don't have a good value for it yet
// let lastX;
// let lastY = -1;

class Signatures extends React.Component {

  // Clear the canvas context using the canvas width and height
  clearCanvas(canvasParam) {
    ctx.clearRect(0, 0, canvasParam.width, canvasParam.height);
    document.getElementById('SaveButton').classList.add('Polaris-Button--disabled');
    document.getElementById("SaveButton").disabled = true;
  }

// Keep track of the mouse button being pressed and draw a dot at current location
  sketchpad_mouseDown() {
    mouseDown = 1;
    this.drawLine(ctx, mouseX, mouseY, 4);
  }

// Keep track of the mouse button being released
  sketchpad_mouseUp() {
    mouseDown = 0;

    // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
    // lastX = -1;
    // lastY = -1;
  }

// Keep track of the mouse position and draw a dot if mouse button is currently pressed
  sketchpad_mouseMove(e) {
    // Update the mouse co-ordinates when moved
    this.getMousePos(e);

    // Draw a dot if the mouse button is currently being pressed
    if (mouseDown === 1) {
      this.drawLine(ctx, mouseX, mouseY, 4);
    }
  }

// Get the current mouse position relative to the top-left of the canvas
  getMousePos(e) {
    // if (!e) { var e = event; }

    if (e.offsetX) {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
    } else if (e.layerX) {
      mouseX = e.layerX;
      mouseY = e.layerY;
    }
  }

// Draw something when a touch start is detected
  sketchpad_touchStart() {
    // Update the touch co-ordinates
    this.getTouchPos();

    this.drawLine(ctx, touchX, touchY, 6);

    // Prevents an additional mousedown event being triggered
    event.preventDefault();
  }

  sketchpad_touchEnd() {
    // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
    lastX = -1;
    lastY = -1;
  }

// Draw something and prevent the default scrolling when touch movement is detected
  sketchpad_touchMove(e) {
    // Update the touch co-ordinates
    this.getTouchPos(e);

    // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
    this.drawLine(ctx, touchX, touchY, 6);

    // Prevent a scrolling action as a result of this touchmove triggering.
    event.preventDefault();

  }

// Get the touch position relative to the top-left of the canvas
// When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
// but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
// "target.offsetTop" to get the correct values in relation to the top left of the canvas.
  getTouchPos(e) {
    // if (!e) { var e = event; }

    if (e.touches) {
      if (e.touches.length === 1) { // Only deal with one finger
        const touch = e.touches[0]; // Get the information for finger #1
            // touchX=touch.pageX-touch.target.offsetLeft;
            // touchY=touch.pageY-touch.target.offsetTop;
        const canvOffset = $("#sketchpad").offset();
        myX = touch.target.offsetLeft + canvOffset.left;
        myY = touch.target.offsetTop + 80;
        touchX = touch.pageX - myX;
        touchY = touch.pageY - myY;
//               var offset = $("#sketchpad").offset();
//                 touchX=touch.pageX-touch.offset.left;
//                 touchY=touch.pageY-touch.offset.top;
      }
    }
  }

  setupCanvas() {
    // Get the specific canvas element from the HTML document
    canvas = document.getElementById('sketchpad');

    // If the browser supports the canvas tag, get the 2d drawing context for this canvas
    if (canvas.getContext) { ctx = canvas.getContext('2d'); }

           // Check that we have a valid context to draw on/with before adding event handlers
    if (ctx) {
               // React to mouse events on the canvas, and mouseup on the entire document
      canvas.addEventListener('mousedown', this.sketchpad_mouseDown.bind(this), false);
      canvas.addEventListener('mousemove', this.sketchpad_mouseMove.bind(this), false);
      window.addEventListener('mouseup', this.sketchpad_mouseUp.bind(this), false);

               // React to touch events on the canvas
      canvas.addEventListener('touchstart', this.sketchpad_touchStart.bind(this), false);
      canvas.addEventListener('touchend', this.sketchpad_touchEnd.bind(this), false);
      canvas.addEventListener('touchmove', this.sketchpad_touchMove.bind(this), false);
    }
  }

  saveSignature() {
    console.log("todo");
  }

  componentDidMount() {
    console.log("Signature component mounted");
    this.setupCanvas();
    console.log("canvas is set up");

  }

  render() {
    return (
      <Page>
        <div className="Polaris-Page Polaris-Page--singleColumn">

          <div className="Polaris-Page-Header Polaris-Page-Header--separator">
            <div className="Polaris-Page-Header__MainContent">
              <div className="Polaris-Page-Header__TitleActionMenuWrapper">
                <div className="Polaris-Page-Header__Title">
                  <div>
                    <h1 className="Polaris-DisplayText Polaris-DisplayText--sizeLarge">Signatures</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="Polaris-Page__Content">
            <div className="Polaris-Card">
              <div className="Polaris-Card__Header">
                <h2 className="Polaris-Heading">Enter Your Signature</h2>
              </div>
              <div className="Polaris-Card__Section">
                <div id="sketchpadapp">

                  <div className="leftside" id="leftside">
                    Works on iOS, Android and desktop/laptop touchscreens using
                    Chrome/Firefox/Safari.<br /><br />
                    <input
                      htmlFor="foo"
                      type="submit" value="Clear Sketchpad" id="clearbutton"
                      onClick={() => this.clearCanvas(canvas, ctx)}
                    />
                  </div>
                  <div className="rightside">
                    <canvas id="sketchpad" height="300" width="400" />
                  </div>
                </div>

              </div>
            </div>

            <div className="Polaris-PageActions">
              <div className="Polaris-Stack Polaris-Stack--spacingTight Polaris-Stack--distributionEqualSpacing">
                <div className="Polaris-Stack__Item">
                  <div className="Polaris-ButtonGroup">
                    <div className="Polaris-ButtonGroup__Item">
                      <button type="button" className="Polaris-Button" id="ClearButton" onClick={() => this.clearCanvas(canvas, ctx)}>
                        <span
                          className="Polaris-Button__Content"
                        >
                          <span
                            className="Polaris-Button__Text"
                          >Clear Sketchpad
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="Polaris-Stack__Item">
                  <button
                    type="button" id="SaveButton" onClick={this.saveSignature()}
                    className="Polaris-Button Polaris-Button--primary Polaris-Button--disabled" disabled
                  >
                    <span className="Polaris-Button__Content">
                      <span className="Polaris-Button__Text">
                        Save
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Page>
    );
  }
}

export default Signatures;
