import { Address } from "symbol-sdk/symbol";

// chapter1 文字列からアドレスを作りましょう

const addressFromString = new Address(
  "TDWZ55R5XEJFUTKL2FXIEKW2UTNFVNPB2VFMZZA"
);

console.log(addressFromString);
console.log(addressFromString.bytes);
console.log(addressFromString.toNamespaceId());
console.log(addressFromString.toString());

// chapter2 バイト配列からアドレスが作れます

const bytes = new Uint8Array([
  152, 237, 158, 246, 61, 185, 18, 90, 77, 75, 209, 110, 130, 42, 218, 164, 218,
  90, 181, 225, 213, 74, 204, 228,
]);

const addressFromBytes = new Address(bytes);
console.log(addressFromBytes);

// chapter2-2 比較してみましょう

console.log(addressFromString === addressFromBytes); // falseになる

const bytesEqual = addressFromString.bytes.every(
  (value, index) => value === addressFromBytes.bytes[index]
);
console.log(bytesEqual); // trueになる

console.log(addressFromString.toString() === addressFromBytes.toString()); // trueになる

// chapter3 既存のアドレスからでもアドレスは作れます

const addressFromAddressStringVersion = new Address(addressFromString);
const addressFromAddressBytesVersion = new Address(addressFromBytes);

console.log(addressFromAddressStringVersion);
console.log(addressFromAddressBytesVersion);

console.log(addressFromBytes === addressFromAddressBytesVersion);
console.log(
  addressFromAddressBytesVersion.toString() === addressFromBytes.toString()
);
const bytesEqualCase2 = addressFromBytes.bytes.every(
  (value, index) => value === addressFromAddressBytesVersion.bytes[index]
);

console.log(bytesEqualCase2);

// chapter4 デコードされた16進数文字列からアドレスを作成
const hexString = "98FB8A1645F4FA5154725CF58F6E87F53A58F1F34C0A53EC";
const addressFromHex = Address.fromDecodedAddressHexString(hexString);
console.log(addressFromHex);

console.log(addressFromString.toJson());
console.log(addressFromBytes.toJson());
console.log(typeof addressFromAddressBytesVersion.toJson());
