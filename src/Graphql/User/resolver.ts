import db from "../../models";
import { IResolvers } from "@graphql-tools/utils";
import { UserAttributes } from "../../models/user"
import { passwordCompare, passwordEncrypt, generateToken } from "../../helpers";
import { ApolloError } from 'apollo-server';
import { Op } from "sequelize";
import { GraphQLUpload } from 'graphql-upload-ts';
import { saveFileToServer } from "../../SaveFileToServer";
const User: IResolvers<any, any> = {
  Query: {
    users: async (_: any, { page = 1, pageSize = 10, filter }: { page: number, pageSize: number, filter?: any }, context: any) => {
      const { user } = context;

      if (!user) {
        throw new Error("Unauthorized");
      }

      const whereConditions: any = {
        id: {
          [Op.ne]: user.id,
        },
      };

      if (filter && filter.search) {
        whereConditions[Op.or] = [
          { name: { [Op.like]: `%${filter.search}%` } },
          { email: { [Op.like]: `%${filter.search}%` } },
        ];
      }

      const offset = (page - 1) * pageSize;

      const users = await db.User.findAll({
        where: whereConditions,
        limit: pageSize,
        offset,
      });

      const totalCount = await db.User.count({
        where: whereConditions,
      });

      return {
        users,
        totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      };
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
      const exist: any = await db.User.findOne({ where: { email, status: true } })
      if (!exist) {
        throw new ApolloError("User does not exist", "USER_NOT_FOUND");
      } else {
        if (!await passwordCompare(password, exist.password)) {
          throw new ApolloError("Password not match", "Password not match");
        }
        exist.token = await generateToken({ id: exist.id, name: exist.name });
        await exist.save();
        return { message: "User Login Successfully", success: true, ...exist.dataValues }
      }
    },
    logoutUser: async (_: any, { email, password }: UserAttributes, context: any) => {
      const { user } = context;

      if (!user) {
        throw new Error("Unauthorized");
      }

      const exist: any = await db.User.findOne({ where: { id: user.id } })
      if (!exist) {
        throw new ApolloError("User does not exist", "USER_NOT_FOUND");
      } else {
        exist.token = ''
        await exist.save()
        return { message: "User Logut Successfully", success: true, }
      }
    },
    createUser: async (_: any, data: UserAttributes, context: any) => {
      const { user } = context;
      if (!user) {
        throw new ApolloError("Unauthorized", "UNAUTHORIZED");
      }
      const exist: any = await db.User.findOne({ where: { email: data.email } });
      if (exist) {
        throw new ApolloError("Email Already Exists", "EMAIL_ALREADY_EXISTS");
      }
      let profileUrl = null;
      const folder = 'users';
      if (data.profile) {
        const { file }: any = data.profile;
        const { createReadStream, filename } = file;

        try {
          profileUrl = await saveFileToServer(createReadStream, filename, folder);
        } catch (err) {
          throw new ApolloError("Error uploading file", "FILE_UPLOAD_ERROR");
        }
      }
      const encryptedPassword = await passwordEncrypt(data.password);
      const result = await db.User.create({
        ...data,
        password: encryptedPassword,
        profile: profileUrl,
      });
      return result;
    },
    updateUser: async (_: any, data: UserAttributes, context: any) => {
      const { user } = context;
      if (!user) {
        throw new ApolloError("Unauthorized", "Unauthorized");
      }
      const exist: any = await db.User.findOne({ where: { id: data.id } })
      if (exist) {
        let profileUrl = data.profile;
        const folder = 'users';
        if (typeof data.profile !== 'string') {
          const { file }: any = data.profile;
          const { createReadStream, filename } = file;
          try {
            profileUrl = await saveFileToServer(createReadStream, filename, folder);
          } catch (err) {
            throw new ApolloError("Error uploading file", "FILE_UPLOAD_ERROR");
          }
        }
        if (data.password) {
          exist.password = await passwordEncrypt(data.password)
        }
        console.log(profileUrl, typeof data.profile,'ooooooooooooooooooooooooooooooo');
        exist.profile = profileUrl
        exist.mobile = data.mobile
        exist.name = data.name
        exist.email = data.email
        exist.status = data.status
        await exist.save()
        return { ...exist.dataValues, message: 'User Updated', success: true }
      } else {
        return { message: 'User Not Found', success: false }
      }
    },
    deleteUser: async (_: any, { id }: UserAttributes, context: any) => {
      const { user } = context;
      if (!user) {
        throw new ApolloError("Unauthorized", "Unauthorized");
      }
      const exist: any = await db.User.findOne({ where: { id } })
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

