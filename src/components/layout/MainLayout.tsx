import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center px-4">
          <nav className="flex flex-1 items-center space-x-4">
            <a href="/programs" className="text-sm font-medium">
              番組一覧
            </a>
            <a href="/kanban" className="text-sm font-medium">
              カンバンボード
            </a>
            <a href="/calendar" className="text-sm font-medium">
              カレンダー
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <span className="text-sm">{user.email}</span>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-6 px-4">{children}</main>
    </div>
  );
}
