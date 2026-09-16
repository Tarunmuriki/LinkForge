import "dotenv/config";
import { z } from "zod";
const schema=z.object({
 PORT:z.coerce.number().default(5000),
 MONGO_URI:z.string().default("mongodb://127.0.0.1:27017/linkforge"),
 CLIENT_URL:z.string().default("http://localhost:5173"),
 JWT_ACCESS_SECRET:z.string().min(16),
 JWT_REFRESH_SECRET:z.string().min(16),
 IP_HASH_SECRET:z.string().min(16),
 COOKIE_SECURE:z.enum(["true","false"]).default("false")
});
export const env=schema.parse(process.env);
