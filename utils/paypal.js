import paypal from '@paypal/checkout-server-sdk';

const paypalActions = {
  getOrderDetails: async (clientId, clientSecret, orderId) => {
    const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
    const client = new paypal.core.PayPalHttpClient(environment);

    const request = new paypal.orders.OrdersGetRequest(orderId);

    let order;
    
    try {
      order = await client.execute(request);
    } catch (err) {
      throw new Error('paypalRequestFailed');
    }
  
    return order;
  }
};

export default paypalActions;