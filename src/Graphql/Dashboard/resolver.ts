import { ApolloError } from "apollo-server-express";
import db from "../../models";
import { IResolvers } from "@graphql-tools/utils";
const Dashboard: IResolvers<any, any> = {
    Query: {
        dashboard: async (_: any, data: any, context: any) => {
            const { user } = context;
            if (!user) {
                throw new ApolloError("Unauthorized", "Unauthorized");
            }
            const userCount = await db.User.count();
            const plan = await db.Plan.count();
            const ads = await db.Ads.count()
            const category = await db.Categories.count()
            const timeSlot = await db.TimeSlots.count()
            return {
                addCount: ads,
                userCount: userCount,
                planCount: plan,
                categoryCount: category,
                timeSlotCount: timeSlot
            };
        },

    },
};

export default Dashboard;
