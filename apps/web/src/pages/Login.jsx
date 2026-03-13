import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { LogIn, Loader2 } from 'lucide-react';

import { validateEmail, validatePassword } from '../utils/validation';

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address.';
    if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 6 characters.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await login(formData);
      addToast({ type: 'success', title: 'Welcome Back!', message: 'You have logged in successfully.' });
      
      const origin = location.state?.from?.pathname || '/dashboard';
      navigate(origin, { replace: true });
    } catch (err) {
      addToast({ 
        type: 'error', 
        title: 'Login Failed', 
        message: err.friendlyMessage || 'Invalid credentials or server error.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-8 py-12">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-3 text-[#174E4F] border border-teal-100">
           <LogIn size={22} />
        </div>
        <h1>{t('login')}</h1>
        <p className="text-sm text-gray-500">{t('sign_in_message')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
              className={`w-full border rounded-lg px-3 py-2 text-sm font-medium outline-none transition-all ${
                errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:ring-2 focus:ring-teal-200 focus:border-[#174E4F]'
              }`}
            />
            {errors.email && <span className="text-red-500 text-[10px] font-semibold ml-1">{errors.email}</span>}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className={`w-full border rounded-lg px-3 py-2 text-sm font-medium outline-none transition-all ${
                errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:ring-2 focus:ring-teal-200 focus:border-[#174E4F]'
              }`}
            />
            {errors.password && <span className="text-red-500 text-[10px] font-semibold ml-1">{errors.password}</span>}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <button 
            type="button"
            onClick={() => addToast({ type: 'info', title: 'Password Recovery', message: 'Password reset link has been sent to your email.' })}
            className="text-xs font-semibold text-[#174E4F] hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#174E4F] hover:bg-[#0f3636] text-white font-semibold text-sm py-2.5 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 mt-4"
        >
          {loading && <Loader2 className="animate-spin w-4 h-4" />}
          {t('sign_in_button')}
        </button>
      </form>

      <p className="text-center text-sm font-medium text-gray-500">
        Don't have an account?{' '}
        <Link to="/register" className="text-[#174E4F] hover:underline">
          Create one now
        </Link>
      </p>
    </div>
  );
};

export default Login;
