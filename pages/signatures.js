import { Page } from '@shopify/polaris';
import './signatures.css';
import SignatureCanvas from 'react-signature-canvas';

class Signatures extends React.Component {

  constructor() {
    super();
    this.state = {
      isClear: true,
    };
  }

  saveSignature() {
    const data = this.sigCanvas.toDataURL('image/jpeg', 1.0);
    console.log(data);
  }

  clearSignature() {
    this.sigCanvas.clear();
    this.setState({ isClear: true });
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
                      type="submit" value="Clear Sketchpad" id="clearbutton"
                      onClick={this.clearSignature.bind(this)}
                    />
                  </div>
                  <div className="rightside">
                    <div id="sketchpad">
                      <SignatureCanvas
                        id="sketchpad"
                        ref={(ref) => { this.sigCanvas = ref; }}
                        penColor="black"
                        canvasProps={{ width: 400, height: 300, className: 'sigCanvas' }}
                        onBegin={() => {
                          this.setState({ isClear: false });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="Polaris-PageActions">
              <div className="Polaris-Stack Polaris-Stack--spacingTight Polaris-Stack--distributionEqualSpacing">
                <div className="Polaris-Stack__Item">
                  <div className="Polaris-ButtonGroup">
                    <div className="Polaris-ButtonGroup__Item">
                      <button type="button" className="Polaris-Button" id="ClearButton" onClick={this.clearSignature.bind(this)}>
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
                    type="button" id="SaveButton" onClick={this.saveSignature.bind(this)}
                    className={`Polaris-Button Polaris-Button--primary  ${this.state.isClear ? "Polaris-Button--disabled" : ''}`} disabled={this.state.isClear}
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
