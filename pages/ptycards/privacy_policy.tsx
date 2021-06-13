import Head from 'next/head';

export default function PrivacyPolicyPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Politíca de Privacidad</title>
        <meta name="description" content="Politíca de Privacidad" />
      </Head>

      <div className="themed">
        <h1>Pol&iacute;tica de Privacidad</h1>
        <h3>Acceso a la C&aacute;mara</h3>
        Usada por la aplicaci&oacute;n para escanear el c&oacute;digo datamatrix de las tarjetas del Metrobus. Esta imagen se procesa localmente sin enviar nada a ning&uacute;n servidor.
        <h3>N&uacute;mero de Tarjeta Metrobus/Rapipass</h3>
        Utilizado para consultar el saldo de las tarjetas. Esta informaci&oacute;n es enviada temporalmente a nuestros servidores para obtener el saldo. Ninguna informaci&oacute;n es almacenada en
        nuestros servidores.
        <h3>N&uacute;mero de Panapass</h3>
        Utilizado para consultar el saldo del servicio. Esta informaci&oacute;n es enviada temporalmente a nuestros servidores para obtener el saldo. Ninguna informaci&oacute;n es almacenada en
        nuestros servidores.
        <h3>N&uacute;mero de cliente del IDAAN</h3>
        Utilizado para consultar la &uacute;ltima factura. Esta informaci&oacute;n es enviada temporalmente a nuestros servidores para obtener la factura. Ninguna informaci&oacute;n es almacenada en
        nuestros servidores.
        <h3>N&uacute;mero NAC y contrase&ntilde;a de ENSA</h3>
        Utilizado para consultar la &uacute;ltima factura. Esta informaci&oacute;n es enviada temporalmente a nuestros servidores para obtener la factura. Ninguna informaci&oacute;n es almacenada en
        nuestros servidores. La contrase&ntilde;a se almacena encriptada localmente en el disposivo.
        <h3>Nombre de usuario y contrase&ntilde;a de Uni&oacute;n Fenosa</h3>
        Utilizado para consultar la &uacute;ltima factura. Esta informaci&oacute;n es enviada temporalmente a nuestros servidores para obtener la factura. Ninguna informaci&oacute;n es almacenada en
        nuestros servidores. La contrase&ntilde;a se almacena encriptada localmente en el disposivo.
      </div>
    </>
  );
}
