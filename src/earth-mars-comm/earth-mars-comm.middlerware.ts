import { Request, NextFunction } from 'express';

export function middlerware(req: Request, res: Response, next: NextFunction) {
    req['time'] = Date.now();
    console.log('x-sender', req.headers['x-sender'])
    console.log('x-receiver', req.headers['x-receiver'])
    next();
};