import Validator from 'fastest-validator';

export const fv = new Validator({
  defaults: {
    object: {
      $$strict: 'remove',
    },
  },
});
