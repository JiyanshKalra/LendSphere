import React from 'react';
import { Wallet, Info } from 'lucide-react';

const ScoreMeter = ({ currentScore = 0, scoreUsed = 0 }) => {
  const multiplier = 100;
  const totalLimit = currentScore * multiplier;
  const usedAmount = scoreUsed * multiplier;
  const availableAmount = Math.max(0, totalLimit - usedAmount);
  
  const usedPercentage = totalLimit > 0 ? (usedAmount / totalLimit) * 100 : 0;
  
  // Color logic based on usage
  const getProgressColor = () => {
    if (usedPercentage > 85) return 'bg-red-500';
    if (usedPercentage > 60) return 'bg-yellow-500';
    return 'bg-[#174E4F]';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-teal-50 rounded-lg text-[#174E4F] border border-teal-100">
              <Wallet className="w-5 h-5" />
           </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 leading-tight">Borrowing Capacity</h3>
              <p className="text-gray-400 text-xs">1 Score = ₹100</p>
            </div>
        </div>
                <div className="text-left sm:text-right">
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5 block">Available</span>
           <span className="text-2xl font-bold text-[#174E4F]">₹{availableAmount.toLocaleString()}</span>
         </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-end">
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Used: ₹{usedAmount.toLocaleString()}</span>
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Limit: ₹{totalLimit.toLocaleString()}</span>
        </div>
        
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
           <div 
             className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor()}`}
             style={{ width: `${Math.min(100, usedPercentage)}%` }}
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-start gap-3">
            <Info className="text-gray-400 mt-0.5 flex-shrink-0 w-4 h-4" />
            <p className="text-xs text-gray-600 leading-normal">
               Score of <span className="font-semibold text-gray-900">{currentScore}</span> = limit of <span className="font-semibold text-gray-900">₹{totalLimit.toLocaleString()}</span>.
            </p>
         </div>
         <div className="bg-teal-50/50 p-3 rounded-lg border border-teal-100 flex items-start gap-3">
            <Info className="text-[#174E4F] mt-0.5 flex-shrink-0 w-4 h-4" />
            <p className="text-xs text-gray-600 leading-normal">
               Timely repayments restore your limit and increase your score.
            </p>
         </div>
      </div>
    </div>
  );
};

export default ScoreMeter;
