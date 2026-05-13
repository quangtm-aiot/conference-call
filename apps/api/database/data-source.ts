import fs from "fs";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";

const envFileCandidates = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "../../.env"),
  path.resolve(__dirname, "../../.env"),
  path.resolve(__dirname, "../../../.env"),
];

const envFilePath = envFileCandidates.find((candidate) => fs.existsSync(candidate));

dotenv.config(envFilePath ? { path: envFilePath } : undefined);

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST ?? "localhost",
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  username: process.env.POSTGRES_USER ?? "conference",
  password: process.env.POSTGRES_PASSWORD ?? "conference",
  database: process.env.POSTGRES_DB ?? "conference",
  entities: [path.join(__dirname, "../**/*.entity.{js,ts}")],
  migrations: [path.join(__dirname, "/migrations/*.{js,ts}")],
  synchronize: false,
  logging: process.env.NODE_ENV !== "production",
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
