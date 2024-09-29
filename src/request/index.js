function unwrap(obj) {
  if (typeof obj !== 'object' || obj === null) { return obj; }
  const keys = Object.keys(obj);

  if (!(keys.length === 2 && keys.includes('result') && keys.includes('status'))) {
    return obj;
  };
  if (Object.keys(obj).includes("status")) {
    console.warn("[unwrap]overwrite status for ", obj)
  }
  if (0) console.log(obj.result, obj.status)
  obj.result.status = obj.status;
  return obj.result;
}

export function fget(url, succFunc, failFunc) {
  return fetch(url, { credentials: "same-origin" }).then(function (response) {

    if (response.ok) { return response; } else {
      throw new Error('fetch failed, status:' + response.status);
    }
  })
    .then(function (response) { succFunc(unwrap(response)); })
    .catch(function (error) {
      failFunc(error);
    });
}
/**
 * @function 用fetch写一个post请求。（JSON格式）
 * @param {*} url 
 * @param {*} body 
 * @param {*}succFunc 
 * @param {*} failFunc 
 */
export function fpost(url, body = {}, succFunc, failFunc) {
  return fetch(url, {
    method: "POST", body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin"
  }).then(function (response) {
    if (response.ok) { return response; }
    else { throw new Error('fpost wrong, status:' + response.status); }
  })
    .then(function (response) {
      response.json().then(function (resp) { succFunc(unwrap(resp)); }).catch(err => failFunc(err));
    })
    .catch(function (error) { failFunc(error); })
}
export function checkConnection() {
  return fget('/api/connection', i => 0, i => console.log("connection failed."));
}


export function fetchPost(pid, callback, dealError = i => console.log("[fetchPost] failed", i)) {
  return fpost("/api/post/" + pid, {}, callback, dealError)
}
export function fetchUser(uid, callback, dealError = i => console.log("[fetchUser] failed", i)) {
  return fpost("/api/user/" + uid, {}, callback, dealError)
}
export function fetchComment(cid, callback, dealError = i => console.log("[fetchComment] failed", i)) {
  return fpost("/api/comment/" + cid, {}, callback, dealError)
}
export function submitComment(something, callback) {
  something.last_update = new Date().toISOString();
  return fpost("/api/newComment", something, i => { callback(i) }, i => {
    console.log("send new Comment error:", i)
  });
}
export function submitPost(something, callback) {
  something.last_update = new Date().toISOString();
  return fpost("/api/newPost", something, callback, i => {
    console.log("send new Comment error:", i)
  });
}
export function getAvatarBlob(something, callback) {
  //TODO yet
  return fetch('/assets/avatar/' + something, { responseType: 'blob' })
    .then(response => {
      return response.arrayBuffer()
    })
    .then(buffer => {
      const blob = new Blob([new Uint8Array(buffer)], { type: 'application/octet-stream' });
      callback(blob);

    })
    .catch(error => {
      console.error(error);
    });
}