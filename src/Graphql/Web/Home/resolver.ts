import { ApolloError } from "apollo-server-express";
import db from "../../../models";
import { IResolvers } from "@graphql-tools/utils";
import { Sequelize } from 'sequelize';
const Home: IResolvers<any, any> = {
    Query: {
        homeCategory: async (_: any, data: any, context: any) => {
            const { user } = context;

            if (!user) {
                throw new ApolloError("Unauthorized", "Unauthorized");
            }

            const categories: any = await db.Categories.findAll({
                attributes: [
                    'id',
                    'name',
                    'image',
                    'description',
                ],
                where: { status: true },
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

            const datass = await categories.map((category: any) => (
                {
                    id: category.id,
                    name: category.name,
                    image: category.image,
                    description: category.description,
                    ads: category.ads.map((ad: any) => (
                        {
                            city: ad.city,
                            city_count: ad.dataValues.city_count,
                        })),
                }));
            return datass
        },
    },
};

export default Home;
