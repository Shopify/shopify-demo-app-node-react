const dotenv = require('dotenv');
dotenv.config();

const { API_VERSION } = process.env;

async function processPayment(ctx, next) {
  if (ctx.query.charge_id) {
    const chargeUrl = `admin/api/${API_VERSION}/recurring_application_charges`;
    const options = {
      credentials: 'include',
      headers: {
        'X-Shopify-Access-Token': ctx.session.accessToken,
        'Content-Type': 'application/json'
      }
    };
    const optionsWithGet = { ...options, method: 'GET' };
    const optionsWithPost = { ...options, method: 'POST' };
    fetch(
      `https://${ctx.session.shop}/${chargeUrl}/${ctx.query.charge_id}.json`,
      optionsWithGet
    )
      .then(response => response.json())
      .then(myJson => {
        if (myJson.recurring_application_charge.status === 'accepted') {
          const stringifyMyJSON = JSON.stringify(myJson);
          const optionsWithJSON = { ...optionsWithPost, body: stringifyMyJSON };
          fetch(
            `https://${ctx.session.shop}/${chargeUrl}/${
              ctx.query.charge_id
            }/activate.json`,
            optionsWithJSON
          )
            .then(response => response.json())
            .catch(error => console.log('error', error));
        } else return ctx.redirect('/');
      });

    return ctx.redirect('/');
  } else {
    await next();
  }
}
module.exports = processPayment;
