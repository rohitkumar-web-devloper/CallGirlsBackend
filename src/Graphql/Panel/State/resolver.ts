import { ApolloError } from "apollo-server-express";
import db from "../../../models";
import { IResolvers } from "@graphql-tools/utils";
import { Op } from "sequelize";
import { CityAttributes } from "../../../models/city";
const States: IResolvers<any, any> = {
    Query: {
        states: async (_: any, { page = 1, pageSize = 10, filter }: { page: number, pageSize: number, filter?: any }, context: any) => {
            const { user } = context;
            // if (!user) {
            //     throw new ApolloError("Unauthorized", "Unauthorized");
            // }
            const whereConditions: any = {};
            if (filter && filter.search) {
                whereConditions[Op.or] = [
                    { name: { [Op.like]: `%${filter.search}%` } },
                ];
            }
            const offset = (page - 1) * pageSize;
            const states = await db.State.findAll({
                where: whereConditions,
                limit: pageSize,
                offset,
            })
            const totalCount = await db.State.count({ where: whereConditions });
            return {
                states,
                totalCount,
                page,
                pageSize,
                totalPages: Math.ceil(totalCount / pageSize),
            };
        },
        cities: async (_: any, { page = 1, pageSize = 10, filter, stateId }: { page: number, pageSize: number, filter?: any, stateId: number }, context: any) => {
            const { user } = context;
            // if (!user) {
            //     throw new ApolloError("Unauthorized", "Unauthorized");
            // }
            const whereConditions: any = {
                stateId
            };
            if (filter && filter.search) {
                whereConditions[Op.or] = [
                    { name: { [Op.like]: `%${filter.search}%` } },
                ];
            }
            const offset = (page - 1) * pageSize;
            const cities = await db.City.findAll({
                where: whereConditions,
                limit: pageSize,
                offset,
            })
            const totalCount = await db.City.count({
                where: whereConditions,
            });
            return {
                cities,
                totalCount,
                page,
                pageSize,
                totalPages: Math.ceil(totalCount / pageSize),
            };
        },
        modalStates: async (_: any, data: any, context: any) => {
            const { user } = context;
            if (!user) {
                throw new ApolloError("Unauthorized", "Unauthorized");
            }
          
            return await db.State.findAll()
          
        },
        modalCities: async (_: any, { stateId }: { stateId: number }, context: any) => {
            const { user } = context;
            if (!user) {
                throw new ApolloError("Unauthorized", "Unauthorized");
            }
            const whereConditions: any = {
                stateId
            };
           
            return await db.City.findAll({
                where: whereConditions,
             
            })
        }
    },
    Mutation: {
        createCity: async (_: any, data: CityAttributes, context: any) => {
            const { user } = context;
            if (!user) {
                throw new ApolloError("Unauthorized", "Unauthorized");
            }
            return await db.City.create({ ...data })
        },
        updateCity: async (_: any, data: CityAttributes, context: any) => {
            const { user } = context;
            if (!user) {
                throw new ApolloError("Unauthorized", "Unauthorized");
            }
            if (!data.id) {
                throw new ApolloError("Id is required", "Id is required");
            }
            const exist: any = await db.City.findOne({
                where: {
                    id: +data.id
                }
            })
            if (exist) {
                exist.name = data.name
                exist.stateId = data.stateId
                await exist.save()
                return { ...exist.dataValues }
            } else {
                throw new ApolloError("City is not exist", "City is not exist");
            }
        },
    }
};

export default States;
