import { NestFactory } from '@nestjs/core'
import { AppModule } from './module/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as path from 'path'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true })

  const options = new DocumentBuilder().setTitle('FTP-CLIENT').build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/docs', app, document)

  app.useStaticAssets(path.join(__dirname, '../public'))

  await app.listen(8000)
}

bootstrap()
