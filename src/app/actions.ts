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

    for (const [key, value] of Object.entries(availability)) {
      await client.hSet(`participant_availability`, { value: JSON.stringify(value) });
    }

    for (const [key, value] of Object.entries(schedules)) {
      await client.hSet(`schedules`, { value: JSON.stringify(value) });
    }

    console.log('Data successfully stored in Redis!');
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
      
      // Retrieve data from Redis and ensure it's a plain object
      const data = await client.hGetAll(key);
  
      // Convert the retrieved data to a plain object (if necessary)
      const parsedData = Object.entries(data).reduce<Record<string, any>>((acc, [field, value]) => {
        acc[field] = JSON.parse(value); // Assuming data was stringified when stored
        return acc;
      }, {});
  
      return {
        success: true,
        data: parsedData // Returning parsed data as a plain object
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
  
      // Clear the entire Redis database
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
  