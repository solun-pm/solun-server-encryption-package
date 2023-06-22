import crypto = require('crypto');
import { readFileSync, writeFileSync } from 'fs';
import { birdLog } from 'solun-database-package';

const algorithm = 'aes-256-cbc';

export async function encryptFile(path: string, key: string, iv: Buffer) {
  try {
    const keyBuffer = Buffer.from(key, 'hex');
    const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);
    const fileBuffer = readFileSync(path);
    const encryptedBuffer = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
    
    writeFileSync(path, encryptedBuffer);
  } catch (err) {
    birdLog('encryptFile', err, 'error');
    console.error(err);
    return;
  }
}

export async function decryptFile(path: string, key: string, iv: string) {
  try {
    const keyBuffer = Buffer.from(key, 'hex');
    const ivBuffer = Buffer.from(iv, 'hex');
    const encryptedData = readFileSync(path);
    const decipher = crypto.createDecipheriv(algorithm, keyBuffer, ivBuffer);
    const decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
    
    writeFileSync(path, decryptedData);
  } catch (err) {
    birdLog('decryptFile', err, 'error');
    console.error(err);
    return;
  }
}

export async function decryptFileData(fileData: any, key: string, iv: string) {
  try {
    const keyBuffer = Buffer.from(key, 'hex');
    const ivBuffer = Buffer.from(iv, 'hex');

    const decipher = crypto.createDecipheriv(algorithm, keyBuffer, ivBuffer);

    const decryptedData = Buffer.concat([decipher.update(Buffer.from(fileData, 'binary')), decipher.final()]);

    return decryptedData;
  } catch (err) {
    birdLog('decryptFileData', err, 'error');
    return {
      message: "An error occurred while decrypting the file, please try again",
    };
  }
}