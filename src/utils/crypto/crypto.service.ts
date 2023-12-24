import * as CryptoJS from "crypto-js";

export function encryptData(data: string, secretKey: string): string {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
}

export function decryptData(encryptedData: string, secretKey: string, lengthPublicKey: number): string {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedString.slice(0, decryptedString.length - lengthPublicKey);
}