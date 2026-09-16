import crypto from "crypto";
import { env } from "../config/env.js";
export function hashIp(ip){ return crypto.createHmac("sha256",env.IP_HASH_SECRET).update(ip||"unknown").digest("hex"); }
