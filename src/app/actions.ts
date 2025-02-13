'use server'

import RedisService from '@/config/redis/redis';

export async function storeDataInRedis(
  participants: Record<string, any>,
  availability: Record<string, any>,
  schedules: Record<string, any>
) {
  try {
    const redisService = RedisService.getInstance();
    const client = await redisService.connect();

    await client.hSet('participants', { value: JSON.stringify(participants) });
      await client.hSet(`participant_availability`, { value: JSON.stringify(availability) });
      await client.hSet(`schedules`, { value: JSON.stringify(schedules) });

    return {
      success: true,
      message: 'Data successfully stored in Redis'
    };
  } catch (error) {
    console.error('Redis storage error:', error);
    return {
      success: false,
      error: String(error),
      message: 'Failed to store data in Redis'
    };
  }
}


export async function retrieveDataFromRedis(key: string) {
    try {
      const redisService = RedisService.getInstance();
      const client = await redisService.connect();
      
      const data = await client.hGetAll(key);
  
      const parsedData = Object.entries(data).reduce<Record<string, any>>((acc, [field, value]) => {
        acc[field] = JSON.parse(value); 
        return acc;
      }, {});
  
      return {
        success: true,
        data: parsedData
      };
    } catch (error) {
      console.error('Redis retrieval error:', error);
      return {
        success: false,
        error: String(error),
        message: 'Failed to retrieve data from Redis'
      };
    }
  }
  
  export async function clearRedisDatabase() {
    try {
      const redisService = RedisService.getInstance();
      const client = await redisService.connect();
  
      await client.flushAll();
  
      console.log('Redis database cleared successfully!');
      return {
        success: true,
        message: 'Redis database cleared successfully'
      };
    } catch (error) {
      console.error('Error clearing Redis database:', error);
      return {
        success: false,
        error: String(error),
        message: 'Failed to clear Redis database'
      };
    }
  }
  