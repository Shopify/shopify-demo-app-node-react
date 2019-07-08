import { Page } from '@shopify/polaris';

class Signatures extends React.Component {
  render() {
    return (
      <Page>
        <div class="Polaris-Page Polaris-Page--singleColumn">

          <div class="Polaris-Page-Header Polaris-Page-Header--separator">
            <div class="Polaris-Page-Header__MainContent">
              <div class="Polaris-Page-Header__TitleActionMenuWrapper">
                <div class="Polaris-Page-Header__Title">
                  <div>
                    <h1 class="Polaris-DisplayText Polaris-DisplayText--sizeLarge">Signatures</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="Polaris-Page__Content">
            <div class="Polaris-Card">
              <div class="Polaris-Card__Header">
                <h2 class="Polaris-Heading">Enter Your Signature</h2>
              </div>
              <div class="Polaris-Card__Section">
                <div id="sketchpadapp">

                  <div class="leftside" id="leftside">
                    Works on iOS, Android and desktop/laptop touchscreens using
                    Chrome/Firefox/Safari.<br /><br />
                    <input
                      htmlFor="foo"
                      type="submit" value="Clear Sketchpad" id="clearbutton"
                      onclick="clearCanvas(canvas,ctx);"
                    />
                  </div>
                  <div class="rightside">

                    <canvas id="sketchpad" height="300" width="400" />
                  </div>
                </div>

              </div>
            </div>

            <div class="Polaris-PageActions">
              <div class="Polaris-Stack Polaris-Stack--spacingTight Polaris-Stack--distributionEqualSpacing">
                <div class="Polaris-Stack__Item">
                  <div class="Polaris-ButtonGroup">
                    <div class="Polaris-ButtonGroup__Item">
                      <button type="button" class="Polaris-Button" id="ClearButton" onclick="clearCanvas(canvas,ctx);">
                        <span
                          class="Polaris-Button__Content"
                        >
                          <span
                            class="Polaris-Button__Text"
                          >Clear Sketchpad
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="Polaris-Stack__Item">
                  <button
                    type="button" id="SaveButton" onclick="saveSignature()"
                    class="Polaris-Button Polaris-Button--primary Polaris-Button--disabled" disabled="true"
                  >
                    <span class="Polaris-Button__Content">
                      <span class="Polaris-Button__Text">
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
