import { Request, Response, NextFunction } from 'express';
/**
 * Middleware xử lý lỗi toàn cục
 */
export declare const errorHandler: (err: Error & {
    statusCode?: number;
    code?: number;
}, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
/**
 * Middleware xử lý lỗi 404 khi không tìm thấy route
 */
export declare const notFoundHandler: (req: Request, res: Response) => Response<any, Record<string, any>>;
declare const _default: {
    errorHandler: (err: Error & {
        statusCode?: number;
        code?: number;
    }, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
    notFoundHandler: (req: Request, res: Response) => Response<any, Record<string, any>>;
};
export default _default;
