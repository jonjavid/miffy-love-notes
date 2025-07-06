
import React from 'react';
import { Calendar as CalendarIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };
  
  const selectDate = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onDateSelect(newDate);
  };
  
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);
  
  return (
    <div className="flex justify-center mb-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-white/70 backdrop-blur-sm border-miffy-pink hover:bg-miffy-pink-light transition-colors rounded-full px-6 py-2"
          >
            <CalendarIcon size={16} className="mr-2" />
            Browse Love Notes
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4 bg-white/90 backdrop-blur-sm border-miffy-pink rounded-2xl">
          <Card className="border-none shadow-none bg-transparent">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="h-8 w-8 p-0 hover:bg-miffy-pink-light rounded-full"
              >
                <ArrowLeft size={16} />
              </Button>
              <h3 className="font-semibold text-gray-700">
                {formatDate(currentMonth)}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="h-8 w-8 p-0 hover:bg-miffy-pink-light rounded-full"
              >
                <ArrowRight size={16} />
              </Button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-gray-500 font-medium">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {emptyDays.map(day => (
                <div key={`empty-${day}`} className="p-2"></div>
              ))}
              {days.map(day => {
                const isSelected = selectedDate.getDate() === day && 
                  selectedDate.getMonth() === currentMonth.getMonth() && 
                  selectedDate.getFullYear() === currentMonth.getFullYear();
                
                return (
                  <Button
                    key={day}
                    variant="ghost"
                    size="sm"
                    onClick={() => selectDate(day)}
                    className={`h-8 w-8 p-0 rounded-full transition-colors ${
                      isSelected 
                        ? 'bg-miffy-pink text-white hover:bg-miffy-pink-dark' 
                        : 'hover:bg-miffy-pink-light'
                    }`}
                  >
                    {day}
                  </Button>
                );
              })}
            </div>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Calendar;
