import db from "../../models";
import { IResolvers } from "@graphql-tools/utils"; // or '@apollo/server'
import { AdsAttributes } from "../../models/ads"
const Ads: IResolvers<any, any> = {
  Query: {
    ads: async (_: any, __: any, context: any) => {
      const { user } = context;
      if (!user) {
        throw new Error("Unauthorized");
      }
      try {
        const ads:any = await db.Ads.findAll()
        return ads.map((ad: any) => ({
          ...ad.toJSON(),
          services: Array(ad.services),
          profile: Array(ad.profile),
          attentionTo:Array(ad.attentionTo),
          placeOfService:Array(ad.placeOfService),
          paymentMethod :Array(ad.paymentMethod)
        }));
      } catch (error) {
        console.error("Error fetching ads:", error);
        throw new Error("Failed to fetch ads");
      }
    },

    ad: async (_: any, { id }: AdsAttributes) => {
      try {
        const ad:any = await db.Ads.findOne({where:{id}})
        return { 
          ...ad.dataValues,
          services: Array(ad.services),
          profile: Array(ad.profile),
          attentionTo:Array(ad.attentionTo),
          placeOfService:Array(ad.placeOfService),
          paymentMethod :Array(ad.paymentMethod)
        };
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
      const result = await db.Ads.create({ ...data, createdById: user.id, createdByName: "Ram" });
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

