import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { PORT } from './constants/Variables';
import requireDir from 'require-dir';
import { expressMiddleware } from '@apollo/server/express4';
import createApolloGraphQlServer from './Graphql';
import authMiddleware from './Middleware/atuh';
import cors from 'cors'
app.use(cors({
  origin: "*", // Replace with the allowed origin(s)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true // Allow credentials (cookies, etc.)
}));

// Load routes and controllers
requireDir("./routes");
// Basic routes
app.get('/', (req, res) => {
  res.send('<center><h2>Welcome to Developer world...Ram</h2></center>');
});
app.get('/dude', (req, res) => {
  res.json({ type: 'success', name: 'Rohit' });
});
// GraphQL connection setup
const startServer = async () => {
  app.use(
    '/graphql',
    expressMiddleware(await createApolloGraphQlServer(), {
      context: async ({ req }) => {
        const user = authMiddleware(req);
        return { user };
      },
    }),
  );

  app.listen(PORT, () => {
    console.log(`Server is running process on Port : http://localhost:${PORT}/graphql`);
  });
};
startServer();
// testing message
