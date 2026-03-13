import React from 'react';
import { UserPlus, Search, HandCoins, CalendarCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const borrowerSteps = [
    { 
      icon: <UserPlus className="w-6 h-6" />, 
      title: "Create Request", 
      desc: "Apply in minutes by sharing your story and needs." 
    },
    { 
      icon: <Search className="w-6 h-6" />, 
      title: "Get Validated", 
      desc: "Our community and AI verify your request safely." 
    },
    { 
      icon: <HandCoins className="w-6 h-6" />, 
      title: "Receive Funds", 
      desc: "Lenders offer rates, you choose what's best for you." 
    },
    { 
      icon: <CalendarCheck className="w-6 h-6" />, 
      title: "Repay Simple", 
      desc: "Automated monthly payments keep you on track." 
    }
  ];

  const lenderSteps = [
    { 
      icon: <Search className="w-6 h-6" />, 
      title: "Browse Loans", 
      desc: "Explore verified loan requests in the marketplace." 
    },
    { 
      icon: <HandCoins className="w-6 h-6" />, 
      title: "Make Offers", 
      desc: "Propose interest rates and terms that fit your goals." 
    },
    { 
      icon: <ShieldCheck className="w-6 h-6" />, 
      title: "Diversify", 
      desc: "Spread your capital across multiple loans to mitigate risk." 
    },
    { 
      icon: <ArrowRight className="w-6 h-6" />, 
      title: "Earn Interest", 
      desc: "Watch your savings grow monthly with every repayment." 
    }
  ];

  return (
    <div className="pb-32">
      {/* Hero Header */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          How it all comes together.
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          From the first request to the final repayment, we've designed a process that's simple, secure, and respectful of everyone's time.
        </p>
      </section>

      {/* For Borrowers */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-white border border-gray-100 rounded-[3rem] p-12 md:p-20 shadow-xl shadow-gray-100/50">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20">
            <div className="space-y-6">
              <span className="text-[#174E4F] font-bold text-sm uppercase tracking-[0.2em]">Step by Step</span>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">For <br />Borrowers</h2>
              <p className="text-gray-500 leading-relaxed">Getting funded is easier when you're part of a community that understands you.</p>
              <Link to="/register" className="inline-flex items-center gap-2 bg-[#174E4F] text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-[#174E4F]/20 hover:shadow-xl transition-all">
                Request Loan <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
              {borrowerSteps.map((step, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-[#174E4F] border border-teal-100">
                    {step.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                       <span className="text-xs w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold">{i+1}</span>
                       {step.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Lenders */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-teal-50/50 rounded-[3rem] p-12 md:p-20 border border-teal-100">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20">
            <div className="space-y-6 order-1 lg:order-2 text-right lg:text-left">
              <span className="text-[#174E4F] font-bold text-sm uppercase tracking-[0.2em]">Smart Investing</span>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">For <br />Lenders</h2>
              <p className="text-gray-500 leading-relaxed">Grow your wealth while helping real people succeed.</p>
              <Link to="/register" className="inline-flex flex-row-reverse lg:flex-row items-center gap-2 bg-[#174E4F] text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-[#174E4F]/20 hover:shadow-xl transition-all">
                Start Lending <ArrowRight size={18} className="lg:block" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 order-2 lg:order-1">
              {lenderSteps.map((step, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal-600 border border-gray-100 shadow-sm">
                    {step.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                       <span className="text-xs w-5 h-5 bg-[#174E4F]/10 rounded-full flex items-center justify-center text-[#174E4F] font-bold">{i+1}</span>
                       {step.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-32 px-6 max-w-5xl mx-auto text-center space-y-12">
        <h2 className="text-4xl font-bold text-gray-900">Built with Trust at the Center</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 space-y-4">
            <ShieldCheck className="mx-auto text-green-600" size={40} />
            <h4 className="font-bold text-xl">Verified Profiles</h4>
            <p className="text-gray-500 text-sm">Every user goes through KYC and AI profiling before entering the marketplace.</p>
          </div>
          <div className="p-8 border-x border-gray-100 space-y-4">
            <CalendarCheck className="mx-auto text-amber-500" size={40} />
            <h4 className="font-bold text-xl">Auto-Payments</h4>
            <p className="text-gray-500 text-sm">Automated repayment system ensures lenders get paid back consistently and on time.</p>
          </div>
          <div className="p-8 space-y-4">
            <Users className="mx-auto text-teal-600" size={40} />
            <h4 className="font-bold text-xl">Safe Community</h4>
            <p className="text-gray-500 text-sm">Rating systems and community feedback help you make the best lending decisions.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
