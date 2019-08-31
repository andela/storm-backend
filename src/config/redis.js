import Redis from 'ioredis';
import './env';

const env = process.env.NODE_ENV || 'development';

const config = {
  development: '',
  production: process.env.REDIS_URL
};

const redisUrl = config[env];

const redis = new Redis(redisUrl);

export default redis;
