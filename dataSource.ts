import { NewUser } from "./src/entities/NewUser";
import { DataSource } from "typeorm";
import { User } from "./src/entities/User";
const dataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port : 5432,
      username: "postgres",
      password: "mithun",
      database: "usermanagement",
      entities: [User,NewUser],
      synchronize: true
});
export default dataSource;
