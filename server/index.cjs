const express = require('express');
const dbFuncs = require("./database/index.cjs");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let cookieparser = require('cookie-parser')
app.use(cookieparser());
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://example.com'); // 设置允许跨域请求的域名
//   res.header('Access-Control-Allow-Credentials', true); // 允许发送 Cookie
//   next();
// });

app.route('/', (req, res) => {
  res.send(fs.readFileSync(path.resolve(__dirname, '../dist/index.html')).toString());
});

app.get("/assets/avatar/:avatarName", (req, res) => {
  const imagePath = './dist/defaultAvatar.png';
  fs.readFile(imagePath, (err, data) => { 
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    const buffer = Buffer.from(data);
    res.set('Content-Type', 'application/octet-stream');
    res.send(buffer);
  });
})
app.get('/assets/*', (req, res) => {
  // console.log(`Require assets: ${req.path}.`);
  res.sendFile(req.path, { root: "./dist/" });
});
app.post("/api/login", (req, res) => {
  let n = dbFuncs.handleLogin(req.body);
  n.result.status = n.status;
  res.send(n.result);
})
app.post("/api/register", (req, res) => {
  res.send(dbFuncs.newUser(req.body));
  // console.log("Register.");
})

app.post("/api/newUser", (req, res) => {
  let n = dbFuncs.newUser(req.body)
  res.send(n);
})
app.post("/api/newPost", (req, res) => {
  let n = dbFuncs.newPost(req.body)
  res.send(n);
})
app.post("/api/newComment", (req, res) => {
  ;
  res.send(dbFuncs.newComment(req.body));
})


app.route("/api/post/:pid").all(function (req, res) {
  let info = dbFuncs.findPostByPid(req.params.pid);
  res.send(info)
});

app.route("/api/user/:uid").all(function (req, res) {
  let info = dbFuncs.findUserByUid(req.params.uid);
  res.send(info)
});

app.route("/api/comment/:cid").all(function (req, res) {
  let info = dbFuncs.findCommentByCid(req.params.cid);
  res.send(info)
});




app.all("/api/connection", (req, res) => { res.send(true); })


// const cryp = require("./cryptos.cjs")
// app.get("/api/debug/:command", (req, res) => {
//   console.log("DebugCommand received: ", req.params.command);
//   if (req.params.command == "save") {
//     res.send(dbFuncs.save());
//   }
//   else if (req.params.command == "newUser") {
//     dbFuncs.newUser({
//       uid: req.query.uid ?? "defaultUser",
//       avatar: req.query.avatar ?? "defaultAvatar",
//     })
//     res.send(true);
//   }
//   else if (req.params.command == "getUsers") {
//     res.send(dbFuncs.users.data);
//   }
//   else if (req.params.command == "eval") {
//     res.send(Function(req.query.evalF)());
//   } else if (req.params.command === "comments") {
//     res.send(dbFuncs.comments.data);
//   }
//   else if (req.params.command === "null") {
//     res.send(null);
//   }
//   else if (req.params.command === "cipher") {
//     res.send(cryp.decipher(req.query.content))
//   }

// })
//查询，生成列表
app.all("/api/posts/:requery", (req, res) => {
  res.send(dbFuncs.posts.data);
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const repl = require("repl")
let d = repl.start()
d.context.dbFuncs = dbFuncs;
