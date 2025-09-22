import { Outlet } from 'react-router-dom';
import Header from './Header';
import ChatWidget from '@/components/chat/ChatWidget';
import { useAuth } from '@/contexts/AuthContext';

const Layout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Floating Chat Widget - only show for authenticated users */}
      {user && <ChatWidget />}
    </div>
  );
};

export default Layout;