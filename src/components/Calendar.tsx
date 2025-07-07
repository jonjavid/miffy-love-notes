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
  
  // Define date range: July 17, 2024 to July 5, 2025
  const startDate = new Date(2024, 6, 17); // July 17, 2024
  const endDate = new Date(2025, 6, 5); // July 5, 2025
  
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
  
  const isDateInRange = (date: Date) => {
    return date >= startDate && date <= endDate;
  };
  
  const canNavigateMonth = (direction: 'prev' | 'next') => {
    const testDate = new Date(currentMonth);
    if (direction === 'prev') {
      testDate.setMonth(testDate.getMonth() - 1);
      const lastDayOfPrevMonth = new Date(testDate.getFullYear(), testDate.getMonth() + 1, 0);
      return lastDayOfPrevMonth >= startDate;
    } else {
      testDate.setMonth(testDate.getMonth() + 1);
      const firstDayOfNextMonth = new Date(testDate.getFullYear(), testDate.getMonth(), 1);
      return firstDayOfNextMonth <= endDate;
    }
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    if (!canNavigateMonth(direction)) return;
    
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
    if (isDateInRange(newDate)) {
      onDateSelect(newDate);
    }
  };
  
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);
  
  return (
    <div className="flex justify-center mb-8 animate-fade-in-up">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-white/70 backdrop-blur-sm border-miffy-pink hover:bg-miffy-pink-light transition-all duration-300 rounded-full px-6 py-2 hover:scale-105"
          >
            <CalendarIcon size={16} className="mr-2" />
            Browse Notes
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4 bg-white/90 backdrop-blur-sm border-miffy-pink rounded-2xl animate-scale-in">
          <Card className="border-none shadow-none bg-transparent">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('prev')}
                disabled={!canNavigateMonth('prev')}
                className="h-8 w-8 p-0 hover:bg-miffy-pink-light rounded-full transition-all duration-200 disabled:opacity-30"
              >
                <ArrowLeft size={16} />
              </Button>
              <h3 className="font-semibold text-gray-700 animate-fade-in">
                {formatDate(currentMonth)}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('next')}
                disabled={!canNavigateMonth('next')}
                className="h-8 w-8 p-0 hover:bg-miffy-pink-light rounded-full transition-all duration-200 disabled:opacity-30"
              >
                <ArrowRight size={16} />
              </Button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <div key={day} className="p-2 text-gray-500 font-medium animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {emptyDays.map(day => (
                <div key={`empty-${day}`} className="p-2"></div>
              ))}
              {days.map((day, index) => {
                const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                const isSelected = selectedDate.getDate() === day && 
                  selectedDate.getMonth() === currentMonth.getMonth() && 
                  selectedDate.getFullYear() === currentMonth.getFullYear();
                const isInRange = isDateInRange(currentDate);
                
                return (
                  <Button
                    key={day}
                    variant="ghost"
                    size="sm"
                    onClick={() => selectDate(day)}
                    disabled={!isInRange}
                    className={`h-8 w-8 p-0 rounded-full transition-all duration-200 animate-fade-in ${
                      isSelected 
                        ? 'bg-miffy-pink text-white hover:bg-miffy-pink-dark scale-110' 
                        : isInRange
                        ? 'hover:bg-miffy-pink-light hover:scale-105'
                        : 'opacity-30 cursor-not-allowed'
                    }`}
                    style={{ animationDelay: `${index * 20}ms` }}
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
