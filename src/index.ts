import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { PORT } from './constants/Variables';
import { expressMiddleware } from '@apollo/server/express4';
import createApolloGraphQlServer from './Graphql';
import authMiddleware from './Middleware/atuh';
import cors from 'cors'
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import db from './models';
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.get('/cities', async (): Promise<any> => {
  const categoriesWithTopCities = await db.Categories.findAll({
    attributes: {
      include: [
        [Sequelize.fn('COUNT', Sequelize.col('ads.id')), 'total_ads'],
      ],
    },
    include: [
      {
        model: db.Ads,
        as: 'ads',
        attributes: [
          'city',
          [Sequelize.fn('COUNT', Sequelize.col('ads.city')), 'city_count'],
        ],
        order: [[Sequelize.fn('COUNT', Sequelize.col('ads.city')), 'DESC']],
      },
    ],
    group: ['Categories.id', 'ads.city'], 
  });
  
  




  console.log(categoriesWithTopCities[0].dataValues.ads, '------------------------------city');
  return categoriesWithTopCities

})

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
const startServer = async () => {
  app.use(
    '/graphql',
    expressMiddleware(await createApolloGraphQlServer(), {
      context: async ({ req }) => {
        const user = await authMiddleware(req);
        return { user };
      },
    }),
  );

  app.listen(PORT, () => {
    console.log(`Server is running process on Port : http://localhost:${PORT}/graphql`);
  });
};

startServer();

