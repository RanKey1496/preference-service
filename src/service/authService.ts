import { Request, Response, NextFunction } from 'express';
import { requestAuth } from '../repository/authRepository';

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const response = JSON.parse(await requestAuth(req.get('Authorization')));
        req.body.email = response.email;
        req.body.token = req.get('Authorization');
        return next();
    } catch (error) {
        return next(error);
    }
}