import db from "../../models";
import { IResolvers } from "@graphql-tools/utils";
import { CategoriesAttributes } from '../../models/categories'
import { ApolloError } from "apollo-server";
import { Op } from 'sequelize';
import { saveFileToServer } from "../../SaveFileToServer";
const Categories: IResolvers<any, any> = {
    Query: {
        categories: async (_: any, { page = 1, pageSize = 10, filter }: { page: number, pageSize: number, filter?: any }, context: any) => {
            const { user } = context;
            if (!user) {
                throw new Error("Unauthorized");
            }
            const whereConditions: any = {};
            if (filter) {
                if (filter.name) {
                    whereConditions.name = {
                        [Op.like]: `%${filter.name}%`,
                    };
                }
                if (filter.status !== undefined) {
                    whereConditions.status = filter.status;
                }
            }
            const offset = (page - 1) * pageSize;
            const categories = await db.Categories.findAll({
                where: whereConditions,
                limit: pageSize,
                offset,
            });

            const totalCount = await db.Categories.count({
                where: whereConditions,
            });

            return {
                categories,
                totalCount,
                page,
                pageSize,
                totalPages: Math.ceil(totalCount / pageSize),
            };
        },
        category: async (_: any, { id }: CategoriesAttributes) => {
            const data: any = await db.Categories.findOne({
                where: {
                    id,
                    status: true
                },
            });
            return { ...data.dataValues, message: 'Category find successfully', success: true }
        },
    },

    Mutation: {
        createCategories: async (_: any, data: CategoriesAttributes, context: any) => {
            const { user } = context;
            if (!user) {
                throw new Error("Unauthorized");
            }
            const exist = await db.Categories.findOne({
                where: {
                    name: data.name
                }
            })
            if (exist)
                throw new ApolloError("Already Exist", "Already Exist");
            let profileUrl = null;
            const folder = 'customers';
            if (data.image) {
                const { file }: any = data.image;
                const { createReadStream, filename } = file;

                try {
                    profileUrl = await saveFileToServer(createReadStream, filename, folder);
                } catch (err) {
                    throw new ApolloError("Error uploading file", "FILE_UPLOAD_ERROR");
                }
            }
            const category = await db.Categories.create({ ...data, image: profileUrl, createdById: user.id, createdByName: user.name });
            return { ...category.dataValues, message: 'Category Created', success: true };
        },
        updateCategories: async (_: any, data: CategoriesAttributes, context: any) => {
            const { user } = context;
            if (!user) {
                throw new Error("Unauthorized");
            }
            const exist: any = await db.Categories.findOne({
                where: { id: data.id },
            })
            if (!exist) {
                throw new ApolloError("Category does not exist", "Category does not exist");
            }
            let profileUrl = exist.profile;
            const folder = 'customers';
            if (typeof data.image !== 'string' && data.image) {
                const { file }: any = data.image;
                const { createReadStream, filename } = file;
                try {
                    profileUrl = await saveFileToServer(createReadStream, filename, folder);
                } catch (err) {
                    throw new ApolloError("Error uploading file", "FILE_UPLOAD_ERROR");
                }
            }
            exist.name = data.name;
            exist.image = profileUrl
            exist.description = data.description
            exist.status = data.status;
            exist.createdById = user.id;
            exist.createdByName = user.name;
            await exist.save();
            return { ...exist.dataValues, message: "Category Updated", success: true };
        },
        deleteCategories: async (_: any, { id }: CategoriesAttributes, context: any) => {
            const { user } = context;
            if (!user) {
                throw new Error("Unauthorized");
            }
            const exist = await db.Categories.findOne({
                where: { id }
            })
            if (!exist)
                throw new ApolloError("Category does not exist", "Category does not exist");

            const cat: any = await db.Categories.destroy({
                where: { id },
            })
            if (cat)
                return { message: "Category Deleted", success: true };
        }
    },
};

export default Categories;
