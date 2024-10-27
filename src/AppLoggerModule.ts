import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { DiscoveryModule, DiscoveryService } from '@nestjs/core';

@Module({
    imports: [DiscoveryModule],
})
export class AppLoggerModule implements OnModuleInit {
  private readonly logger = new Logger(AppLoggerModule.name);

  constructor(private readonly discoveryService: DiscoveryService) {}

  onModuleInit() {
    const controllers = this.discoveryService.getControllers();
    controllers.forEach((controller) => {
      const controllerName = controller.metatype.name;
      this.logger.log(`Controller initialized: ${controllerName}`);
    });
  }
}