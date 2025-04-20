import { KeyPair } from "symbol-sdk/symbol";
import { PrivateKey } from "symbol-sdk";
// import sizeof from "object-sizeof";

// chapter1 KerPairの作成

const privateKey = PrivateKey.random();

console.log(privateKey);

// このsizeについてはちょっと趣味でやった
// const size = sizeof(privateKey);
// console.log(`privateKey size: ${size} bytes`);

const keyPair = new KeyPair(privateKey);

console.log(keyPair);

// chapter2 公開鍵の取得

const publicKey = keyPair.publicKey;
console.log(publicKey);

// 署名

const message = new TextEncoder().encode("Hello, world!");

const signature = keyPair.sign(message);
console.log("Signature:", signature);
