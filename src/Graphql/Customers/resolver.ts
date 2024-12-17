import db from "../../models";
import { IResolvers } from "@graphql-tools/utils";
import { passwordCompare, passwordEncrypt, generateToken } from "../../helpers";
import { ApolloError } from 'apollo-server';
import { Op } from "sequelize";
import { saveFileToServer } from "../../SaveFileToServer";
import { CustomerAttributes } from '../../models/customer';
import SendMail from "../../helpers/SendMail";
const Customer: IResolvers<any, any> = {
  Query: {
    customers: async (_: any, { page = 1, pageSize = 10, filter }: { page: number, pageSize: number, filter?: any }, context: any) => {
      const { user } = context;

      if (!user) {
        throw new Error("Unauthorized");
      }

      const whereConditions: any = {};

      if (filter && filter.search) {
        whereConditions[Op.or] = [
          { firstName: { [Op.like]: `%${filter.search}%` } },
          { lastName: { [Op.like]: `%${filter.search}%` } },
          { mobile: { [Op.like]: `%${filter.search}%` } },
          { email: { [Op.like]: `%${filter.search}%` } },
        ];
      }

      const offset = (page - 1) * pageSize;

      const customers = await db.Customer.findAll({
        where: whereConditions,
        limit: pageSize,
        offset,
      });

      const totalCount = await db.Customer.count({
        where: whereConditions,
      });

      return {
        customers,
        totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      };
    },
    customer: async (_: any, { id }: CustomerAttributes) => {
      return await db.Customer.findOne({
        where: {
          id,
        },
      });
    },
  },

  Mutation: {
    loginCustomer: async (_: any, data: CustomerAttributes) => {
      const exist: any = await db.Customer.findOne({
        where:
        {
          [Op.or]: [
            { email: data.email },
            { mobile: data.email }
          ],
        }
      })
      if (!exist) {
        throw new ApolloError("User does not exist", "USER_NOT_FOUND");
      } else {
        if (!await passwordCompare(data.password, exist.password)) {
          throw new ApolloError("Password not match", "Password not match");
        }
        exist.token = await generateToken({ id: exist.id, name: exist.name });
        await exist.save();
        return { message: "Customer Login Successfully", success: true, ...exist.dataValues }
      }
    },
    logoutCustomer: async (_: any, { email, password }: CustomerAttributes, context: any) => {
      const { user } = context;

      if (!user) {
        throw new Error("Unauthorized");
      }

      const exist: any = await db.Customer.findOne({ where: { id: user.id } })
      if (!exist) {
        throw new ApolloError("Customer does not exist", "CUSTOMER_NOT_FOUND");
      } else {
        exist.token = ''
        await exist.save()
        return { message: "Customer Logut Successfully", success: true, }
      }
    },
    registerCustomer: async (_: any, data: CustomerAttributes, context: any) => {
      const exist: any = await db.Customer.findOne({
        where: {
          [Op.or]: [
            { email: data.email },
            { mobile: data.mobile }
          ],
        }
      });
      if (exist) {
        throw new ApolloError("Email/Mobile Already Exists", "EMAIL_ALREADY_EXISTS");
      }
      let profileUrl = null;
      const folder = 'customers';
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
      const count = await db.Customer.count()
      const result = await db.Customer.create({
        ...data,
        token: await generateToken({ id: count + 1, name: data.firstName, email: data.email }),
        password: encryptedPassword,
        profile: profileUrl,
      });
      return result;
    },
    updateCustomer: async (_: any, data: CustomerAttributes, context: any) => {
      const { user } = context;
      if (!user) {
        throw new ApolloError("Unauthorized", "Unauthorized");
      }
      const exist: any = await db.Customer.findOne({ where: { id: user.id } })
      if (exist) {
        let profileUrl = exist.profile;
        const folder = 'customers';
        if (typeof data.profile !== 'string' && data.profile) {
          const { file }: any = data.profile;
          const { createReadStream, filename } = file;
          try {
            profileUrl = await saveFileToServer(createReadStream, filename, folder);
          } catch (err) {
            throw new ApolloError("Error uploading file", "FILE_UPLOAD_ERROR");
          }
        }

        if (!await passwordCompare(data.password, exist.password)) {
          exist.password = await passwordEncrypt(data.password)
        }
        exist.profile = profileUrl
        exist.mobile = data.mobile
        exist.firstName = data.firstName
        exist.lastName = data.lastName
        exist.email = data.email
        exist.status = data.status
        await exist.save()
        return { ...exist.dataValues, message: 'Customer Updated', success: true }
      } else {
        return { message: 'Customer Not Found', success: false }
      }
    },
    forgatePassword: async (_: any, data: CustomerAttributes, context: any) => {
      const exist: any = await db.Customer.findOne({ where: { email: data.email } })
      if (exist) {
        // SendMail()
        if (!await passwordCompare(data.password, exist.password)) {
          exist.password = await passwordEncrypt(data.password)
          await exist.save()
          return { ...exist.dataValues, message: 'Password Updated', success: true }
        }
      } else {
        return { message: 'Customer Not Found', success: false }
      }
    },
  },
};

export default Customer;

