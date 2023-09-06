import { Test, TestingModule } from '@nestjs/testing';
import { EarthMarsCommController } from './earth-mars-comm.controller';

describe('EarthMarsCommController', () => {
  let controller: EarthMarsCommController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EarthMarsCommController],
    }).compile();

    controller = module.get<EarthMarsCommController>(EarthMarsCommController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
