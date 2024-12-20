import { ApolloError } from "apollo-server-express";
import db from "../../../models";
import { IResolvers } from "@graphql-tools/utils";
import { Sequelize } from 'sequelize';
const ModalData: IResolvers<any, any> = {
    Query: {
        modalCategory: async (_: any, data: any, context: any) => {
            const { user } = context;

            if (!user) {
                throw new ApolloError("Unauthorized", "Unauthorized");
            }

            return await db.Categories.findAll({ where: { status: true } });
        },
        modalPlans: async (_: any, data: any, context: any) => {
            const { user } = context;

            if (!user) {
                throw new ApolloError("Unauthorized", "Unauthorized");
            }

            const res:any = await db.Plan.findAll({
                where: { status: true },
                include: [
                    {
                        model: db.PlanSlot,
                        as: 'timeSlots',
                        attributes: ['planId', 'timeSlotId'],
                        include: [
                            {
                                model: db.TimeSlots, 
                                as: 'slots', 
                                attributes: ['startTime', 'endTime'],
                            }
                        ]
                    },
                ],
            });
            return res
        },
        AdsOnCat: async (_: any, data: any, context: any) => {
            const { user } = context;
            if (!user) {
                throw new ApolloError("Unauthorized", "Unauthorized");
            }
            const res = await db.Ads.findAll({ where: { categoryId: data.catId } });
            return res
        },

    },
};

export default ModalData;
