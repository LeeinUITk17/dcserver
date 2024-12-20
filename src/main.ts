import * as cluster from 'cluster';
import * as os from 'os';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Ép kiểu để TypeScript không báo lỗi
  const isPrimary = (cluster as any).isPrimary || (cluster as any).isMaster;

  if (isPrimary) {
    const numCPUs = os.cpus().length;
    Logger.log(`Primary server is running. Spawning ${numCPUs} workers...`);

    for (let i = 0; i < numCPUs; i++) {
      (cluster as any).fork(); // Tạo worker
    }

    (cluster as any).on('exit', (worker: any) => {
      Logger.warn(
        `Worker ${worker.process.pid} exited. Spawning a new worker...`,
      );
      (cluster as any).fork(); // Tạo lại worker khi có lỗi
    });
  } else {
    const app = await NestFactory.create(AppModule);
    const port = 3000;
    await app.listen(port);
    Logger.log(`Worker ${process.pid} is running on port ${port}`);
  }
}

bootstrap();
