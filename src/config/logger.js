import morgan from "morgan";
import winston from "winston";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import { loggerConfig } from "./logger.config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logDir = join(__dirname, "../../logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
//הגדרת צבעים
winston.addColors(loggerConfig.colors);

//יצירת פורמט מותאם אישית
const logFormat = winston.format.combine(
  // יוצר פורמט משולב מכמה פורמטים
  // מוסיף חותמת זמן לכל רשומת לוג
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss", // פורמט התאריך והשעה
  }),

  // מוסיף תמיכה בהצגת שגיאות עם Stack trace
  winston.format.errors({
    stack: true,
  }),

  // פונקציה מותאמת אישית שמגדירה איך יראה הפלט
  winston.format.printf(({ timestamp, level, message }) => {
    // מחזיר את הפורמט הסופי של הלוג
    return `${timestamp} ${level}: ${message}`;
  })
);
const logger = winston.createLogger({
  level: loggerConfig.levels,
  format: logFormat,
  transports: [
    // לוג שגיאות
    new winston.transports.File({
      filename: join(logDir, "error.log"),
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // לוג HTTP
    new winston.transports.File({
      filename: join(logDir, "http.log"),
      level: "http",
      maxsize: 5242880,
      maxFiles: 5,
    }),
    // כל הלוגים
    new winston.transports.File({
      filename: join(logDir, "combined.log"),
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});

export default logger;
