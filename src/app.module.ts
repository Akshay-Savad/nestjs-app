import { Module, MiddlewareConsumer } from '@nestjs/common';
import { EarthMarsCommController } from './earth-mars-comm/earth-mars-comm.controller';
import { CommunicationService } from './earth-mars-comm/earth-mars-comm.service';
import { middlerware } from './earth-mars-comm/earth-mars-comm.middlerware';
import { APP_INTERCEPTOR } from "@nestjs/core";
import { EarthMarsInterceptor } from './earth-mars-comm/earth-mars-comm.interceptor';

@Module({
  imports: [],
  controllers: [EarthMarsCommController],
  providers: [CommunicationService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(middlerware)
      .forRoutes(EarthMarsCommController);
  }
}
