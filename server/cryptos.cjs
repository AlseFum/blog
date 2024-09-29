const crypto = require('crypto');
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBn/tEQSUTXO8KegKgK5tCr
loDlfWcu4zQoS5xsZcCJwEbUNj5+1KgjqWVrvJrBNXVNxa2R1p6/4l2XgRDeAGuv
zCjVOQ+bDzXqgasFVfv/+IW9Ditm1fvPKYOWj7G/CSfPyWc70Xqk6rzFJis7wSAs
nLeL7x/1Wpomag78nMegx0Os/p66lNHyky/i8Jr+D0+hYqanHzxj30EXTw/sgzxl
vOkoPccKPdtFAMnadPY0M4ngf7t8ASVNzBYKL81IatJirZ1fteuXEQNvkp95mgvZ
Uzf0kfk4ILMciBr1gyLsv8A7UnMExb5hrDwfiq77FiymCDt6REfXD+Y5/OXwRpXF
AgMBAAE=
-----END PUBLIC KEY-----`

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQBn/tEQSUTXO8KegKgK5tCrloDlfWcu4zQoS5xsZcCJwEbUNj5+
1KgjqWVrvJrBNXVNxa2R1p6/4l2XgRDeAGuvzCjVOQ+bDzXqgasFVfv/+IW9Ditm
1fvPKYOWj7G/CSfPyWc70Xqk6rzFJis7wSAsnLeL7x/1Wpomag78nMegx0Os/p66
lNHyky/i8Jr+D0+hYqanHzxj30EXTw/sgzxlvOkoPccKPdtFAMnadPY0M4ngf7t8
ASVNzBYKL81IatJirZ1fteuXEQNvkp95mgvZUzf0kfk4ILMciBr1gyLsv8A7UnME
xb5hrDwfiq77FiymCDt6REfXD+Y5/OXwRpXFAgMBAAECggEAGDLxTwrdm//p75wc
fjzrfaIN6Fjf88cm0eGWSpr6zJMTaDofHMA7R+EZGpLOp/raivhexTrdweTYxnJg
DGiopkWpksQuX3SQpTr7Isi5VPztkeqEKu/MIo6UciqJv9xPiUhiX0cFdO6ycmXJ
VaRA6mClTUiddShaCmpPhnSs9zpaoOc258XilHUtPmSYLz7pcm3xVZds7lUF6qSM
yKGyOsvL7VdTyvx71faHSFDxrbI8OeF18zMKG8GDQhscb34ZaiwdR9D+N1YHQ9Ra
7qesjRooXHcuwy0hDXvH+yDlJ+67fsHRqijIOvEAc3Wm0OoiCDEA/XRUhvm6IFBz
i+6MAQKBgQC131zppxQLu0NBNytDaMxPvYi+21mKRFhQ7TdOFAsi4WNjWUxsNs0r
4Osz9wFnLfaOEWCGcKLcZ5dwYcbFhDOAdNvNBD7hKJ2TsDyxI9tF2Kx/yts+NXZx
WcACT2ydp+uXTCE5njn6vwR9kC94oyc3SZFG/COf+cYjJD26hcJyRQKBgQCSYbpr
vAezixU3f+0eClCnCAU4NoYqWtpMMhvuE3NAJvJwZxyUKigVt1/uNPb3bZRpOVrF
GS8gD2gzCxxn6V+PTBpGeJGhcNSfW35f5eaa8qwzb3REdJUrMGLQLmqVo5Nn3DN3
cfyzJ8Erf8a+k4tldWSA0sdIW9LKrANk0h+NgQKBgCAWr8L92piTSrN382cqV1n+
W+EovGyb0GU+5VIeUTSvRaTivYweQybpwTXi79lvj5/TSw+NUf7HPD300mhJAfk5
JQrQI/QAAYVsQ9kRNX/mUdEeTn50Wlh3eFwv/T73wKZqJTaQRzSJfVZWGToUtzeX
AE3g8LwqCp5qp4WAUiVtAoGAfEM+D8rU9tNwtWaBkejLwp+KXsfaaQYrHlfDYf1c
7u6hDE5b8mM/GABNDVgk9rItNI4dwge4+4xYtkwOVx/DoU/HVl9vsQ6pUIZI53uw
oYS0Lg3FM3+MSdePao6cqF7t+VLy1ckL7cInt5eGza1OvlhDcyB7T6+zZ51SXDoL
0wECgYEAqLCuXhWw7u96HpJDcfKKNVXSRua8oKmzt1bpI9RapzNJYzsbY6iTpvq3
O0g6oEtVyl+av0KBeC49Pd/HoGDCUGf9QzcR73Q00xfRXeNKZyjnzh6raxhUN22A
tA05si52QuGNMH8FdkIVeMau7e7OvLQcZDoybXEdsldJlDtw8jA=
-----END RSA PRIVATE KEY-----`;
// 使用公钥进行加密


// // 打印加密后的数据
// console.log('Encrypted data:', encryptedData.toString('base64'));

// // 使用私钥进行解密


// // 打印解密后的明文
// console.log('Decrypted data:', decryptedData.toString());
module.exports = {
    cipher(plaintext) {
      return encryptedData = crypto.publicEncrypt(
        {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: 'sha256',
        },
        Buffer.from(plaintext)
      );
    },
    decipher(encrypted) {
      return  decryptedData = crypto.privateDecrypt(
        {
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: 'sha256',
        },
        encrypted
      );
    }
}