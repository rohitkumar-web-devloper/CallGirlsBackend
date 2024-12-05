import db from "../../models";
import { IResolvers } from "@graphql-tools/utils"; // or '@apollo/server'
import { UserAttributes } from "../../models/user"
import { passwordCompare, passwordEncrypt, generateToken } from "../../helpers";
import { Model } from "sequelize";
import { Op } from "sequelize";
const User: IResolvers<any, any> = {
  Query: {
    users: async (_: any, __: any, context: any) => {
      const { user } = context;

      if (!user) {
        throw new Error("Unauthorized");
      }
      return await db.User.findAll({});
    },
    user: async (_: any, { id }: UserAttributes) => {
      return await db.User.findOne({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    loginUser: async (_: any, { email, password }: UserAttributes) => {
      const exist = await db.User.findOne({ where: { email } }) as UserAttributes | null
      if (exist) {
        if (await passwordCompare(password, exist.password)) {
          return { message: "Password not match", success: false, }
        }
        exist.token = await generateToken({ id: exist.id, name: exist.name });
        await exist.save();
        return { message: "User Login Successfully", success: true, ...exist.dataValues }
      } 
    },
    createUser: async (
      _: any,
      { name, email }: { name: string; email: string }
    ) => {
      const user = db.User.create({ name, email });
      return user;
    },
    updateUser: async (
      _: any,
      { id, name, email }: UserAttributes
    ) => {
      const exist = await db.User.findOne({ where: { id } }) as UserAttributes | null
      if (exist) {
        exist.name = name
        exist.email = email
        await exist.save()
        return { ...exist.dataValues, message: 'User Updated', success: true }
      } else {
        return { message: 'User Not Found', success: false }
      }
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      const exist = await db.User.findOne({ where: { id } }) as UserAttributes | null
      if (exist) {
        const result = await db.User.destroy({ where: { id } })
        if (result)
          return { ...exist.dataValues, message: 'User Deleted', success: true }
      } else {
        return { message: 'User Not Found', success: false }
      }
    },
  },
};

export default User;
function tokenGenerate(user: Model<any, any>): any {
  throw new Error("Function not implemented.");
}

