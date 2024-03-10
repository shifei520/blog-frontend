import { sm2 } from 'sm-crypto';

/** 前端国密sm2加密 */
export function sm2Encrypt(pwd: string) {
  const publicKey =
    '04df2cf66daf18f51b093be3c9d9366d062f01d1c85669433d3e8c2c19318e0c9d1587e45b6d61bfba2ffeaef2193d9cad40b3cf8a946f14d52aa0f45341ff155f';
  const cipherMode = 1;

  return sm2.doEncrypt(pwd, publicKey, cipherMode);
}
