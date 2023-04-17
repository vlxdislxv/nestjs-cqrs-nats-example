import { createUser } from 'nkeys.js';

const user = createUser();

const seed: Uint8Array = user.getSeed();

const publicKey = user.getPublicKey();
const secret = new TextDecoder().decode(seed);

console.log('pk', publicKey);
console.log('secret', secret);
