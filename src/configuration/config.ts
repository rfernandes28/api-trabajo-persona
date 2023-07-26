import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    port: process.env.PORT,
    postgres: {
      connection: process.env.TYPEORM_CONNECTION,
      name: process.env.TYPEORM_DATABASE,
      user: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      host: process.env.TYPEORM_HOST,
      synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
      logging: Boolean(process.env.TYPEORM_LOGGING),
      url: process.env.TYPEORM_URL,
    },
  };
});
