import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { enviroments } from '../configuration/enviroments';
import config from '../configuration/config';
import { DatabaseModule } from '../configuration/database/database.module';
import { UsersModule } from '../app/users/users.module';
import { PathologiesModule } from '../app/pathologies/pathologies.module';
import { PresentationsModule } from '../app/presentations/presentations.module';
import { MedicinesModule } from '../app/medicines/medicines.module';
import { ActivePrinciplesModule } from '../app/active-principles/active-principles.module';
import { StatusModule } from '../app/status/status.module';
import { PrioritiesModule } from '../app/priorities/priorities.module';
import { PackagesModule } from '../app/packages/packages.module';
import { OutletOfMedicinesModule } from '../app/outlet-of-medicines/outlet-of-medicines.module';
import { EntranceOfMedicinesModule } from '../app/entrance-of-medicines/entrance-of-medicines.module';
import { MedicinesActivePrinciplesModule } from '../app/medicines-active-principles/medicines-active-principles.module';
import { CommercialPresentationsModule } from '../app/commercial-presentations/commercial-presentations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        TYPEORM_CONNECTION: Joi.string().required(),
        TYPEORM_HOST: Joi.string().required(),
        TYPEORM_USERNAME: Joi.string().required(),
        TYPEORM_PASSWORD: Joi.string().required(),
        TYPEORM_DATABASE: Joi.string().required(),
        TYPEORM_PORT: Joi.number().required(),
        TYPEORM_SYNCHRONIZE: Joi.boolean().required(),
        TYPEORM_LOGGING: Joi.boolean().required(),
        TYPEORM_URL: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    ActivePrinciplesModule,
    EntranceOfMedicinesModule,
    MedicinesModule,
    MedicinesActivePrinciplesModule,
    PackagesModule,
    PathologiesModule,
    PresentationsModule,
    PrioritiesModule,
    StatusModule,
    UsersModule,
    OutletOfMedicinesModule,
    CommercialPresentationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
