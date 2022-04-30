import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import R from '../util/r'

@Catch()
export class HTTPExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    console.log(exception)

    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()

    const message = exception.message
    const code = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const r = R.failure(message, code)

    httpAdapter.reply(ctx.getResponse(), r)
  }
}