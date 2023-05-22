import Validator, {
  SyncCheckFunction,
  ValidationSchema,
} from 'fastest-validator';

export const fv = new Validator({
  defaults: {
    object: {
      strict: 'remove',
    },
  },
});

export const FvCompileSync = <T = any>(
  schema: ValidationSchema<T> | ValidationSchema<T>[],
): SyncCheckFunction => {
  return fv.compile({
    ...schema,
    $$async: false,
  }) as SyncCheckFunction;
};
