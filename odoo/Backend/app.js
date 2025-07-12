import  express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/user.routes.js"
import SkillRouter from "./routes/skill.routes.js"
import ReqRouter from "./routes/req.routes.js"
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    // origin: "*",
    // credentials: true, // only if you're using cookies
  })
);
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "..", "Public")));


app.use(cookieParser());;
app.use("/api/v1/users" , userRouter)
app.use("/api/v1/skills" , SkillRouter)
app.use("/api/v1/req" , ReqRouter)
export {app}
