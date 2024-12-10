import db from "../../models";
import { IResolvers } from "@graphql-tools/utils";
import { UserAttributes } from "../../models/user"
import { ApolloError } from 'apollo-server';
import { Op } from "sequelize";
import { PlanAttributes } from '../../models/plan';

const Plan: IResolvers<any, any> = {
  Query: {
    plans: async (_: any, { page = 1, pageSize = 10, filter }: { page: number, pageSize: number, filter?: any }, context: any) => {
      const { user } = context;
      if (!user) {
        throw new Error("Unauthorized");
      }
      const whereConditions: any = {};
      if (filter && filter.search) {
        whereConditions[Op.or] = [
          { name: { [Op.like]: `%${filter.search}%` } },
          { description: { [Op.like]: `%${filter.search}%` } },
        ];
      }
      const offset = (page - 1) * pageSize;
      const plans = await db.Plan.findAll({
        where: whereConditions,
        limit: pageSize,
        offset,
      });
      const totalCount = await db.Plan.count({
        where: whereConditions,
      });
      return {
        plans,
        totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      };
    },
    plan: async (_: any, { id }: PlanAttributes) => {
      return await db.Plan.findOne({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createPlan: async (_: any, data: PlanAttributes, context: any) => {
      const { user } = context;
      if (!user) {
        throw new ApolloError("Unauthorized", "Unauthorized");
      }
      const result = await db.Plan.create({ ...data });
      return result
    },
    updatePlan: async (_: any, data: PlanAttributes, context: any) => {
      const { user } = context;
      if (!user) {
        throw new ApolloError("Unauthorized", "Unauthorized");
      }
      const exist: any = await db.Plan.findOne({ where: { id: data.id } })
      if (exist) {
        exist.description = data.description
        exist.price = data.price
        exist.credits = data.credits
        exist.timeSlots = data.timeSlots
        exist.type = data.type
        exist.status = data.status
        exist.name = data.name
        await exist.save()
        return { ...exist.dataValues, message: 'Plan Updated', success: true }
      } else {
        return { message: 'Plan Not Found', success: false }
      }
    },
    deletePlan: async (_: any, { id }: UserAttributes, context: any) => {
      const { user } = context;
      if (!user) {
        throw new ApolloError("Unauthorized", "Unauthorized");
      }
      const exist: any = await db.Plan.findOne({ where: { id } })
      if (exist) {
        const result = await db.Plan.destroy({ where: { id } })
        if (result)
          return { ...exist.dataValues, message: 'Plan Deleted', success: true }
      } else {
        return { message: 'Plan Not Found', success: false }
      }
    },
  },
};

export default Plan;

