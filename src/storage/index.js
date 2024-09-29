import { defineStore } from 'pinia';
import { fpost, fetchPost, fetchUser, fetchComment } from '../request'
function isOk(obj) {
    if (typeof obj === 'object') {
        return obj.status >= 200 && obj.status < 300;
    } else return obj >= 200 && obj < 300;
}
function availCheck(obj) {
    return obj !== undefined && typeof obj === "object" && Object.keys(obj).length > 0;
}
export default defineStore('client', {
    state: () => {
        return {
            hideHeader: false,

            currentUid: "cola_replica01",
            currentUserName: "可乐复制体",
            currentUserAvatar: null,

            cachedPosts: new Map(),
            cachedUsers: new Map(),
            cachedComments: new Map(),
        }
    },
    actions: {
        getPost(pid, callback = i => i) {
            if (this.cachedPosts.get(pid)) {
                return callback(this.cachedPosts.get(pid));
            }
            else {
                let _this = this;
                return fetchPost(pid, post => { _this.cachedPosts.set(pid, post); callback(post); })
            }
        },
        getUser(uid, callback = i => i.result) {
            let n = this.cachedUsers.get(uid);
            if (availCheck(n)) {
                return callback(n);
            }
            else {
                let _this = this;
                return fetchUser(uid, user => {
                    _this.cachedUsers.set(uid, user);
                    callback(user);
                })
            }
        },
        getComment(cid, callback = i => i) {
            if (this.cachedComments.get(cid)) {
                return callback(this.cachedComments.get(cid));
            }
            else {
                //fetch to get ,and set
                let _this = this;
                return fetchComment(cid, comment => {
                    _this.cachedComments.set(cid, comment);
                    callback(comment);
                })
            }
        }, 
        updatePost(pid, callback) {
            console.log("updating post ", pid)
            let _this = this;
            fetchPost(pid, newPost => {
                let oldPost = _this.cachedPosts.get(pid);
                if (oldPost.last_update == newPost.last_update) {
                    if (1) callback(newPost);
                }
                else {
                    callback(newPost);
                    _this.cachedPosts.set(pid, newPost);
                }
            })
        },
        updateUser(uid, callback) {
            let _this = this;
            fetchUser(uid, newUser => {
                let oldUser = _this.cachedUsers.get(uid);
                if (oldUser.last_update == newUser.last_update);
                else {
                    callback(newUser);
                    _this.cachedUsers.set(uid, newUser);
                }
            })
        },
        updateComment(cid, callback) {

            let _this = this;
            fetchComment(cid, newComment => {
                let oldComment = _this.cachedComments.get(cid);
                if (oldComment.last_update == newComment.last_update);
                else {
                    callback(newComment);
                    _this.cachedComments.set(cid, newComment);
                }
            })
        },
        switchHeader() {
            this.hideHeader = !this.hideHeader;
        },
        init() {
            let _t = this;
            fpost("/api/posts/mainpage", {},
                ii => {
                    if (0) console.log("Grabbed Posts:", ii)
                    ii.forEach(d => {
                        _t.cachedPosts.set(d.pid, d);
                        _t.getUser(d.authorId);
                    })
                },
                i => { console.error("/api/posts/mainpage ",i) })
        }, 
        handleRegister(registerInfo, callback = i => 0) {
            fpost("/api/register", registerInfo,
                ii => {
                    ii => {
                        if (ii.result == undefined || ii.result == true) {
                            callback(ii);
                        } else {
                            console.log("register failed", ii);
                            callback(ii);
                        }
                    }
                },
                () => { })
        },
        handleLogin(loginInfo, callback = ic => ic) {
            let handleSucc = ii => {
                if (isOk(ii)) {
                    globalThis.handleSuccInfo = ii;
                    storage.currentUid = ii.uid;
                    storage.currentUserName = ii.nickname ?? ii.uid;
                    callback(Object.assign(ii, { status: ii.status }));
                } else {
                    if (0) console.log("login failed", ii);
                    callback(ii);
                }

            }
            fpost("/api/login", loginInfo,
                handleSucc,
                i => {
                    if (0) console.log("login failed", i);
                    callback(i);
                })
        },
        handleLogout(callback = i => i) {
            this.currentUid = null;
            this.currentUserAvatar = null;
            this.currentUserName = null;
            callback();
        }
    },
})