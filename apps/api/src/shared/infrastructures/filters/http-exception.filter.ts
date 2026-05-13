import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response, Request } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        const errorCode = 'SYSTEM_ERROR';

        if(exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();

            if(typeof res === "object" && res !== null) {
                const resObj = res as Record<string, unknown>;
                message = typeof resObj.message === "string" ? resObj.message : message;
            } else {
                message = exception.message;
            }
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        response.status(status).json({
            success: false,
            message,
            errorCode,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}