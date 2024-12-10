// graphql.d.ts or any other TypeScript declaration file
import { Upload } from 'graphql-upload-ts'; // Import the Upload scalar type directly

declare global {
  namespace ApolloServer {
    interface Context {
      Upload: Upload;  // Use the scalar type directly
    }
  }
}
