const https = require('https');

const url = 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Leonardo_%28Teenage_Mutant_Ninja_Turtles%29.jpg/220px-Leonardo_%28Teenage_Mutant_Ninja_Turtles%29.jpg';

https.get(url, (res) => {
  console.log(`Status: ${res.statusCode}`);
});
