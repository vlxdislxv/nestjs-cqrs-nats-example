import { createUser } from 'nkeys.js';

const user = createUser();

const seed: Uint8Array = user.getSeed();
const publicKey = user.getPublicKey();

console.log('seed', new TextDecoder().decode(seed));
console.log('pk', publicKey);
