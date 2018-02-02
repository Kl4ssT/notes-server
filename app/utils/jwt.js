import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config";

export const getToken = async (login) => jwt.sign(login, JWT_SECRET);

export const verifyToken = async (token) => jwt.verify(token, JWT_SECRET);
