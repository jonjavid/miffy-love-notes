
import React from 'react';
import { Heart } from 'lucide-react';
import BunnyEars from './BunnyEars';
import { dailyNotes } from '../data/dailyNotes';

interface DailyNoteProps {
  noteNumber: number;
  date: string;
}

const DailyNote: React.FC<DailyNoteProps> = ({ noteNumber, date }) => {
  // Get the note for the current day (noteNumber is 1-indexed, array is 0-indexed)
  const currentNote = dailyNotes[noteNumber - 1] || "A gentle reminder that you are valued and appreciated.";

  return (
    <div className="max-w-md mx-auto">
      <BunnyEars />
      
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg gentle-glow fade-in-up">
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 text-miffy-pink-dark mb-2">
            <Heart size={16} fill="currentColor" />
            <span className="text-sm font-medium">{date}</span>
            <Heart size={16} fill="currentColor" />
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="handwritten text-3xl md:text-4xl text-gray-700 mb-4 leading-relaxed">
            Note #{String(noteNumber).padStart(3, '0')}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {currentNote}
          </p>
        </div>
        
        <div className="flex justify-center mt-6">
          <div className="w-12 h-1 bg-gradient-to-r from-miffy-pink-light via-miffy-pink to-miffy-pink-light rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default DailyNote;
