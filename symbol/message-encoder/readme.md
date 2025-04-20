# Symbol SDK の MessageEncoder クラス - 公開鍵暗号を使った安全なメッセージングの実装

## 概要

Symbol SDK の`MessageEncoder`クラスは、公開鍵暗号方式を使用して二者間のメッセージを安全に暗号化・復号するためのユーティリティクラスです。このドキュメントでは、`MessageEncoder`の基本的な使い方と、メッセージの暗号化・復号の流れを説明します。

## クラスの基本情報

- **クラス名**: `MessageEncoder`
- **目的**: 公開鍵暗号方式を使用したメッセージの暗号化および復号
- **依存モジュール**:
  - `KeyPair`（`symbol-sdk/symbol`）
  - `PublicKey`（`symbol-sdk/CryptoTypes.js`）
  - `PrivateKey`（`symbol-sdk`）

## 基本的な使用フロー

### 1. インスタンスの作成

メッセージのエンコード/デコードを行うには、まず秘密鍵からキーペアを作成し、そのキーペアを使って`MessageEncoder`のインスタンスを作成します。

```typescript
import { MessageEncoder, KeyPair } from "symbol-sdk/symbol";
import { PrivateKey } from "symbol-sdk";

// 秘密鍵を作成（ランダムまたは既存の秘密鍵を使用）
const privateKey = PrivateKey.random();

// キーペアを作成
const keyPair = new KeyPair(privateKey);

// メッセージエンコーダのインスタンスを作成
const messageEncoder = new MessageEncoder(keyPair);

// 公開鍵の確認
console.log(messageEncoder.publicKey);
```

### 2. メッセージの暗号化

送信者は受信者の公開鍵を使用してメッセージを暗号化します。

```typescript
// 受信者のキーペアを作成
const recipientPrivateKey = PrivateKey.random();
const recipientKeyPair = new KeyPair(recipientPrivateKey);
const recipientEncoder = new MessageEncoder(recipientKeyPair);

// 暗号化するメッセージを準備（文字列をバイト配列に変換）
const message = new TextEncoder().encode("こんにちは");

// 送信者が受信者の公開鍵を使ってメッセージを暗号化
const encodedMessage = messageEncoder.encode(
  recipientEncoder.publicKey,
  message
);

console.log(encodedMessage); // 暗号化されたメッセージ（Uint8Array）
```

### 3. メッセージの復号

受信者は自分の秘密鍵と送信者の公開鍵を使ってメッセージを復号します。

```typescript
// 受信者がメッセージを復号
const decodeResult = recipientEncoder.tryDecode(
  messageEncoder.publicKey, // 送信者の公開鍵
  encodedMessage
);

// 復号結果の確認
if (decodeResult.isDecoded) {
  // 復号が成功した場合、バイト配列を文字列に変換
  const decodedMessage = new TextDecoder().decode(decodeResult.message);
  console.log("復号されたメッセージ:", decodedMessage);
} else {
  console.log("メッセージの復号に失敗しました");
}
```

## 完全な実装例

以下は、送信者と受信者の間でのメッセージの暗号化と復号の完全な流れを示す実装例です。

```typescript
import { MessageEncoder, KeyPair } from "symbol-sdk/symbol";
import { PrivateKey } from "symbol-sdk";

// 送信者側の準備
const senderPrivateKey = PrivateKey.random();
const senderKeyPair = new KeyPair(senderPrivateKey);
const senderEncoder = new MessageEncoder(senderKeyPair);

// 受信者側の準備
const recipientPrivateKey = PrivateKey.random();
const recipientKeyPair = new KeyPair(recipientPrivateKey);
const recipientEncoder = new MessageEncoder(recipientKeyPair);

// 暗号化するメッセージの準備
const plainMessage = "こんにちは、Symbol SDKを使った安全な通信です！";
const messageBytes = new TextEncoder().encode(plainMessage);

// 送信者が受信者の公開鍵を使ってメッセージを暗号化
const encryptedMessage = senderEncoder.encode(
  recipientEncoder.publicKey,
  messageBytes
);

console.log("暗号化されたメッセージ:", encryptedMessage);

// 受信者が送信者の公開鍵を使ってメッセージを復号
const decodeResult = recipientEncoder.tryDecode(
  senderEncoder.publicKey,
  encryptedMessage
);

// 復号結果の処理
if (decodeResult.isDecoded) {
  const decodedMessage = new TextDecoder().decode(decodeResult.message);
  console.log("復号されたメッセージ:", decodedMessage);
  console.log("元のメッセージと一致:", plainMessage === decodedMessage);
} else {
  console.log("メッセージの復号に失敗しました");
}
```

## 重要なポイント

1. **秘密鍵の保護**: 秘密鍵は絶対に他人と共有してはいけません。暗号化・復号のプロセスでは公開鍵のみが交換されます。

2. **公開鍵の交換**: 安全な通信のためには、送信者と受信者が事前に公開鍵を交換している必要があります。

3. **非推奨メソッド**: `tryDecodeDeprecated`および`encodeDeprecated`メソッドは古いウォレットとの互換性のためだけに提供されており、新規開発では使用すべきではありません。

4. **特殊な用途**: `encodePersistentHarvestingDelegation`メソッドは Symbol ブロックチェーンのハーベスティング機能に関連した特殊な用途のためのメソッドです。

## ユースケース

- ブロックチェーン上でのウォレット間の安全なメッセージング
- 暗号化されたメモやノートの保存
- ハーベスティング委任のための暗号化されたリクエストの作成

## まとめ

`MessageEncoder`クラスを使用することで、Symbol SDK において公開鍵暗号方式に基づいた安全なメッセージングを簡単に実装することができます。このクラスは、メッセージの暗号化と復号のための標準的なインターフェースを提供し、ブロックチェーン上での安全なコミュニケーションを可能にします。
