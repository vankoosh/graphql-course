import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './server/**/*.graphql', // path to graphql files
  generates: {
    "./server/types/resolvers-types.ts": { // path to generated types
      plugins: ['typescript-resolvers', 'typescript'], // plugins to use
      config: {
        contextType: '../context#Context',
        defaultMapper: "Partial<{T}>"
      }
    }
  }
}

export default config;