var sys = require("sys");
var e = require("express")
var http = require("http")
var request = require('request');

// Need GHCONSUMER and GHSECRET libraries

var consumer = process.env.GHCONSUMER;
var secret = process.env.GHSECRET;
var auth_url = "https://github.com/login/oauth/authorize?client_id=" + consumer + "&redirect_uri=" + encodeURIComponent("http://localhost:8888/callback")
var access_token = "https://github.com/login/oauth/access_token?client_id=" + consumer + "&redirect_uri=" + encodeURIComponent("http://localhost:8888/callback") + "&client_secret=" + secret + "&code="

sys.puts("Authorization URL")
sys.puts(auth_url);

app = e.createServer();
app.configure(function () {
    app.use(app.router);
    app.use(e.errorHandler({ dumpExceptions: false, showStack: false }));
});
app.listen(8888);
app.get('/callback', function(req, res) {
    request({uri: access_token + req.query.code}, function (err, reqres, reqbody) {
        if (!err) {
            console.log("response returned: " + reqbody);
            res.send(reqbody);
        } else {
            res.send("Error");
        }
    });
});
