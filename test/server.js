var http = require("http")
var parse = require("url").parse
var parse_qs = require("querystring").parse

module.exports = TestServer

function TestServer() {
  this.server = http.createServer(this.router)
  this.port = 5555
  this.hostname = "localhost"
  this.server.on("connection", (socket) => {
    socket.setTimeout(1500)
  })
  this.server.on("error", (err) => {
    console.log(err.stack)
  })
}

TestServer.prototype.router = (req, res) => {
  let parsed = parse(req.url)
  let path = parsed.pathname
  let qs = parse_qs(parsed.query)

  // console.log("hello?")
  // console.log(qs, path)

  if(path === "/listings/") {
    res.statusCode = 200
    res.setHeader("content-type", "application/json")
    res.end(JSON.stringify({
			name: 'value'
		}))
  }
  if(path === "/listings/123/") {
    res.statusCode = 200
    res.setHeader("content-type", "application/json")
    res.end(JSON.stringify({
			name: 'value'
		}))
  }
  if(path === "/sold/") {
    res.statusCode = 200
    res.setHeader("content-type", "application/json")
    res.end(JSON.stringify({
			name: 'value'
		}))
  }
  if(path === "/sold/123/") {
    res.statusCode = 200
    res.setHeader("content-type", "application/json")
    res.end(JSON.stringify({
			name: 'value'
		}))
  }
  if(path === "/areas/") {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({
			name: 'value'
		}))
  }
  if(path === "//") {
    res.statusCode = 200
    res.end("lorem ipsum")
  }
}

TestServer.prototype.start = function(callback) {
  this.server.listen(this.port, this.hostname, callback)
}

TestServer.prototype.stop = function(callback) {
  this.server.close(callback)
}
