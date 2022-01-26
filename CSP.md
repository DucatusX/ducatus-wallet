To prevent unautorized network access, Ducatus Wallet above use the following Content Security Policy (CSP)

  <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-eval' https://bws.bitpay.com
  https://bitpay.com https://auth.shapeshift.io https://shapeshift.io https://api.coinbase.com https://coinbase.com; 
  img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self' data:">
  
This restrict network connections to the listed hosts only. As a consecuence, accessing self-hosted DucatusCore Wallet Service 
(DWS) hosts will not be allowed. If you are using a self-hosted BWS you need to build the app yourself from source 
and modify that above line (at app-template/index-template.html) to match your host.
