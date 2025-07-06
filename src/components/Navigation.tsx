
import React from 'react';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  currentNote: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentNote, onNavigate }) => {
  return (
    <div className="flex items-center justify-center space-x-6 mt-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onNavigate('prev')}
        disabled={currentNote <= 1}
        className="bg-white/50 backdrop-blur-sm hover:bg-miffy-pink-light transition-colors rounded-full px-4 py-2 disabled:opacity-50"
      >
        <ArrowLeft size={16} className="mr-2" />
        Previous
      </Button>
      
      <div className="flex items-center space-x-2 text-miffy-pink-dark">
        <Heart size={12} fill="currentColor" />
        <span className="text-sm font-medium">
          {currentNote} of 365
        </span>
        <Heart size={12} fill="currentColor" />
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onNavigate('next')}
        disabled={currentNote >= 365}
        className="bg-white/50 backdrop-blur-sm hover:bg-miffy-pink-light transition-colors rounded-full px-4 py-2 disabled:opacity-50"
      >
        Next
        <ArrowRight size={16} className="ml-2" />
      </Button>
    </div>
  );
};

export default Navigation;
