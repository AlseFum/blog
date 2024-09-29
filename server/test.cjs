const cryp=require("./cryptos.cjs");
let n=cryp.cipher("nihaowo")
console.log(n)
console.log(n.toString("base64"))
console.log(cryp.decipher(n).toString())