
import React, { useState, useEffect } from 'react';
import DailyNote from '@/components/DailyNote';
import Calendar from '@/components/Calendar';
import Navigation from '@/components/Navigation';
import FloatingHearts from '@/components/FloatingHearts';
import { Heart } from 'lucide-react';

const Index = () => {
  // Start date: July 17, 2024
  const startDate = new Date(2024, 6, 17);
  // End date: July 5, 2025 (353 days total)
  const endDate = new Date(2025, 6, 5);
  const [selectedDate, setSelectedDate] = useState(startDate);
  const [currentNoteNumber, setCurrentNoteNumber] = useState(1);

  // Calculate note number based on days since July 17, 2024
  const getDaysSinceStart = (date: Date) => {
    const diffTime = date.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays) + 1; // +1 because we start at day 1, not 0
  };

  // Calculate total days between start and end date
  const getTotalDays = () => {
    const diffTime = endDate.getTime() - startDate.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const totalDays = getTotalDays(); // 353 days

  // Update note number when date changes
  useEffect(() => {
    const noteNumber = getDaysSinceStart(selectedDate);
    setCurrentNoteNumber(Math.min(Math.max(noteNumber, 1), totalDays));
  }, [selectedDate, totalDays]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev' && currentNoteNumber > 1) {
      newDate.setDate(newDate.getDate() - 1);
    } else if (direction === 'next' && currentNoteNumber < totalDays) {
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
        <header className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart size={24} className="text-heart-red animate-heart-float" fill="currentColor" />
            <h1 className="handwritten text-4xl md:text-5xl text-gray-700">
              Daily Love Notes
            </h1>
            <Heart size={24} className="text-heart-red animate-heart-float" fill="currentColor" style={{ animationDelay: '1s' }} />
          </div>
          <p className="text-gray-600 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
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
          totalNotes={totalDays}
          onNavigate={handleNavigate}
        />

        <footer className="text-center mt-16 text-gray-500 text-sm animate-fade-in" style={{ animationDelay: '1s' }}>
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
