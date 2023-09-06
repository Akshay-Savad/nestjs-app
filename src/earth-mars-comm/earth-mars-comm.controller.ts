import { Controller, Post, Res, Headers, Req, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { CommunicationService } from "./earth-mars-comm.service";
import { EarthMarsInterceptor } from './earth-mars-comm.interceptor';

@Controller('earth-mars-comm')
@UseInterceptors(EarthMarsInterceptor)
export class EarthMarsCommController {
    constructor(private communicationService: CommunicationService) {}

    @Post('message')
    ConvertMessage(@Headers() header: string, res: Response, @Req() req: Request): Object {
        var message: string = this.communicationService.myFunctions(header, req.body);
        return (message);
    }
}
