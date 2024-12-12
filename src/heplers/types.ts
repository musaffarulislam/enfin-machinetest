export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export type IForm = {
    onResultsChange: (value: any) => void
}

export interface ISelectionField {
    label?: string,
    data: ISelectionFieldData[],
    onSelectionChange: (value: number[]) => void
    error?: string
  }
  
export interface ISelectionFieldData {
    id: number,
    name: string
  }

export interface IDatePicker {
    label?: string,
    onDateChange: (value: string) => void
    error?: string
}

export interface IError {
    message?: string
}

export interface IAvailableSlot {
    results?: AvailabilityResult
}

export interface Participant {
  name: string;
  threshold: number;
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface ParticipantAvailability {
  [day: string]: TimeSlot[];
}

export interface Schedule {
  [date: string]: TimeSlot[];
}

export interface CheckAvailabilityInput {
  participant_ids: number[];
  date_range: {
    start: string;
    end: string;
  };
}

export interface AvailabilityResult {
  [date: string]: string[];
}