import AWS from 'aws-sdk';

const emailSend = {
  passwordRecovery: async (email, token) => {
    const stage = process.env.stage;
    const sender = process.env.EMAIL;
    const url = stage === 'prod' ? `https://admin.guifter.com/recover-password/${token}` : `https://admin.staging.guifter.com/recover-password/${token}`;
    const params = {
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: 
              `<h2><img src="https://bit.ly/guifterlogo" alt="Guifter logo" width="224" height="224" /></h2>
              <h2>&iexcl;Gracias por usar Guifter!</h2>
              <p>Hemos recibido una solicitud para recuperar tu contrase&ntilde;a. Si fuiste t&uacute;, por favor presiona 
              <a href="${url}" target="_blank" rel="noopener">aqu&iacute;</a> para proceder a la actualizaci&oacute;n de tu contrase&ntilde;a.
              De lo contrario puedes ignorar este correo.</p><p>&nbsp;</p>
              <p>Si el enlace no funciona, por favor copia y pega este texto en tu navegador:
                <a href="${url}">
                    ${url}
                </a>
              </p>
              <p>Saludos!</p>
              <p>Equipo de Guifter</p><p>&nbsp;</p>`
            }
         },
         Subject: {
          Charset: 'UTF-8',
          Data: 'Recuperación de contraseña de Guifter'
        }
      },
      Source: sender,
      ReplyToAddresses: [sender]
    };
    try {
      const emailSent = await new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
      console.log({ emailSent })
      return true;
    } catch (err) {
      console.log(err)
      return false;
    }
  }
};

export default emailSend;
