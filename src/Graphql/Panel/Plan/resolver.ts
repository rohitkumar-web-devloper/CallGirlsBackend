import db from "../../../models";
import { IResolvers } from "@graphql-tools/utils";
import { UserAttributes } from "../../../models/user"
import { ApolloError } from 'apollo-server';
import { Op } from "sequelize";
import { PlanAttributes } from '../../../models/plan';
import { saveFileToServer } from "../../../SaveFileToServer";
import PlanSlot from '../../../models/planslot';

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
      const plans: any = await db.Plan.findAll({
        where: whereConditions,
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
        include: [
          {
            model: db.PlanSlot,
            as: 'timeSlots',
            attributes: ['planId', 'timeSlotId']
          },
        ],
      });
    },
  },
  Mutation: {
    createPlan: async (_: any, data: PlanAttributes | any, context: any) => {
      const { user } = context;
      if (!user) {
        throw new ApolloError("Unauthorized", "Unauthorized");
      }
      let profileUrl = null;
      const folder = 'plans';
      if (data.image) {
        const file: any = await data.image;
        const { createReadStream, filename } = file;
        try {
          profileUrl = await saveFileToServer(createReadStream, filename, folder);
        } catch (err) {
          throw new ApolloError("Error uploading file", "FILE_UPLOAD_ERROR");
        }
      }
      const result: any = await db.Plan.create({ ...data, image: profileUrl });
      for (let index = 0; index < data.timeSlots.length; index++) {
        await db.PlanSlot.create({ planId: result.id, timeSlotId: data.timeSlots[index] })
      }
      const response = await db.Plan.findOne({
        where: { id: result.id },
        include: [
          {
            model: db.PlanSlot,
            as: 'timeSlots',
            attributes: ['planId', 'timeSlotId']
          },
        ],
      })
      return response
    },
    updatePlan: async (_: any, data: PlanAttributes | any, context: any) => {
      const { user } = context;
      if (!user) {
        throw new ApolloError("Unauthorized", "Unauthorized");
      }
      const exist: any = await db.Plan.findOne({ where: { id: +data.id } })
      if (exist) {
        let profileUrl = exist.image;
        const folder = 'plans';
        if (typeof data.image !== 'string' && data.image) {
          const file: any = await data.image;
          const { createReadStream, filename } = file;
          try {
            profileUrl = await saveFileToServer(createReadStream, filename, folder);
          } catch (err) {
            throw new ApolloError("Error uploading file", "FILE_UPLOAD_ERROR");
          }
        }
        exist.description = data.description
        exist.price = data.price
        exist.credits = data.credits
        exist.type = data.type
        exist.status = data.status
        exist.name = data.name
        exist.image = profileUrl
        await exist.save()
        await db.PlanSlot.destroy({ where: { planId: exist.id } })
        for (let index = 0; index < data.timeSlots.length; index++) {
          await db.PlanSlot.create({ planId: exist.id, timeSlotId: data.timeSlots[index] })
        }
        return await db.Plan.findOne({
          where: { id: data.id },
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

