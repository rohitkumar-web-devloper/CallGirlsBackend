import db from "../../models";
import { IResolvers } from "@graphql-tools/utils"; // or '@apollo/server'
import { StudentAttributes } from '../../models/students';

const Student: IResolvers<any, any> = {
  Query: {
    students: async () => {
      return await db.Students.findAll();
    },
    student: async (_: any, { id }: { id: string }) => {
      return await db.Students.findOne({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createStudent: async (
      _: any,
      {
        name,
        email,
        degree,
        age,
      }: StudentAttributes
    ) => {
      const user = db.Students.create({ name, email, degree, age });
      return user;
    },
    updateStudent: async (
      _: any,
      {
        id,
        name,
        email,
        degree,
        age,
      }: StudentAttributes
    ) => {
      const exist = await db.Students.findOne({
        where: {
          id: Number(id)
        }
      }) as StudentAttributes | null;
      if (exist) {
        exist.name = name
        exist.email = email
        exist.degree = degree
        exist.age = age
        await exist?.save()
        return { ...exist.dataValues, message: 'Student Found', success: true }
      } else {
        return { message: 'Student Not Found', success: false }
      }
    },
    deleteStudent: async (_: any, { id }: { id: number }) => {
      const exist = await db.Students.findOne({
        where: {
          id: Number(id)
        }
      }) as StudentAttributes | null;
      if (exist) {
        const result = await db.Students.destroy({ where: { id } })
        if (result)
          return { ...exist.dataValues, message: 'User Deleted', success: true }
      } else {
        return { message: 'User Not Found', success: false }
      }
    },
  },
};

export default Student;
