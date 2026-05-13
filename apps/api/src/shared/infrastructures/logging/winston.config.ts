import path from "path";
import { utilities as nestWinstonModuleUtilities } from "nest-winston";
import * as winston from "winston";
import "winston-daily-rotate-file";

const logsDir = path.resolve(process.cwd(), "logs");

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    nestWinstonModuleUtilities.format.nestLike("ConferenceAPI", {
      colors: true,
      prettyPrint: true,
    }),
  ),
});

const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

const combinedFileTransport = new winston.transports.DailyRotateFile({
  dirname: logsDir,
  filename: "application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  format: fileFormat,
});

const errorFileTransport = new winston.transports.DailyRotateFile({
  dirname: logsDir,
  filename: "error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "30d",
  level: "error",
  format: fileFormat,
});

export const winstonLoggerOptions = {
  level: process.env.LOG_LEVEL ?? "info",
  transports: [consoleTransport, combinedFileTransport, errorFileTransport],
};
