import { Providers } from './providers';
import MainLayout from '@/components/layout/MainLayout';
import './globals.css';

export const metadata = {
  title: '番組管理システム',
  description: 'リモートチームのための番組進捗管理システム',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
