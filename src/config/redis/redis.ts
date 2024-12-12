import { createClient } from '@redis/client';
import { RedisClientType } from '@redis/client/dist/lib/client';

class RedisService {
  private static instance: RedisService;
  private client: RedisClientType;

  private constructor() {
    const redisUrl = process.env.NEXT_REDIS_CONNECTION_URL;
    
    if (!redisUrl) {
      throw new Error('Redis connection URL is not defined');
    }

    this.client = createClient({ 
      url: redisUrl,
      socket: {
        connectTimeout: 5000,
        keepAlive: 5000
      }
    });

    this.client.on('error', (err) => {
      console.error('Redis Client Error', err);
    });
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  public async connect(): Promise<RedisClientType> {
    if (!this.client.isOpen) {
      try {
        await this.client.connect();
        console.log('Redis connection established successfully');
      } catch (error) {
        console.error('Failed to connect to Redis:', error);
        throw error;
      }
    }
    return this.client;
  }

  public async disconnect(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }

  public getClient(): RedisClientType {
    return this.client;
  }
}

export default RedisService;