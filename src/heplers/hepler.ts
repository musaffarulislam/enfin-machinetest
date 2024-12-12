import { 
    Participant, 
    ParticipantAvailability, 
    Schedule, 
    CheckAvailabilityInput, 
    AvailabilityResult, 
    TimeSlot
  } from './types';

  const convertToDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };
  
  export function convertToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  
  export function checkParticipantAvailableSlots(
    participants: { [key: number]: Participant },
    participantAvailability: { [key: number]: ParticipantAvailability },
    schedules: { [key: number]: Schedule },
    input: CheckAvailabilityInput
  ): AvailabilityResult {
    const result: AvailabilityResult = {};

    console.log("kjkdfjk", participants, participantAvailability, schedules, input);
    const startDate = convertToDate(input.date_range.start);
    const endDate = convertToDate(input.date_range.end);
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const currentDate = d.toLocaleDateString('en-GB');
      const dayOfWeek = d.toLocaleDateString('en-US', { weekday: 'long' });
      
      const availableSlots: string[] = [];
      
      const participantMeetingCounts = input.participant_ids.reduce((acc, id) => {
        acc[id] = 0;
        return acc;
      }, {} as { [key: number]: number });
    
      for (let hour = 9; hour < 17; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const start = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          const end = minute === 30 ? 
            `${(hour + 1).toString().padStart(2, '0')}:00` : 
            `${hour.toString().padStart(2, '0')}:30`;
          
          const slotAvailable = input.participant_ids.every(id => {
            const availability = participantAvailability[id];
            const schedule = schedules[id];
            const threshold = participants[id].threshold; 
    
            if (participantMeetingCounts[id] >= threshold) {
              return false; 
            }
    
            const dayAvailability = availability[dayOfWeek] ?? [];
            const isWeeklyAvailable = dayAvailability?.some(slot => 
              convertToMinutes(start) >= convertToMinutes(slot.start) && 
              convertToMinutes(end) <= convertToMinutes(slot.end)
            );            
    
            const scheduledMeetings = schedule?.[currentDate] || [];
            const isScheduleConflict = scheduledMeetings.some(meeting => 
              !(convertToMinutes(end) <= convertToMinutes(meeting.start) || 
                convertToMinutes(start) >= convertToMinutes(meeting.end))
            );
    
            if (isWeeklyAvailable && !isScheduleConflict) {
              participantMeetingCounts[id] += 1;
              return true;
            }
    
            return false;
          });
    
          if (slotAvailable) {
            availableSlots.push(`${start}-${end}`);
          }
        }
      }
    
      if (availableSlots.length > 0) {
        result[currentDate] = availableSlots;
      }
    }
    
    return result;
  }
  