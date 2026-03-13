import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HandCoins, TrendingUp, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RoleSelection = () => {
  const { setActiveRole, user } = useAuth();
  const navigate = useNavigate();

  const handleSelect = (role) => {
    setActiveRole(role);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">How would you like to use Lend Sphere today?</h1>
          <p className="text-gray-500 text-lg">Choose your path and start your financial journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Borrower Option */}
          <button
            onClick={() => handleSelect('borrower')}
            className="group bg-white border-2 border-transparent hover:border-[#174E4F] rounded-[2rem] p-10 text-left transition-all hover:shadow-2xl hover:shadow-[#174E4F]/10 space-y-8"
          >
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <HandCoins className="w-8 h-8 text-[#174E4F]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">Borrow Money</h3>
              <p className="text-gray-500 leading-relaxed">
                Apply for community-funded loans with fair rates and flexible terms.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[#174E4F] font-bold">
              Access Borrower Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Lender Option */}
          <button
            onClick={() => handleSelect('lender')}
            className="group bg-[#174E4F] border-2 border-transparent hover:border-teal-300 rounded-[2rem] p-10 text-left transition-all hover:shadow-2xl hover:shadow-black/20 space-y-8"
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform text-white">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="space-y-2 text-white">
              <h3 className="text-2xl font-bold">Lend Money</h3>
              <p className="text-white/70 leading-relaxed">
                Put your savings to work and earn steady returns while helping others.
              </p>
            </div>
            <div className="flex items-center gap-2 text-teal-400 font-bold">
              Access Lender Marketplace <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            You can always switch between modes later from your profile.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
