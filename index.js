const crypto = require("crypto")
const fetch = require("node-fetch")

class Booli {
  constructor(caller_id, api_key) {
    if(!api_key || !caller_id) {
      throw "You need to provide both an api key and a caller id"
    }
    this.api_key = api_key
    this.caller_id = caller_id
    this.api_url = "https://api.booli.se/"
  }

  _transformObjectToQuerystring(obj) {
    let params = []
    for(let key in obj) {
      if(obj.hasOwnProperty(key)) {
        params.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))
      }
    }
    return params.join("&")
  }

  _authQuerystring() {
    const unixTimestamp = +new Date()
    const uniqueIdentifier = Math.floor(Math.random() * 10e20).toString(20).substr(0, 16)
    let sha = crypto.createHash("sha1")
    sha.update(this.caller_id + unixTimestamp + this.api_key + uniqueIdentifier)
    return "callerId=" + this.caller_id + "&time=" + unixTimestamp +
           "&unique=" + uniqueIdentifier + "&hash=" + sha.digest("hex")
  }

  _validateObject(obj) {
    if(!obj) {
      throw "You need to provide search params to the query"
    }
    if(typeof(obj) !== "object" && typeof(obj) !== "number") {
      throw "You need to provide an object or int to the function"
    }
  }

  request(endpoint, obj) {
    let queryString = ""
    if(obj) {
      queryString = "&" + this._transformObjectToQuerystring(obj)
    }
    return fetch(this.api_url + endpoint + "/?" + this._authQuerystring() + queryString)
  }

  listings(obj) {
    this._validateObject(obj)
    if(typeof(obj) === "object") {
      return this.request("listings", obj)
    } else if (typeof(obj) === "number") {
      return this.request("listings/" + obj)
    }
  }

  sold(obj) {
    if(typeof(obj) === "object") {
      return this.request("sold", obj)
    } else if (typeof(obj) === "number") {
      return this.request("sold/" + obj)
    }
  }

  areas(obj) {
    this._validateObject(obj)
    return this.request("areas", obj)
  }
}

module.exports = Booli
