import joi from "joi"
import dotenv from "dotenv"

dotenv.config({})

const envValidation = joi.object().keys({
    NODE_ENV :joi.string().valid("production","development","test").required(),
    PORT: joi.number().default(5000),
    API_KEY: joi.string().required(),
    MONGO_URI:joi.string().required()
})
.unknown()

const {value: envVar, error} = envValidation
.prefs({errors:{label:"key"}})
.validate(process.env)  

if(error){
    throw new Error (`Config validation error:${error.message}`)
}

export const config ={
    env : envVar.NODE_ENV,
    port: envVar.PORT,
    api_key:envVar.API_KEY,
    jwt:{
        jwt_secret:envVar.JWT_SECRET,
        jwt_expiry:envVar.JWT_EXPIRY
    },
    mongodb:{
        db_url:envVar.MONGO_URI
    }
}