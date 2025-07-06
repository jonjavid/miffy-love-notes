
import React, { useState, useEffect } from 'react';
import DailyNote from '@/components/DailyNote';
import Calendar from '@/components/Calendar';
import Navigation from '@/components/Navigation';
import FloatingHearts from '@/components/FloatingHearts';
import { Heart } from 'lucide-react';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentNoteNumber, setCurrentNoteNumber] = useState(1);

  // Calculate note number based on date (day of year)
  const getDayOfYear = (date: Date) => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  // Update note number when date changes
  useEffect(() => {
    const noteNumber = getDayOfYear(selectedDate);
    setCurrentNoteNumber(Math.min(Math.max(noteNumber, 1), 365));
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev' && currentNoteNumber > 1) {
      newDate.setDate(newDate.getDate() - 1);
    } else if (direction === 'next' && currentNoteNumber < 365) {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart size={24} className="text-heart-red" fill="currentColor" />
            <h1 className="handwritten text-4xl md:text-5xl text-gray-700">
              Daily Love Notes
            </h1>
            <Heart size={24} className="text-heart-red" fill="currentColor" />
          </div>
          <p className="text-gray-600 max-w-md mx-auto">
            A gentle collection of love notes to warm your heart, 
            inspired by the sweet simplicity of Miffy
          </p>
        </header>

        <Calendar 
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />

        <main className="mb-8">
          <DailyNote 
            noteNumber={currentNoteNumber}
            date={formatDate(selectedDate)}
          />
        </main>

        <Navigation 
          currentNote={currentNoteNumber}
          onNavigate={handleNavigate}
        />

        <footer className="text-center mt-16 text-gray-500 text-sm">
          <div className="flex items-center justify-center space-x-2">
            <Heart size={12} fill="currentColor" className="text-miffy-pink" />
            <span>Made with love and inspired by Miffy's gentle spirit</span>
            <Heart size={12} fill="currentColor" className="text-miffy-pink" />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
