import { z } from "zod";
export const registerSchema=z.object({name:z.string().min(2).max(80),email:z.string().email(),password:z.string().min(8).max(72),username:z.string().min(3).max(30).regex(/^[a-z0-9_-]+$/i)});
export const loginSchema=z.object({email:z.string().email(),password:z.string().min(8)});
export const linkSchema=z.object({destinationUrl:z.string().url(),customSlug:z.string().min(3).max(40).regex(/^[a-zA-Z0-9_-]+$/).optional().or(z.literal("")),title:z.string().max(120).optional()});
export const bioSchema=z.object({displayName:z.string().max(80).optional(),bio:z.string().max(240).optional(),avatarUrl:z.string().url().optional().or(z.literal("")),theme:z.enum(["minimal-light","dark-slate","gradient"]).optional(),socialLinks:z.array(z.object({title:z.string().max(40),url:z.string().url(),icon:z.string().max(30).optional(),position:z.number().int().min(0),isVisible:z.boolean().default(true)})).optional()});
