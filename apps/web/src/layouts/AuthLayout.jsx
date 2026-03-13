import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Small top branding */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="text-xl font-semibold text-[#174E4F]">Lend Sphere</span>
          </Link>
          <p className="text-sm text-gray-500 mt-1">Community banking for everyone</p>
        </div>

        {/* Form card */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
