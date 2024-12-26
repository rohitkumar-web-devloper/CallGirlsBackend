import db from "../../../models";
import { IResolvers } from "@graphql-tools/utils";
import { AdsAttributes } from "../../../models/ads"
import { GraphQLUpload } from "graphql-upload-ts";
import MultipleFileUpload from "../../../MultipleFileUpload";
import { ApolloError, UserInputError } from "apollo-server-express";
import { Op, Sequelize } from "sequelize";
import moment from 'moment';
const Ads: IResolvers<any, any> = {
  Upload: GraphQLUpload,
  Query: {
    ads: async (_: any, __: any, context: any) => {
      const { user } = context;
      if (!user) {
        throw new Error("Unauthorized");
      }
      try {
        const ads: any = await db.Ads.findAll()
        return ads.map((ad: any) => ({
          ...ad.toJSON(),
          services: Array(ad.services),
          profile: Array(ad.profile),
          attentionTo: Array(ad.attentionTo),
          placeOfService: Array(ad.placeOfService),
          paymentMethod: Array(ad.paymentMethod)
        }));
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

    normalAds: async (_: any, __: any, context: any) => {
      try {
        const maxPriceRecord: any = await db.Plan.findOne({
          attributes: [[Sequelize.fn('MAX', Sequelize.col('price')), 'maxPrice']],
        });
        const ads: any = await db.Ads.findAll({
          where: {
            [Op.or]: [
              {
                [Op.and]: [
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
              },
            ],
          },
        });

        return ads.map((ad: any) => ({
          ...ad.toJSON(),
          services: Array(ad.services),
          profile: Array(ad.profile),
          attentionTo: Array(ad.attentionTo),
          placeOfService: Array(ad.placeOfService),
          paymentMethod: Array(ad.paymentMethod)
        }));
      } catch (error) {
        console.error("Error fetching ads:", error);
        throw new Error("Failed to fetch ads");
      }
    },
    premiumAds: async (_: any, __: any, context: any) => {
      try {
        const currentTime = moment();
        // Subtract 5 hours and 30 minutes (time duration)
        const duration = moment.duration(5, 'hours').add(30, 'minutes');
        // Start of the current hour
        const startHour = currentTime.clone().startOf('hour');
        const startHourWithOffset = startHour.subtract(duration).format('HH:mm:ss'); 
        // End of the current hour
        const endHour = currentTime.clone().endOf('hour');
        const endHourWithOffset = endHour.subtract(duration).format('HH:mm:ss'); 

        const ads: any = await db.Ads.findAll({
          where: {
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
                startTime: {
                  [Op.between]: [startHourWithOffset, endHourWithOffset],
                },
              },
              {
                endTime: {
                  [Op.between]: [startHourWithOffset, endHourWithOffset], 
                },
              },
            ],
          },
        });
        return ads.map((ad: any) => ({
          ...ad.toJSON(),
          services: Array(ad.services),
          profile: Array(ad.profile),
          attentionTo: Array(ad.attentionTo),
          placeOfService: Array(ad.placeOfService),
          paymentMethod: Array(ad.paymentMethod)
        }));
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
      const result = await db.Ads.create({ ...data.input, createdById: user.id, createdByName: user.name, profile: fileUrls });
      if (result) {
        return { ...result.dataValues, message: "Ad Created Successfully", success: true }
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
      exist.services = data.services
      exist.attentionTo = data.attentionTo
      exist.profile = data.profile
      exist.placeOfService = data.placeOfService
      exist.paymentMethod = data.paymentMethod
      await exist.save()
      return { ...exist.dataValues, message: "Ad Deleted Successfully", success: true }
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

