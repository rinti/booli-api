var chai = require("chai")
var cap = require("chai-as-promised")
chai.use(cap)
var expect = chai.expect
var fetch = require("node-fetch")
var parse = require("url").parse
var parse_qs = require("querystring").parse

var TestServer = require("./server")
var Booli = require("../index")

let local

describe("booli-api", function() {
  let booli = new Booli("lorem", "ipsum")
  booli.api_url = "http://localhost:5555/"

  before(function(done) {
    local = new TestServer()
    local.start(done)
  })
  after(function(done) {
    local.stop(done)
  })

  it("to throw error without credentials", function() {
    expect(() => {
      new Booli()
    }).to.throw("You need to provide both an api key and a caller id")

    expect(() => {
      new Booli("only one credential")
    }).to.throw("You need to provide both an api key and a caller id")
  })

  it("to throw when calling listings without search params or invalid params", function() {
    expect(() => {
      booli.listings()
    }).to.throw("You need to provide search params to the query")
  })

  it("should have all the auth related query params in the request", function() {
    return booli.request("").then((res) => {
      let parsed = parse(res.url)
      let qs = parse_qs(parsed.query)
      expect(
        Object.keys(qs).sort().join(",")
      ).to.equal("callerId,hash,time,unique")
    })
  })

  it("should add the items from an object as query params", function() {
    return booli.request("", {lorem: "ipsum"}).then((res) => {
      let parsed = parse(res.url)
      let qs = parse_qs(parsed.query)
      expect(
        qs["lorem"]
      ).to.equal("ipsum")
    })
  })

  it(".listings() should query the /listings endpoint", function() {
    return booli.listings({q: "stockholm"}).then((res) => {
      let parsed = parse(res.url)
      expect(
        parsed.pathname
      ).to.equal("/listings/")
    })
  })

  it(".listings() should pass items from object to query string in the /listings endpoint", function() {
    return booli.listings({q: "stockholm", minListPrice: 1000000}).then((res) => {
      let parsed = parse(res.url)
      let qs = parse_qs(parsed.query)
      expect(
        qs["q"]
      ).to.equal("stockholm")
      expect(
        qs["minListPrice"]
      ).to.equal("1000000")
    })
  })

  it(".listings(:id) should query the /listings/:id endpoint", function() {
    return booli.listings(123).then((res) => {
      let parsed = parse(res.url)
      expect(
        parsed.pathname
      ).to.equal("/listings/123/")
    })
  })


  it(".sold() should query the /sold endpoint", function() {
    return booli.sold({q: "stockholm"}).then((res) => {
      let parsed = parse(res.url)
      expect(
        parsed.pathname
      ).to.equal("/sold/")
    })
  })

  it(".sold() should pass items from object to query string in the /sold endpoint", function() {
    return booli.sold({q: "stockholm", minListPrice: 1000000}).then((res) => {
      let parsed = parse(res.url)
      let qs = parse_qs(parsed.query)
      expect(
        qs["q"]
      ).to.equal("stockholm")
      expect(
        qs["minListPrice"]
      ).to.equal("1000000")
    })
  })

  it(".sold(:id) should query the /sold/:id endpoint", function() {
    return booli.sold(123).then((res) => {
      let parsed = parse(res.url)
      expect(
        parsed.pathname
      ).to.equal("/sold/123/")
    })
  })

  it(".areas() should query the /areas endpoint", function() {
    return booli.areas({q: "stockholm"}).then((res) => {
      let parsed = parse(res.url)
      expect(
        parsed.pathname
      ).to.equal("/areas/")
    })
  })

  it(".areas() should pass items from object to query string in the /areas endpoint", function() {
    return booli.areas({q: "nacka"}).then((res) => {
      let parsed = parse(res.url)
      let qs = parse_qs(parsed.query)
      expect(
        qs["q"]
      ).to.equal("nacka")
    })
  })
})
