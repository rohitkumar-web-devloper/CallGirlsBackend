import db from "../../models";
import { IResolvers } from "@graphql-tools/utils";
import { UserAttributes } from "../../models/user"
import { ApolloError } from 'apollo-server';
import { Op } from "sequelize";
import { TimeSlotsAttributes } from '../../models/timeslots';

const TimeSlot: IResolvers<any, any> = {
  Query: {
    timeSlots: async (_: any, { page = 1, pageSize = 10, filter }: { page: number, pageSize: number, filter?: any }, context: any) => {

      const { user } = context;
      if (!user) {
        throw new Error("Unauthorized");
      }
      const whereConditions: any = {};
      if (filter && filter.search) {
        whereConditions[Op.or] = [
          { name: { [Op.like]: `%${filter.search}%` } },
          { startTime: { [Op.like]: `%${filter.search}%` } },
          { endTime: { [Op.like]: `%${filter.search}%` } },
        ];
      }
      if (filter && typeof filter.status === 'boolean') {
        whereConditions.status = filter.status
      }
      const offset = (page - 1) * pageSize;
      let timeSlot;
      if (filter && filter.pagination) {
        timeSlot = await db.TimeSlots.findAll({
          where: whereConditions,
          limit: pageSize,
          offset,
        });
      } else {
        timeSlot = await db.TimeSlots.findAll({
          where: whereConditions,
        });

      }

      const totalCount = await db.TimeSlots.count({
        where: whereConditions,
      });
      return {
        timeSlot,
        totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      };
    },
    timeSlot: async (_: any, { id }: TimeSlotsAttributes) => {
      return await db.TimeSlots.findOne({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createTimeSlot: async (_: any, data: TimeSlotsAttributes, context: any) => {
      const { user } = context;
      if (!user) {
        throw new ApolloError("Unauthorized", "Unauthorized");
      }
      const result = await db.TimeSlots.create({ ...data, createdById: user.id, createdByName: user.name });
      return result
    },
    updateTimeSlot: async (_: any, data: TimeSlotsAttributes, context: any) => {
      const { user } = context;
      if (!user) {
        throw new ApolloError("Unauthorized", "Unauthorized");
      }
      const exist: any = await db.TimeSlots.findOne({ where: { id: data.id } })
      if (exist) {
        exist.name = data.name
        exist.startTime = data.startTime
        exist.endTime = data.endTime
        exist.status = data.status
        await exist.save()
        return { ...exist.dataValues, message: 'TimeSlot Updated', success: true }
      } else {
        return { message: 'TimeSlot Not Found', success: false }
      }
    },
    deleteTimeSlot: async (_: any, { id }: UserAttributes, context: any) => {
      const { user } = context;
      if (!user) {
        throw new ApolloError("Unauthorized", "Unauthorized");
      }
      const exist: any = await db.TimeSlots.findOne({ where: { id } })
      if (exist) {
        const result = await db.TimeSlots.destroy({ where: { id } })
        if (result)
          return { ...exist.dataValues, message: 'TimeSlot Deleted', success: true }
      } else {
        return { message: 'TimeSlot Not Found', success: false }
      }
    },
  },
};

export default TimeSlot;

