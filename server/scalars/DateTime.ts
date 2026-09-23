import { GraphQLScalarType, Kind } from 'graphql';

export const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "DateTime custom scalar type",

  // turn the value into a Date string
  serialize: (value: any) => {
    if (!(value instanceof Date || typeof value === 'string')) {
      return null;
    }

    return value instanceof Date ? value.toISOString() : value;
  },

  // turn the value into a Date
  parseValue(value: any) {
    if (!(value instanceof Date || typeof value === 'string')) {
      return null;
    }

    return new Date(value);
  },

  parseLiteral(ast) { // ast = abstract syntax tree
    if (ast.kind !== Kind.STRING) {
      return null;
    }

    return new Date(ast.value);
  }
})