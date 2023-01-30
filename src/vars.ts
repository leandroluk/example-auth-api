import packageJson from '../package.json';
const { env, cwd } = process;

const vars = {
  port: Number(env.PORT ?? 3000),
  path: cwd(),
  app: {
    env: env.NODE_ENV, // default "development"
    name: packageJson.name,
    version: packageJson.version,
  },
  jwt: {
    privateKey: env.JWT_PRIVATE_KEY ?? 'secret',
    publicKey: env.JWT_PUBLIC_KEY ?? 'secret',
    algorithm: env.JWT_AUGORITHM ?? 'HS256',
    audience: env.JWT_AUDIENCE ?? 'http://localhost:13000',
    issuer: env.JWT_ISSUER ?? 'issuer',
    accessTTL: Number(env.JWT_ACCESS_TTL ?? 1000 * 60 * 10), // default 10 minutes
    refreshTTL: Number(env.JWT_REFRESH_TTL ?? 1000 * 60 * 60 * 24 * 14), // default 14 days
  },
  db: {
    limit: Number(env.DB_LIMIT ?? 50),
    postgres: env.DB_POSTGRES ?? 'postgresql://postgres:postgres@localhost:5432/postgres',
  },
};

export default vars;