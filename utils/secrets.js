import AWS from 'aws-sdk';

const getSecrets = (app) => {
  const region = process.env.AWS_REGION;
  const secretName = process.env.AWS_SECRET;

  // Create a Secrets Manager client
  const client = new AWS.SecretsManager({
    region
  });

  return new Promise((resolve, reject) => {
    client.getSecretValue({ SecretId: secretName }, (err, data) => {
      if (err) {
        console.log('Error al recuperar el secreto', err)
        reject(err)
      } else {
        // Decrypts secret using the associated KMS CMK.
        // Depending on whether the secret is a string or binary, one of these fields will be populated.
        let secret;
        if ('SecretString' in data) {
          secret = data.SecretString
        } else {
          let buff = new Buffer(data.SecretBinary, 'base64')
          secret = buff.toString('ascii')
        }
        const { 
          mongoUri, 
          jwtSecret, 
          braintreeMerchantId,
          braintreePublicKey,
          braintreePrivateKey,
          paypalClientId,
          paypalSecret
        } = JSON.parse(secret);
        app.set('mongoUri', mongoUri);
        app.set('jwtSecret', jwtSecret);
        app.set('braintreeMerchantId', braintreeMerchantId);
        app.set('braintreePublicKey', braintreePublicKey);
        app.set('braintreePrivateKey', braintreePrivateKey);
        app.set('paypalClientId', paypalClientId);
        app.set('paypalSecret', paypalSecret);
        resolve();
      }
    })
  })
};

export default getSecrets;
