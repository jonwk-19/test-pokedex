export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV ?? 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT ?? 3001,
  defaultlimint: +process.env.DEFAULT_LIMIT!, //usar el + pq las variables de entorno por defecto se graban con string
})
