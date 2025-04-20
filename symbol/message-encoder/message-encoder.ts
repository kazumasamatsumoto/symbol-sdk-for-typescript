import { MessageEncoder, KeyPair } from "symbol-sdk/symbol";
import { PrivateKey } from "symbol-sdk";

// chapter1 メッセージエンコーダのインスタンスを作成
// 流れとしては
// 1. 秘密鍵を作成する
// 2. キーペアを作成する
// 3. キーペアからメッセージエンコーダのインスタンスを作成する

const privateKey = PrivateKey.random();
const keyPair = new KeyPair(privateKey);
const messageEncoder = new MessageEncoder(keyPair);
console.log(messageEncoder.publicKey);

// chapter2 メッセージの暗号化
// 1. 受信者のキーペアを作成
// 2. メッセージをテキストエンコードする
// 3. メッセージと受信者の公開鍵で暗号化する
// ポイントはmessageEncoderインスタンスには送信者の秘密鍵がすでにある

const recipientPrivateKey = PrivateKey.random();
const recipientKeyPair = new KeyPair(recipientPrivateKey);
const recipientEncoder = new MessageEncoder(recipientKeyPair);
const message = new TextEncoder().encode("こんにちは");
console.log(message);

const encodedMessage = messageEncoder.encode(
  recipientEncoder.publicKey,
  message
);
console.log(encodedMessage);

// chapter3 複号

const decodeResult = messageEncoder.tryDecode(
  recipientEncoder.publicKey,
  encodedMessage
);

console.log(decodeResult);
console.log(message.toString() === decodeResult.message.toString());
