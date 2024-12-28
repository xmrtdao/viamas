import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface DateSelectorProps {
  onDateSelect: (startDate: Date | undefined, endDate: Date | undefined) => void;
}

const DateSelector = ({ onDateSelect }: DateSelectorProps) => {
  const [date, setDate] = useState<DateRange | undefined>();

  return (
    <Calendar
      mode="range"
      selected={date}
      onSelect={(newDate) => {
        setDate(newDate);
        onDateSelect(newDate?.from, newDate?.to);
      }}
      disabled={{ before: new Date() }}
      numberOfMonths={2}
      className="rounded-md border"
    />
  );
};

export default DateSelector;