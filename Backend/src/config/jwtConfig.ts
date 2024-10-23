import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import HTTP_statusCode from "../Enums/httpStatusCode";

dotenv.config();

const secret_key = process.env.SECRET_KEY as string;

const createToken = (user_id: string, role: string): string => {
    return jwt.sign({ user_id, role }, secret_key, { expiresIn: '30m' });
};

const createAdminToken = (email: string, role: string): string => {
    return jwt.sign({ email, role }, secret_key, { expiresIn: '30m' });
};

const createRefreshToken = (user_id: string, role: string): string => {
    return jwt.sign({ user_id, role }, secret_key, { expiresIn: '7d' });
};


const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken: string = req.cookies.AccessToken;
        if (accessToken) {
            jwt.verify(accessToken, secret_key, async (err, decoded) => {
                if (err) {
                    await handleRefreshToken(req, res, next);
                } else {
                    const { role } = decoded as jwt.JwtPayload;
                    if (role !== "user") { 
                        return res.status(HTTP_statusCode.Unauthorized).json({ message: 'Access denied. Insufficient role.' });
                    }
                    next();
                };
            });
        } else {
            await handleRefreshToken(req, res, next);
        };
    } catch (error) {
        res.status(HTTP_statusCode.Unauthorized).json({ message: 'Access denied. Access token not valid.' });
    };
};


const verifyAdminToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const adminToken: string = req.cookies.AdminToken;
        if (adminToken) {
            jwt.verify(adminToken, secret_key, async (err, decoded) => {
                if (err) {
                    return res.status(HTTP_statusCode.Unauthorized).json({ message: 'Access denied. Admin token expired or invalid.' });
                } else {
                    const { role } = decoded as jwt.JwtPayload;
                    if (role !== "admin") {
                        return res.status(HTTP_statusCode.NoAccess).json({ message: 'Access denied. Admin privileges required.' });
                    }
                    next();
                };
            });
        } else {
            return res.status(HTTP_statusCode.Unauthorized).json({ message: 'Access denied. Admin token not provided.' });
        }
    } catch (error) {
        res.status(HTTP_statusCode.Unauthorized).json({ message: 'Access denied. Admin token not valid.' });
    };
};

const handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken: string = req.cookies.RefreshToken;
    if (refreshToken) {
        jwt.verify(refreshToken, secret_key, (err, decoded) => {
            if (err) {
                return res.status(HTTP_statusCode.Unauthorized).json({ message: 'Access denied. Refresh token not valid.' });
            } else {
                const { user_id, role } = decoded as jwt.JwtPayload;
                if (!user_id || !role) {
                    return res.status(HTTP_statusCode.Unauthorized).json({ message: 'Access denied. Token payload invalid.' });
                } else {
                    const newAccessToken = createToken(user_id, role);
                    res.cookie("AccessToken", newAccessToken, {
                        httpOnly: true,
                        sameSite: 'strict',
                        maxAge: 15 * 60 * 1000, 
                    });
                    next();
                };
            };
        });
    } else {
        return res.status(HTTP_statusCode.Unauthorized).json({ message: 'Access denied. Refresh token not provided.' });
    };
};

export { createToken, verifyToken, verifyAdminToken, createRefreshToken, createAdminToken };
