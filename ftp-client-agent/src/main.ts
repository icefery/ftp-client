import { NestFactory } from '@nestjs/core'
import { AppModule } from './module/app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import { PUBLIC_PATH, SWAGGER_PATH, SWAGGER_TITLE } from './config'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true })

  const options = new DocumentBuilder().setTitle(SWAGGER_TITLE).build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(SWAGGER_PATH, app, document)

  app.useStaticAssets(PUBLIC_PATH)

  await app.listen(8000)
}

bootstrap()
