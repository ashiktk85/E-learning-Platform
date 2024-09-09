import Category from "../models/categoryModel";
import Report from '../models/reportModel'

export class adminRepository {

    static async createCategory(categoryName : string , description : string) : Promise<any | void> {
        try {
            const existCategory = await Category.findOne({name : categoryName})
            console.log("exist cate", existCategory);
            
            if(existCategory) {
                throw new Error("Category already exists.")
            } else {
                const newCategory = new Category({
                    name : categoryName,
                    description: description,
                })
                const response = await newCategory.save()
                return true;
            }
        } catch (error : any) {
            throw new Error(error.message);
        }
    }

    static async getCategoriesRepo() : Promise<any> {
        try {
            const categories = await Category.find({})
            return categories;    
        } catch (error : any) {
            throw new Error(error.message);
        }
    }

    static async saveReport(courseId: any , videoId: any , reason: any , additionalInfo: any) {
        try {
            const newReport = await new Report({
                courseId,
                videoId,
                reason,
                additionalInfo,
              });
        
              const savedReport = await newReport.save();
        } catch (error : any) {
            throw new Error(error.message);
        }
    }
}