// import crypto from "crypto"

// // 使用公钥进行加密


// // // 打印加密后的数据
// // console.log('Encrypted data:', encryptedData.toString('base64'));

// // // 使用私钥进行解密


// // // 打印解密后的明文
// // console.log('Decrypted data:', decryptedData.toString());
// export default {
//     cipher(plaintext) {
//       return encryptedData = crypto.publicEncrypt(
//         {
         

//           key: publicKey,
//           padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//           oaepHash: 'sha256',
//         },
//         Buffer.from(plaintext)
//       );
//     },
//     decipher(encrypted) {
//       return  decryptedData = crypto.privateDecrypt(
//         {
//           key: privateKey,
//           padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//           oaepHash: 'sha256',
//         },
//         encrypted
//       );
//     }
// }