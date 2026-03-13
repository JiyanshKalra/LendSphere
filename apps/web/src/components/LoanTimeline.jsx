import React from 'react';
import { Check } from 'lucide-react';

const LoanTimeline = ({ status }) => {
  const steps = [
    { key: 'pending', label: 'Pending' },
    { key: 'open_for_offers', label: 'Offers Open' },
    { key: 'offer_selected', label: 'Selected' },
    { key: 'funded', label: 'Funded' },
    { key: 'repayment', label: 'Repayment' },
    { key: 'completed', label: 'Completed' },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.key === status);
  };

  const currentIndex = getCurrentStepIndex();

  return (
    <div className="w-full py-6 px-2 overflow-x-auto">
      <div className="flex items-start justify-between min-w-[600px]">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex || status === 'completed';
          const isActive = index === currentIndex;

          return (
            <div key={step.key} className="flex flex-col items-center relative flex-1">
              {/* Connector Line */}
              {index !== steps.length - 1 && (
                <div 
                  className={`absolute top-4 left-[50%] right-[-50%] h-1 z-0 transition-colors duration-500 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-100'
                  }`}
                />
              )}

              {/* Step Circle */}
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : isActive 
                      ? 'bg-white border-[#174E4F] text-[#174E4F] shadow-sm scale-105' 
                      : 'bg-white border-gray-200 text-gray-300'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" strokeWidth={3} />
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </div>

              {/* Label */}
              <div className="mt-3 text-center px-1">
                <span className={`block text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
                  isCompleted ? 'text-green-600' : isActive ? 'text-[#174E4F]' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
              </div>
              
              {/* Current Status Indicator */}
              {isActive && (
                <div className="absolute -top-6 bg-[#174E4F] text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest">
                  Current
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoanTimeline;
