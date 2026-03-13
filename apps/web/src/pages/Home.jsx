import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Users, IndianRupee, TrendingUp, BarChart3 } from 'lucide-react';

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-br from-teal-50/50 to-transparent -z-10 rounded-full blur-3xl opacity-50" />
        
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-teal-50 text-[#174E4F] px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border border-teal-100 animate-fade-in">
            <Zap className="w-3 h-3" /> The Future of Community Finance
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Borrow Honestly.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#174E4F] to-teal-600">
              Lend Generously.
            </span>
          </h1>
          
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Lend Sphere connects people who need capital with people who want to put their savings to work. No middleman, no hidden fees, just community.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="bg-[#174E4F] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#0f3636] transition-all flex items-center gap-2 shadow-xl shadow-[#174E4F]/10 hover:shadow-2xl hover:shadow-[#174E4F]/20 active:scale-95"
            >
              Get Started for Free <ArrowRight size={20} />
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-600 font-semibold px-8 py-4 rounded-full border border-gray-200 hover:bg-gray-50 transition-all"
            >
              How it Works
            </Link>
          </div>

          <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">₹10Cr+</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Disbursed</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">15%</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Avg. Returns</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">50k+</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Users</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">4.9/5</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Borrowers */}
      <section className="bg-gray-50 py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="p-3 bg-white w-fit rounded-2xl shadow-sm border border-gray-100">
              <IndianRupee className="w-8 h-8 text-[#174E4F]" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Empower Your Goals</h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Don't let rigid banking systems hold you back. At Lend Sphere, we look at your character, your community standing, and your unique story.
            </p>
            <ul className="space-y-4">
              {[
                "Faster approval than traditional banks",
                "Interest rates customized by real lenders",
                "No prepayment penalties ever",
                "Build your financial reputation"
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="p-1 bg-green-100 rounded-full text-green-600">
                    <ShieldCheck size={16} />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 text-[#174E4F] font-bold text-lg hover:underline underline-offset-4"
            >
              Start borrowing today <ArrowRight size={20} />
            </Link>
          </div>

          <div className="relative">
            <div className="bg-[#174E4F] rounded-3xl p-10 text-white shadow-2xl space-y-6">
              <div className="flex justify-between items-center bg-white/10 p-4 rounded-xl backdrop-blur-md">
                <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Loan Request</p>
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div className="space-y-1">
                <p className="text-sm opacity-60">Amount Requested</p>
                <p className="text-4xl font-bold">₹2,50,000</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-xs opacity-60 uppercase mb-1">Duration</p>
                  <p className="text-xl font-bold">12 Months</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-xs opacity-60 uppercase mb-1">Rate Selected</p>
                  <p className="text-xl font-bold">9.5%</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs opacity-60 uppercase">
                  <span>Funding Progress</span>
                  <span>85% Funded</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-400 h-full w-[85%]" />
                </div>
              </div>
            </div>
            {/* Decorative background cards */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-dashed border-gray-200 -z-10 rounded-3xl" />
          </div>
        </div>
      </section>

      {/* Benefits for Lenders */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                <BarChart3 className="text-teal-600" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Portfolio ROI</p>
                <p className="text-2xl font-bold text-gray-900">+14.2%</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4 translate-y-8">
                <Users className="text-amber-500" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Lives Impacted</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
                <TrendingUp className="text-green-500" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Earned</p>
                <p className="text-2xl font-bold text-gray-900">₹42,500</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4 translate-y-8">
                <ShieldCheck className="text-blue-500" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Safe Assets</p>
                <p className="text-2xl font-bold text-gray-900">100%</p>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-8">
            <div className="p-3 bg-teal-50 w-fit rounded-2xl border border-teal-100">
              <TrendingUp className="w-8 h-8 text-[#174E4F]" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Invest in Real People</h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Earn better returns than a savings account while making a tangible difference. Diversify your portfolio across hundreds of individual loan requests.
            </p>
            <ul className="space-y-4">
              {[
                "Target returns of 12% to 18% p.a.",
                "Choose who you lend to based on their story",
                "Automated risk scoring and document verification",
                "Start with as little as ₹5,000 per loan"
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="p-1 bg-teal-50 rounded-full text-[#174E4F]">
                    <ShieldCheck size={16} />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 text-[#174E4F] font-bold text-lg hover:underline underline-offset-4"
            >
              Start lending today <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-[#174E4F] rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/20 blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 blur-[100px] -ml-32 -mb-32" />
          
          <div className="relative space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">Ready to join the<br />community?</h2>
            <p className="text-white/70 max-w-lg mx-auto leading-relaxed">
              Whether you're reaching for a dream or helping someone else achieve theirs, Lend Sphere is where you belong.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/register"
                className="bg-white text-[#174E4F] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all flex items-center gap-2 shadow-xl shadow-black/20"
              >
                Create Account
              </Link>
              <Link
                to="/login"
                className="text-white/90 font-semibold px-10 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-all"
              >
                Login to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
