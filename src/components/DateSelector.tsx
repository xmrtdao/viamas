import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { addDays } from "date-fns";

interface DateSelectorProps {
  onDateSelect: (startDate: Date | undefined, endDate: Date | undefined) => void;
}

const DateSelector = ({ onDateSelect }: DateSelectorProps) => {
  const [date, setDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  return (
    <Calendar
      mode="range"
      selected={date}
      onSelect={(newDate) => {
        setDate(newDate ?? { from: undefined, to: undefined });
        onDateSelect(newDate?.from, newDate?.to);
      }}
      disabled={{ before: new Date() }}
      numberOfMonths={2}
      className="rounded-md border"
    />
  );
};

export default DateSelector;