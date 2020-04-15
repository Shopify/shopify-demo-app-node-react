import { EmptyState, Layout, Page, Button } from '@shopify/polaris';
import { createApp } from '@shopify/app-bridge';
import { SessionToken } from '@shopify/app-bridge/actions';

class Index extends React.Component {

  constructor(props, state) {
    super(props, state);

    const app = createApp({
      apiKey: 'app_bridge_key',
      shopOrigin: 'shop1.myshopify.io'
    });

    this.state = {
      app,
      serverSecret: null
    };
  }

  callServer() {
    const {app} = this.state;
    app.subscribe(SessionToken.ActionType.RESPOND, (state) => {
      console.log(state);
    });
    app.dispatch(SessionToken.ActionType.REQUEST);
  }

  render() {
    return (
      <Page>
        <h1>Hello</h1>
        <Button onClick={this.callServer.bind(this)}>Call Server</Button>
        <p>{this.state.serverSecret}</p>
      </Page>
    );
  }
}

export default Index;
