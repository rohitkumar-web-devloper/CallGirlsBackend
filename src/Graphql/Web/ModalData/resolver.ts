import { ApolloError } from "apollo-server-express";
import db from "../../../models";
import { IResolvers } from "@graphql-tools/utils";
import Ads from '../Ads/resolver';
import { Op } from 'sequelize';
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
            const exist = await db.Ads.findOne({
                where: {
                    createdById: user.id,
                    price: 0
                }
            })
            let res: any;
            if (exist) {
                res = await db.Plan.findAll({
                    where: {
                        status: true,
                        price: {
                            [Op.ne]: 0,
                        },
                    },
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
            } else {
                res = await db.Plan.findAll({
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
            }

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
