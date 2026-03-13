import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import offerService from '../services/offerService';
import { Loader2, TrendingUp, Clock, CheckCircle2, XCircle, IndianRupee, ArrowRight } from 'lucide-react';

const MyInvestments = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOffers = async () => {
      try {
        setLoading(true);
        const response = await offerService.getMyOffers();
        setOffers(response.data);
      } catch (err) {
        console.error('Failed to fetch investments:', err);
        addToast({
          type: 'error',
          title: 'Load Error',
          message: err.friendlyMessage || 'Unable to load your investments.'
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMyOffers();
  }, [user]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#174E4F]" size={32} />
      </div>
    );
  }

  const pending = offers.filter(o => o.status === 'pending');
  const accepted = offers.filter(o => o.status === 'accepted');
  const rejected = offers.filter(o => o.status === 'rejected');

  const statusIcon = (status) => {
    if (status === 'accepted') return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    if (status === 'rejected') return <XCircle className="w-4 h-4 text-red-500" />;
    return <Clock className="w-4 h-4 text-amber-500" />;
  };

  const statusStyle = (status) => {
    if (status === 'accepted') return 'border-green-200 text-green-700';
    if (status === 'rejected') return 'border-red-200 text-red-600';
    return 'border-amber-200 text-amber-700';
  };

  const renderOfferCard = (offer) => {
    const loanId = typeof offer.loanId === 'object' ? offer.loanId._id : offer.loanId;
    const loanPurpose = offer.loanId?.purpose || 'Loan';
    const loanAmount = offer.loanId?.amount;

    return (
      <div
        key={offer._id}
        className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all flex flex-col justify-between gap-4"
      >
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-900">{loanPurpose}</p>
            {loanAmount && (
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                {loanAmount.toLocaleString('en-IN')} requested
              </p>
            )}
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${statusStyle(offer.status)}`}>
            {statusIcon(offer.status)}
            <span className="ml-1">{offer.status}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Rate</p>
            <p className="text-lg font-bold text-[#174E4F]">{offer.interestRate}%</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Term</p>
            <p className="text-lg font-bold text-gray-900">{offer.repaymentPeriod}mo</p>
          </div>
        </div>

        <button
          onClick={() => navigate(`/dashboard/marketplace/${loanId}`)}
          className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium text-sm py-2 rounded-lg border border-gray-200 transition-all flex items-center justify-center gap-1.5"
        >
          View Loan <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">My Investments</h1>
        <p className="text-sm text-gray-600 mt-1">Track your lending offers and active investments.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600 border border-amber-100">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pending.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg text-green-600 border border-green-100">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Accepted</p>
              <p className="text-2xl font-bold text-green-600">{accepted.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg text-red-500 border border-red-100">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Declined</p>
              <p className="text-2xl font-bold text-red-500">{rejected.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Offers list */}
      {offers.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-16 text-center shadow-sm space-y-4">
          <TrendingUp className="mx-auto w-12 h-12 text-gray-300" />
          <p className="text-sm font-medium text-gray-400">You haven't made any investment offers yet.</p>
          <button
            onClick={() => navigate('/dashboard/marketplace')}
            className="bg-[#174E4F] hover:bg-[#0f3636] text-white font-semibold text-sm px-6 py-2 rounded-lg transition"
          >
            Browse Marketplace
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {pending.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Pending Offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pending.map(renderOfferCard)}
              </div>
            </div>
          )}
          {accepted.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Active Investments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accepted.map(renderOfferCard)}
              </div>
            </div>
          )}
          {rejected.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Declined</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rejected.map(renderOfferCard)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyInvestments;
