import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { IApiResponse } from "../dtos/response.dto";
import { Reflector } from "@nestjs/core";
import { RESPONSE_MESSAGE_KEY } from "../decorators/response-message.decorator";

interface IResponseWrapper<T> {
  result: T;
  metadata: Record<string, unknown>;
}

export class TransformInterceptor<T> implements NestInterceptor<T, IApiResponse<T>> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<IApiResponse<T>> {
    const statusMessage = this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler());

    return next.handle().pipe(
        map((data: T | IResponseWrapper<T>) => {
            const isWrapper = this.isWrapper(data);

            return {
            success: true,
            message: statusMessage,
            data: isWrapper ? data.result : data,
            meta: isWrapper ? data.metadata : {},
            timestamp: new Date().toISOString(),
            };
        })
    );
  }

  private isWrapper(data: unknown): data is IResponseWrapper<T> {
    return data !== null && typeof data === 'object' && 'result' in data;
  }
}