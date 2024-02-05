
import mongoose from "mongoose";
export const databasesConnection=async()=>
{
    await mongoose.connect(process.env.mongo_Url,{dbName:"ChartApp"})
}
databasesConnection().then((c)=>
{
    console.log("databases connected sucessfully");
}).catch(err=>console.log(err));