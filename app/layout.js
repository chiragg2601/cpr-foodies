import './../styles/globals.css';
import Providers from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export const metadata = {
  title: 'CPR Foodies | Indian, Chinese, Continental & Fast Food Restaurant',
  description:
    'CPR Foodies brings together Indian, Chinese, Continental and Fast Food favorites under one roof. Order online, book a table, or visit us today.',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="font-sans min-h-screen flex flex-col">
        <Providers session={session}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
