import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata = {
  title: 'Gather & Feast — Catering & Event Planning',
  description: 'Premium catering and event planning with thoughtful design and seamless execution.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
        </head>
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
