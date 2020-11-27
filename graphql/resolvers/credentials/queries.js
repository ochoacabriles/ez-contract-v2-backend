const credentialsQueries = {
  getPaypalCredentials: (_, {}, { res }) => ({
    clientId: res.app.get('paypalClientId'),
    secret: res.app.get('paypalSecret')
  })
};

export default credentialsQueries;
