booli-api
=========

# Install

`npm install booli-api --save`

# Usage

You will need a caller id and an api key which you can request [at Booli.se](https://www.booli.se/api/key).

```javascript
var Booli = require('booli-api');

var booli = new Booli("caller-id", "api-key");

booli.listings({q: "stockholm", maxListPrice: 2500000}).then((res) => {
  if(res.statusCode === 200) {
    res.json().then((res) => {
      console.log(res);
    });
  } else {
    // error
  }
});
```

# Endpoints

  - `Booli.listings(obj or id)`
  - `Booli.sold(obj or id)`
  - `Booli.areas(id)`
