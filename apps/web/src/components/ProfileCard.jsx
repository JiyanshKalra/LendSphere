import React from 'react';
import ScoreMeter from './ScoreMeter';

const ProfileCard = ({ user, profile, onEditClick }) => {
  if (!user) return null;

  const score = profile?.loanScore || 750;
  const scoreUsed = profile?.scoreUsed || 150; 
  const loansCompleted = profile?.loansCompleted || 3;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
      <div className="flex items-start gap-6">
        {/* Compact Avatar */}
        <div className="w-14 h-14 bg-[#174E4F] rounded-full flex flex-shrink-0 items-center justify-center shadow-sm">
          <span className="text-xl font-semibold text-white uppercase">
            {user.name ? user.name.charAt(0) : '?'}
          </span>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 leading-tight">{user.name}</h2>
              <span className="mt-1 inline-block px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase tracking-wider border border-gray-200">{user.role}</span>
            </div>
            
            {onEditClick && (
              <button 
                onClick={onEditClick}
                className="bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-xs py-1.5 px-4 rounded-lg border border-gray-200 transition-all active:scale-[0.98]"
              >
                Edit Profile
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500 font-medium">{user.email || 'No email provided'}</p>
        </div>
      </div>

     <div className="border-t border-gray-100 pt-6">
         <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Financial Overview</h4>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScoreMeter currentScore={score} scoreUsed={scoreUsed} />
            
            <div className="bg-white border border-gray-200 p-4 rounded-xl flex flex-col justify-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Loans Completed</span>
              <span className="text-3xl font-bold text-gray-900">{loansCompleted}</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProfileCard;
