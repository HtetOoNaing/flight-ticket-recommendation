import './globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import Topbar from "@/components/layout/Topbar";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'FlySmart - Flight Recommendation System',
  description: 'Find the best flight deals tailored to your preferences',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Toaster position="top-right" richColors={true} />
        <Topbar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-sky-700 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} FlySmart. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}