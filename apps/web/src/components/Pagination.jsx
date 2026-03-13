import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-6 py-8 border-t border-gray-100 mt-8">
      <div className="flex items-center gap-4 w-full max-w-sm">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-sm active:scale-[0.98] ${
            currentPage === 1
              ? 'bg-gray-50 text-gray-300 cursor-not-allowed shadow-none'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-[#174E4F] hover:text-[#174E4F]'
          }`}
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <div className="flex items-center gap-1.5 min-w-fit px-4">
          <span className="text-sm font-semibold text-gray-900">{currentPage}</span>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-medium text-gray-500">{totalPages}</span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-sm active:scale-[0.98] ${
            currentPage === totalPages
              ? 'bg-gray-50 text-gray-300 cursor-not-allowed shadow-none'
              : 'bg-[#174E4F] text-white hover:bg-[#0f3636]'
          }`}
          aria-label="Next Page"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      {/* Quick dots indicator */}
      <div className="flex gap-1.5">
        {Array.from({ length: Math.min(totalPages, 10) }).map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all ${
              currentPage === i + 1 ? 'w-6 bg-[#174E4F]' : 'w-1.5 bg-gray-200'
            }`} 
          />
        ))}
      </div>
    </div>
  );
};

export default Pagination;
