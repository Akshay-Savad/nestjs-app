import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class EarthMarsInterceptor implements NestInterceptor {
  logTime(time){
    let curr = Date.now()
    let formattedDate = new Date(curr).toLocaleString();
    console.log(`[Earth-Mars-Communication] - ${formattedDate} LOG [MessageController] Time Taken by API +${curr-time}ms`)
  }

  modifyResponse(request, response){
    let sender = request.switchToHttp().getRequest()?.header('x-sender').replace(/[^a-zA-Z ]/g, ""), 
        message = request.switchToHttp().getRequest()?.body?.message ;
        
        let beautifiedSenderName = sender.charAt(0).toUpperCase() + sender.slice(1);

        let responseBody = {
          [`Response From ${beautifiedSenderName}`] : message,
          [`Nokia Translation`] : response
        };
      return responseBody
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err => throwError(() => {
          console.log('Error in Interceptor while receving response [Logging in Logs]!!', err?.message)
          new BadRequestException()
        })),
        map(data => {
        this.logTime(context.switchToHttp().getRequest()?.time)

        return this.modifyResponse(context, data)
      }));
  }
}
