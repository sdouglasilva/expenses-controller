import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv'
import {User} from "../users/entities/user.entities"
import {Expense} from "../expenses/entities/expense.entity"

dotenv.config()

const databaseConfig: TypeOrmModuleOptions = {
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT!, 10),
  username: process.env.DATA_BASE_USERNAME,
  password: process.env.DATA_BASE_PASSWORD,
  database: process.env.DATA_BASE_NAME,
  entities: [User,Expense],
  synchronize: process.env.NODE_ENV === "development",

};
export default databaseConfig;