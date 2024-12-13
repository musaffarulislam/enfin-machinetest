"use client"

import { useState, useEffect } from 'react';
import { clearRedisDatabase, retrieveDataFromRedis, storeDataInRedis } from './actions';
import Loading from '@/components/Loading';
import Link from 'next/link';
import { participantAvailability, participants, schedules } from '@/heplers/sampleData';

const AvailableSlotPage = () => {
  const [loading, setLoading] = useState(false);
  const [dataExists, setDataExists] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const checkDataInRedis = async () => {
      setLoading(true);
      try {
        const participants = await retrieveDataFromRedis('participants');
        const availability = await retrieveDataFromRedis('participant_availability');
        const schedules = await retrieveDataFromRedis('schedules');

        if (Object.keys(participants?.data ?? {}).length > 0 && Object.keys(availability?.data ?? {}).length > 0 && Object.keys(schedules?.data ?? {}).length > 0) {
          console.log("Data exists in Redis");
          setDataExists(true);
          setStatus('Data exists in Redis');
        } else {
          setDataExists(false);
          setStatus('Data does not exist in Redis');
        }
      } catch (error) {
        console.error('Error checking Redis:', error);
        setStatus('Error checking Redis.');
      } finally {
        setLoading(false);
      }
    };

    checkDataInRedis();
  }, []);

  const handleAddData = async () => {
    setLoading(true);
    try {
      const result = await storeDataInRedis(participants, participantAvailability, schedules);

      if (result.success) {
        console.log('Data successfully stored in Redis!');
        setStatus('Data successfully stored in Redis!');
        setDataExists(true);
      } else {
        console.error('Failed to store data in Redis:', result.error);
        setStatus('Failed to store data in Redis.');
      }
    } catch (error) {
      console.error('Error storing data in Redis:', error);
      setStatus('Error storing data in Redis.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearData = async () => {
    setLoading(true);
    try {
      const result = await clearRedisDatabase();
      if (result.success) {
        console.log('Redis data cleared!');
        setStatus('Redis data cleared!');
        setDataExists(false);
      } else {
        console.error('Failed to clear Redis data:', result.error);
        setStatus('Failed to clear Redis data.');
      }
    } catch (error) {
      console.error('Error clearing Redis data:', error);
      setStatus('Error clearing Redis data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-16 py-12'>
      {loading && <Loading />} 

      {!loading && !dataExists && (
        <button
          onClick={handleAddData}
          className='bg-blue-500 text-white px-6 py-2 rounded-lg'
        >
          Add Data to Redis
        </button>
      )}

      {!loading && dataExists && (
        <button
          onClick={handleClearData}
          className='bg-red-500 text-white px-6 py-2 rounded-lg'
        >
          Clear Data from Redis
        </button>
      )}
      {!loading && 
        <Link href='/participant/availability' className='p-2 px-4 cursor-pointer heading underline border-2 rounded-xl hover:bg-secondary hover:text-background'>Available Time Slots</Link>
      }

      <div>{status && <p>{status}</p>}</div> 
    </div>
  );
};

export default AvailableSlotPage;
