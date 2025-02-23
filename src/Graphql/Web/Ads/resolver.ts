import db from "../../../models";
import { IResolvers } from "@graphql-tools/utils";
import { AdsAttributes } from "../../../models/ads"
import { GraphQLUpload } from "graphql-upload-ts";
import MultipleFileUpload from "../../../MultipleFileUpload";
import { ApolloError, UserInputError } from "apollo-server-express";
import { Op, Sequelize } from "sequelize";
import moment from 'moment';
import { log } from "node:console";
import {formatString} from "../../../helpers";
const Ads: IResolvers<any, any> = {
  Upload: GraphQLUpload,
  Query: {
    ads: async (_: any, data: any, context: any) => {
      const { user } = context;
      if (!user) {
        throw new Error("Unauthorized");
      }


      try {
        const ads: any = await db.Ads.findAll({
          where: {
            createdById: data.createdById
          },
          include: [
            {
              model: db.Service,
              as: 'services',
              attributes: ['name'],
            },
            {
              model: db.AttentionTo,
              as: 'attentionTo',
              attributes: ['name'],
            },
            {
              model: db.PlaceOfService,
              as: 'placeOfServices',
              attributes: ['name'],
            },
          ],
        })
        return ads.map((ad: any) => {
          const attentionData = ad.attentionTo ? ad?.attentionTo.map((item: any) => item.dataValues) : []
          const servicesData = ad.services ? ad?.services.map((item: any) => item.dataValues) : []
          const placeOfServicesData = ad.placeOfServices ? ad?.placeOfServices.map((item: any) => item.dataValues) : []
          return {
            ...ad.toJSON(),
            services: servicesData,
            profile: Array(ad.profile),
            attentionTo: attentionData,
            placeOfService: placeOfServicesData,
            paymentMethod: Array(ad.paymentMethod),
          };
        });
      } catch (error) {
        console.error("Error fetching ads:", error);
        throw new Error("Failed to fetch ads");
      }
    },
    ad: async (_: any, { id }: AdsAttributes) => {
      try {
        const ad: any = await db.Ads.findOne({ where: { id } })
        return {
          ...ad.dataValues,
          services: Array(ad.services),
          profile: Array(ad.profile),
          attentionTo: Array(ad.attentionTo),
          placeOfService: Array(ad.placeOfService),
          paymentMethod: Array(ad.paymentMethod)
        };
      } catch (error) {
        console.error("Error fetching ads:", error);
        throw new Error("Failed to fetch ads");
      }
    },
    normalAds: async (_: any, { page = 1, pageSize = 10, filter }: any, context: any) => {
      let whereCondition: any = {}
      if (filter.categoryId) {
        whereCondition = {
          ...whereCondition,
          categoryId: filter.categoryId
        }
      }
      if (filter.category_handler) {
        whereCondition = {
          ...whereCondition,
          category_handler: filter.category_handler
        }
      }
      if (filter.city_handler) {
        whereCondition = {
          ...whereCondition,
          city_handler: filter.city_handler
        }
      }
      if (filter.state) {
        whereCondition = {
          ...whereCondition,
          state: filter.state
        }
      }
      if (filter.city) {
        whereCondition = {
          ...whereCondition,
          city: filter.city
        }
      }
      if (filter.hair) {
        whereCondition = {
          ...whereCondition,
          hair: filter.hair
        }
      }
      if (filter.nationality) {
        whereCondition = {
          ...whereCondition,
          nationality: filter.nationality
        }
      }
      if (filter.ethnicity) {
        whereCondition = {
          ...whereCondition,
          ethnicity: filter.ethnicity
        }
      }
      if (filter.breast) {
        whereCondition = {
          ...whereCondition,
          breast: filter.breast
        }
      }
      const offset = (page - 1) * pageSize;
      try {
        const maxPriceRecord: any = await db.Plan.findOne({
          attributes: [[Sequelize.fn('MAX', Sequelize.col('price')), 'maxPrice'],],
        });
        const ads: any = await db.Ads.findAll({
          where: {
            ...whereCondition,
            planType: 'normal',
            [Op.or]: [
              {
                [Op.or]: [
                  {
                    price: {
                      [Op.lte]: maxPriceRecord.dataValues.maxPrice,
                    },
                  },
                  {
                    createdAt: {
                      [Op.lte]: new Date(new Date().setDate(new Date().getDate() - 30)),
                    },
                  },
                ],
              },
              {
                price: 0,
                planType: 'normal'
              },
            ],
          },
          include: [
            {
              model: db.Service,
              as: 'services',
              attributes: ['name'],
              where: filter.services && filter.services.length > 0
                ? { name: { [Op.in]: filter.services } }
                : undefined,
            },
            {
              model: db.AttentionTo,
              as: 'attentionTo',
              attributes: ['name'],
              where: filter.attentionTo && filter.attentionTo.length > 0
                ? { name: { [Op.in]: filter.attentionTo } }
                : undefined,
            },
            {
              model: db.PlaceOfService,
              as: 'placeOfServices',
              attributes: ['name'],
              where: filter.placeOfService && filter.placeOfService.length > 0
                ? { name: { [Op.in]: filter.placeOfService } }
                : undefined,
            },
          ],
          limit: pageSize,
          offset,
        });
        const filterAds = ads.map((ad: any) => ({
          ...ad.toJSON(),
          services: Array(...ad.services),
          profile: Array(ad.profile),
          attentionTo: Array(...ad.attentionTo),
          placeOfServices: Array(...ad.placeOfServices),
          paymentMethod: Array(ad.paymentMethod)
        }));
        return { ads: filterAds }
      } catch (error) {
        console.error("Error fetching ads:", error);
        throw new Error("Failed to fetch ads");
      }
    },
    premiumAds: async (_: any, { page = 1, pageSize = 10, filter }: any, context: any) => {
      try {
        const currentTime = moment();
        const duration = moment.duration(5, 'hours').add(30, 'minutes');
        const startHour = currentTime.clone().startOf('hour');
        const startHourWithOffset = startHour.subtract(duration).format('HH:mm:ss');
        const endHour = currentTime.clone().endOf('hour');
        const endHourWithOffset = endHour.subtract(duration).format('HH:mm:ss');
        let whereCondition: any = {}

        if (filter.categoryId) {
          whereCondition = {
            ...whereCondition,
            categoryId: filter.categoryId
          }
        }
        if (filter.category_handler) {
          whereCondition = {
            ...whereCondition,
            category_handler: filter.category_handler
          }
        }
        if (filter.city_handler) {
          whereCondition = {
            ...whereCondition,
            city_handler: filter.city_handler
          }
        }
        if (filter.state) {
          whereCondition = {
            ...whereCondition,
            state: filter.state
          }
        }
        if (filter.city) {
          whereCondition = {
            ...whereCondition,
            city: filter.city
          }
        }
        if (filter.hair) {
          whereCondition = {
            ...whereCondition,
            hair: filter.hair
          }
        }
        if (filter.nationality) {
          whereCondition = {
            ...whereCondition,
            nationality: filter.nationality
          }
        }
        if (filter.ethnicity) {
          whereCondition = {
            ...whereCondition,
            ethnicity: filter.ethnicity
          }
        }
        if (filter.breast) {
          whereCondition = {
            ...whereCondition,
            breast: filter.breast
          }
        }
        const offset = (page - 1) * pageSize;
        const ads: any = await db.Ads.findAll({
          where: {
            ...whereCondition,
            planType: 'premium',
            [Op.and]: [
              {
                price: {
                  [Op.gte]: 0,
                },
              },
              {
                createdAt: {
                  [Op.lte]: new Date(new Date().setDate(new Date().getDate() + 30)), // Set to 30 days from now
                },
              },
              {
                [Op.and]: [
                  {
                    startTime: {
                      [Op.lte]: new Date(),
                    },
                  },
                  {
                    endTime: {
                      [Op.gte]: new Date(),
                    },
                  },
                ]
              },
            ],
          },
          include: [
            {
              model: db.Service,
              as: 'services',
              attributes: ['name'],
              where: filter.services && filter.services.length > 0
                ? { name: { [Op.in]: filter.services } }
                : undefined,
            },
            {
              model: db.AttentionTo,
              as: 'attentionTo',
              attributes: ['name'],
              where: filter.attentionTo && filter.attentionTo.length > 0
                ? { name: { [Op.in]: filter.attentionTo } }
                : undefined,
            },
            {
              model: db.PlaceOfService,
              as: 'placeOfServices',
              attributes: ['name'],
              where: filter.placeOfService && filter.placeOfService.length > 0
                ? { name: { [Op.in]: filter.placeOfService } }
                : undefined,
            },
          ],
          limit: pageSize,
          offset,
        });

        const filterAds = ads.map((ad: any) => ({
          ...ad.toJSON(),
          services: Array(...ad.services),
          profile: Array(ad.profile),
          attentionTo: Array(...ad.attentionTo),
          placeOfServices: Array(...ad.placeOfServices),
          paymentMethod: Array(ad.paymentMethod)
        }));
        return { ads: filterAds }
      } catch (error) {
        console.error("Error fetching ads:", error);
        throw new Error("Failed to fetch ads");
      }
    },
  },
  Mutation: {
    createAd: async (_: any, data: AdsAttributes, context: any) => {
      const { user } = context;
      if (!user) {
        throw new Error("Unauthorized");
      }
      if (!data.profile || data.profile.length === 0) {
        throw new UserInputError("No files uploaded. Please upload at least one image.");
      }
      let fileUrls = await MultipleFileUpload(data.profile, 'Ads');

      const result: any = await db.Ads.create({ ...data.input, city_handler:formatString(data.city) ,category_handler:formatString(data.category), createdById: user.id, createdByName: user.name, profile: fileUrls });
      for (let i = 0; i < data.input.services.length; i++) {
        await db.Service.create({ adId: result.id, name: data.input.services[i] })
      }
      for (let i = 0; i < data.input.attentionTo.length; i++) {
        await db.AttentionTo.create({ adId: result.id, name: data.input.attentionTo[i] })
      }
      for (let i = 0; i < data.input.placeOfService.length; i++) {
        await db.PlaceOfService.create({ adId: result.id, name: data.input.placeOfService[i] })
      }
      const ads: any = await db.Ads.findOne({
        where: {
          id: result.id
        },
        include: [
          {
            model: db.Service,
            as: 'services',
            attributes: ['name'],
          },
          {
            model: db.AttentionTo,
            as: 'attentionTo',
            attributes: ['name'],
          },
          {
            model: db.PlaceOfService,
            as: 'placeOfServices',
            attributes: ['name'],
          },
        ],

      });
      return {
        ...ads.toJSON(),
        services: Array(...ads.services),
        profile: Array(ads.profile),
        attentionTo: Array(...ads.attentionTo),
        placeOfServices: Array(...ads.placeOfServices),
        paymentMethod: Array(ads.paymentMethod)
      }
    },
    updateAd: async (_: any, data: AdsAttributes, context: any) => {
      const { user } = context;
      if (!user) {
        throw new Error("Unauthorized");
      }
      const exist: any = await db.Ads.findOne({ where: { id: data.id } })
      if (!exist) {
        return { message: "Ad not exist", success: false }
      }
      exist.category = data.category
      exist.categoryId = data.categoryId
      exist.city = data.city
      exist.district = data.district
      exist.address = data.address
      exist.zip = data.zip
      exist.age = data.age
      exist.title = data.title
      exist.description = data.description
      exist.mobileNumber = data.mobileNumber
      exist.whatsAppNumber = data.whatsAppNumber
      exist.ethnicity = data.ethnicity
      exist.nationality = data.nationality
      exist.breast = data.breast
      exist.hair = data.hair
      exist.bodyType = data.bodyType
      exist.pricePerHour = data.pricePerHour
      exist.profile = data.profile
      exist.paymentMethod = data.paymentMethod
      await exist.save()
      await db.Service.destroy({
        where: {
          adId: data.id
        }
      })
      await db.AttentionTo.destroy({
        where: {
          adId: data.id
        }
      })
      await db.PlaceOfService.destroy({
        where: {
          adId: data.id
        }
      })
      for (let i = 0; i < data.services.length; i++) {
        await db.Service.create({ adId: data.id, name: data.services[i] })
      }
      for (let i = 0; i < data.attentionTo.length; i++) {
        await db.AttentionTo.create({ adId: data.id, name: data.attentionTo[i] })
      }
      for (let i = 0; i < data.placeOfService.length; i++) {
        await db.PlaceOfService.create({ adId: data.id, name: data.placeOfService[i] })
      }
      const ads: any = await db.Ads.findOne({
        where: {
          id: data.id
        },
        include: [
          {
            model: db.Service,
            as: 'services',
            attributes: ['name'],
          },
          {
            model: db.AttentionTo,
            as: 'attentionTo',
            attributes: ['name'],
          },
          {
            model: db.PlaceOfService,
            as: 'placeOfServices',
            attributes: ['name'],
          },
        ],

      });
      return {
        ...ads.toJSON(),
        services: Array(...ads.services),
        profile: Array(ads.profile),
        attentionTo: Array(...ads.attentionTo),
        placeOfServices: Array(...ads.placeOfServices),
        paymentMethod: Array(ads.paymentMethod)
      }
    },
    deleteAd: async (_: any, data: AdsAttributes, context: any) => {
      const { user } = context;
      if (!user) {
        throw new Error("Unauthorized");
      }
      const exist: any = await db.Ads.findOne({ where: { id: data.id } })
      if (!exist) {
        return { message: "Ad not exist", success: false }
      }
      const result = await db.Ads.destroy({ where: { id: data.id } })
      if (result) {
        return { message: "Ad Deleted Successfully", success: true }
      }
    },
  },
};

export default Ads;

