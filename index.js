
const jwt = require("jsonwebtoken");
const info = {
    name: "Juan Felipe"
}
const signature = "my_secret_password";
const token = jwt.sign(info, signature);
console.log(token); // Outputs encryption algorithm: Specific, encrypted word that can be decrypted using a key

// Verify signature
const decoded = jwt.verify(token, signature);
console.log(decoded);

