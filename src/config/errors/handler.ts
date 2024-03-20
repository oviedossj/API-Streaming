import { GraphQLError } from 'graphql';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function errorHandler(err: any | string) {
  if (typeof err === 'string') {
    return new GraphQLError(err, {
      extensions: {
        code: 'INTERNAL_ERROR',
        status: 500,
      },
    });
  }
  return new GraphQLError(err.message, {
    extensions: {
      code: err.code,
      status: err.status,
    },
  });
}

export function unauthorized() {
  return new GraphQLError('User not allowed', {
    extensions: {
      code: 'UNAUTHORIZED',
      status: 401,
    },
  });
}
