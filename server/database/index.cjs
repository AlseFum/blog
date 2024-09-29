const loki = require('lokijs');
const fs = require('fs');
// const cryp = require("../cryptos.cjs");
class User {
    nickname;
    uid;
    postsID;
    authen;
    avatar;
    bindedContact;
  
}

class Post {
    pid;
    authorId;
    sub_title;
    title;
    likes;
    content;
    comments;
    reviewed;
}
class Comment {
    cid;
    fromUser;
    content;
    replyTo;
    replyId;
    comments;
}
const databaseLocation = "./server/database/blogData.jsondb";
let blogData = new loki(databaseLocation, { autoload: true });
if (fs.existsSync(databaseLocation)) {
    let jsonContent = fs.readFileSync(databaseLocation);
    blogData.loadJSON(jsonContent.toString());
}

blogData.ensureCollection = i => blogData.getCollection(i) || blogData.addCollection(i);
blogData.ensureCollection("users");
blogData.ensureCollection("posts");
blogData.ensureCollection("comments");

function banProperty(obj,propgroup){
    let newObj = {};
    for (let prop in obj) {
      if (obj[prop]!=undefined&&!propgroup.includes(prop) ){
        newObj[prop] = obj[prop];
      }
    }
    return newObj;}
function filterProperty(obj,propgroup){
    let newObj = {};
    for (let prop of propgroup) {
      if (obj[prop]!=undefined ){
        newObj[prop] = obj[prop];
      }
    }
    return newObj;
}
const { validateUser, validateComment, validatePost, isOk } = require("./validator/index.cjs")
module.exports = {

    save() {
        fs.writeFile(databaseLocation, blogData.serialize(), () => { console.log("database saved") })
    },
    /**
     * @function 使服务器读取数据。按道理不会使用这个函数
     */
    load() {
        if (fs.existsSync(databaseLocation)) {
            let jsonContent = fs.readFile(databaseLocation, (err, data) => {
                if (err) {
                    console.warn('Boosting error:', err);
                }
                blogData.loadJSON(jsonContent);
            });

        }
    },
    /**
     * @function 添加新用户。
     * @param {object} arg 用户定义。
     * @returns 
     */
    newUser(arg) {
        let n = validateUser(arg, this.blogData.getCollection("users"))
        if (!isOk(n)) { console.log("newUser error!:", n.result); return n; }

        let newUser = new User();
        Object.assign(newUser, { postsID: [], avatar: "defaultAvatar" }, banProperty(arg,["checkpassword"]));
        blogData.getCollection("users").insert(newUser);
        let resUser = this.users.findOne({ "uid": newUser.uid })
        this.save();
        return { result: resUser, status: 201 };
    },
    newPost(arg) {
        let n = validatePost(arg,
            this.blogData.getCollection("posts"),
            blogData.getCollection("users"));
        if (!isOk(n)) { console.log("validate post failed:", n.result); return n; }


        let newPost = new Post();
        Object.assign(newPost, { pid: "post" + Math.ceil(Math.random() * 10000000), comments: [] }, arg);
        this.posts.insert(newPost);

        let deAuthor = this.users.findOne({ "uid": newPost.fromUser });
        if (!deAuthor.comments) deAuthor.comments = [];
        if (!deAuthor.postsID) deAuthor.postsID = [];
        deAuthor.postsID.push(newPost.pid);
        this.users.update(deAuthor);

        this.save();
        return { result: this.posts.findOne({ "pid": newPost.pid }), status: 201 };
    },
    newComment(arg) {
        let n = validateComment(arg,
            this.blogData.getCollection("comments"),
            blogData.getCollection("users"), blogData.getCollection("posts"),
        )
        if (!isOk(n)) { console.log("newComment error!:", n.result); return n; }

        if (!arg.cid) { arg.cid = this.geneCid() }
        else if (!(arg.cid.startsWith("c"))) { arg.cid = "ca" + arg.cid; }


        if (arg.replyTo === 'comment') {
            let targetComment = this.comments.findOne({ cid: arg.replyId })
            /**@todo */
            if (!targetComment) {
                console.log("no such comment ,", arg.replyTo);
                return { result: arg, status: 404 }
            }

            if (!targetComment.comments) { targetComment.comments = [] }
            targetComment.comments.push(arg.cid);
            blogData.getCollection("comments").update(targetComment);

        } else {
            let targetPost = this.posts.findOne({ pid: arg.replyId });
            if (!targetPost) { console.log("no such post:", arg.replyId); return { status: 404, result: arg }; }

            if (!targetPost.comments) targetPost.comments = [];
            targetPost.comments.push(arg.cid);
            this.posts.update(targetPost);
        }
        let newComment = new Comment();
        Object.assign(newComment, {}, arg);
        this.comments.insert(newComment);
        let recheck = this.comments.findOne({ cid: arg.cid });
        // blogData.saveDatabase();// fs.writeFileSync(databaseLocation, blogData.serialize())
        return { status: 201, result: recheck };
    },
    geneCid() {
        return "cg" + blogData.getCollection("comments").count().toString().padStart(8, '0')
    },
    findUserByUid(uid,blockproperty=true) {
        let n = this.users.findOne({ "uid": uid });
        if (n == null) {
            return { result: false, status: 404 }
        }
        return { result: blockproperty?banProperty(n,["password","checkpassword"]):n, status: 200 };
    },
    findPostByPid(pid) {

        let n = this.posts.findOne({ "pid": pid });
        if (n == null) {
            return { result: false, status: 404 }
        }
        return { result: n, status: 200 };
    },
    findCommentByCid(cid) {
        let n = this.comments.findOne({ cid });
        if (n == null) {
            return { result: false, status: 404 }
        }
        return { result: n, status: 200 };
    },

    handleLogin(LoginInfo) {
        let u = this.findUserByUid(LoginInfo.uid,false);
        if (!isOk(u)) return { result: LoginInfo, status: 404 };


        if ((u.result.password === undefined) || u.result.password == LoginInfo.password) {
            console.log("Logined in ",u,u.result.password, LoginInfo.password)
            return { result: u.result, status: 200 };
        } else {
            return { result: LoginInfo, status: 400 };
        }
    },
    blogData,
    get users() {
        return this.blogData.getCollection("users");
    },
    get comments() {
        return this.blogData.getCollection("comments");
    }, get posts() {
        return this.blogData.getCollection("posts");
    }
}
