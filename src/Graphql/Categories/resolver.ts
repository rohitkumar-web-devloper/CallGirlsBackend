import db from "../../models";
import { IResolvers } from "@graphql-tools/utils";
import { CategoriesAttributes } from '../../models/categories'
const Categories: IResolvers<any, any> = {
    Query: {
        categories: async (_: any, __: any, context: any) => {
            const { user } = context;
            if (!user) {
                throw new Error("Unauthorized");
            }
            return await db.Categories.findAll({
                where: {
                    status: true
                }
            });
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
                    name:data.name
                }
            })
            if (exist)
                return { message: 'Already Exist', success: false };
            const category = await db.Categories.create({ ...data, createdById: user.id, createdByName: "Ram" });
            return { ...category.dataValues, message: 'Category Created', success: true };
        },
        updateCategories: async (_: any, { id, name }: CategoriesAttributes, context: any) => {
            const { user } = context;
            if (!user) {
                throw new Error("Unauthorized");
            }
            const exist: any = await db.Categories.findOne({
                where: { id },
            })
            if (!exist) {
                return { message: "Category does not exist", success: false };
            }
            exist.name = name;
            exist.createdById = user.id;
            exist.createdByName = "ram";
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
                return { message: "Category is not exist", success: false }

            const cat: any = await db.Categories.destroy({
                where: { id },
            })
            if (cat)
                return { message: "Category Deleted", success: true };
        }
    },
};

export default Categories;
