function hasProperties(obj, arr) {
    if (typeof obj != "object") return false;
    for (let i of arr) {
        if (!obj.hasOwnProperty(i)) {
            return { result: false, missing: i };
        }
    }
}
module.exports = {
    isOk(n){
        if(n.status){
            return n.status>=200&&n.status<300;
        }
        else return n>=200&&n<300;
    },
    validateUser(user, userlists) {
        if (typeof user != "object") return {  status: 400, result: "Bad format of requery" }
        if (!user.uid || !user.nickname) {
            return {  status: 400, result: "No uid or nickname provided!" }
        }

        if (userlists.findOne({ uid: user.uid })
        ) {
            return {status: 409,  result:  "uid already exists",}
        } else if (
            userlists.findOne({ nickname: user.nickname })
        ) {
            return {  status: 409,result: "nickname already exists" }
        }
        return { result: true ,status:200};
    },
    validateComment(comment, commentlists, userlists, postlists) {
        if (typeof comment != "object") return { status:400,result: "Bad format of requery" }
        if (comment.fromUser == undefined || !userlists.findOne({ uid: comment.fromUser })) {
            return { result:  "no valid author!",status:404 }
        }
        let r = comment.replyTo;//postOrcomment
        if (r === "post") {
            if (!postlists.findOne({ pid: comment.replyId }).pid) {
                return { result: "not valid post id",status:404 }
            }
        } else if (r === 'comment') {
            if (!commentlists.findOne({ cid: comment.replyId }).cid) {
                return { result: "not valid comment id",status:404 }
            }
        }
        else { return { result:  "replyTo is not post or comment",status:400 } }
        return { result: true ,status:200}
    },
    validatePost(post, postlists, userlists) {
        if (typeof post != "object") return { status:400,result: "Bad format of requery" }
        if (post.fromUser == undefined || !userlists.findOne({ uid: post.fromUser })) {
            return { result:  "no valid author!",status:404 }
        }
        if(postlists.findOne({ pid: post.pid })){
            return {result:"Pid already exists",status:409}
        }

        return { result: true ,status:201}
    }
}