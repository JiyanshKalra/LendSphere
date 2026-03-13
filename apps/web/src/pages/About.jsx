import React from 'react';
import { Target, Users, Heart, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="pb-32">
      {/* Header */}
      <section className="py-24 px-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">Our Story</h1>
          <p className="text-xl text-gray-500 leading-relaxed font-medium">
            We're on a mission to humanize finance by building bridges within communities.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="p-3 bg-red-50 w-fit rounded-2xl border border-red-100 text-red-600">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Why Lend Sphere?</h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Conventional banking often forgets that behind every loan application is a human dream, a family needing a boost, or a small business ready to sprout. 
            </p>
            <p className="text-gray-500 text-lg leading-relaxed">
              Lend Sphere was born from the belief that people are more than their credit scores. By connecting borrowers and lenders directly, we foster transparency, reduce costs, and ensure that wealth stays within the community.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-[2.5rem] p-12 shadow-sm space-y-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0 p-4 bg-teal-50 rounded-2xl text-[#174E4F] h-fit">
                <Target size={24} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-gray-900">The Mission</h4>
                <p className="text-gray-500 leading-relaxed">To democratize access to capital by creating a platform where trust is the primary currency.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 p-4 bg-teal-50 rounded-2xl text-[#174E4F] h-fit">
                <Globe size={24} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-gray-900">The Vision</h4>
                <p className="text-gray-500 leading-relaxed">A world where financial opportunities are inclusive, fair, and community-driven.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-[#174E4F] text-white px-6">
        <div className="max-w-7xl mx-auto text-center space-y-20">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Our Core Values</h2>
            <p className="text-white/60 max-w-xl mx-auto">The principles that guide every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Transparency", desc: "No hidden costs. No complicated jargon. Just clear, honest terms." },
              { title: "Empowerment", desc: "Tools to help people grow their wealth and achieve their goals." },
              { title: "Trust", desc: "Rigorous verification systems to keep the community safe and sound." }
            ].map((value, i) => (
              <div key={i} className="space-y-4">
                <div className="text-teal-400 text-4xl font-black opacity-30">0{i+1}</div>
                <h4 className="text-2xl font-bold">{value.title}</h4>
                <p className="text-white/70 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto space-y-10">
        <h2 className="text-3xl font-bold text-gray-900 leading-tight">Join a movement that's redefining what banking means.</h2>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-[#174E4F] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2"
          >
            Create Your Account <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
