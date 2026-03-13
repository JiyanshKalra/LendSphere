import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6 w-full flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
