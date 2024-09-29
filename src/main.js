import { createApp } from 'vue'
import './style.css'

import App from './App.vue'
let app = createApp(App);

import naive from 'naive-ui'
app.use(naive);

import { createPinia } from 'pinia'
app.use(createPinia())
import pages from './pages'
app.use(pages)
import _stor from './storage'
globalThis.storage = _stor();
//globalThis.switchHeader = storage.switchHeader;

storage.init();
app.mount('#app')

import * as request from './request'
Object.assign(globalThis, request);




globalThis.debug = new Proxy({}, {
  get(obj, prop) {
    if (prop === 'connection') {
      fetchLog('/api/connection')
    }
    else if (prop === 'save') {
      fetchLog('/api/debug/save');
    }
    else if (prop === 'posttest') {
      fetchPost("test1", i => { console.log(i) })
    } if (prop === 'cipher') {
      // fget("/api/debug/cipher&content="+cryp.cipher("nihao"),i=>i,i=>i)
    } else {
      fetchLog('/api/debug/' + prop);
    }
  }
})

import Cookie from 'js-cookie'
Cookie.set("token", "damend", { expires: 7 })
Cookie.get('token')


// fetch('/assets/avatar/asfeeaf', { responseType: 'blob' })
//   .then(response => {console.log(response);
//     return response.arrayBuffer()  })
//   .then(buffer => {
//     const uint8Array = new Uint8Array(buffer);
//     const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
//     const imageUrl = URL.createObjectURL(blob);
//     console.log("blob:", blob, "url:", imageUrl)
//     // 创建Image对象
//     const image = new Image();

//     // 设置Image对象的src属性为URL
//     image.src = imageUrl;
//     image.id = "exp"
//     console.log(image)

//     // 将Image对象添加到页面中的图像容器
//     const imageContainer = document.getElementById('imageContainer');
//     imageContainer.appendChild(image);
    
//     // 输出Blob对象
//     fetch('/assets/avatar/asfeeaf', { responseType: 'blob' })
//       .then(res => res.blob())
//       .then(ii => console.log(ii));
//   })
//   .catch(error => {
//     console.error(error);
//   });