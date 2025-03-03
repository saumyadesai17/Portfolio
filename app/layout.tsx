import './globals.css';
import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
});

export const metadata: Metadata = {
  title: 'Saumya Desai | Full-stack Developer & AI Specialist',
  description: 'Professional portfolio of Saumya Desai, a Full-stack Developer and AI Specialist building the future with code.',
  keywords: ['developer', 'portfolio', 'full-stack', 'AI', 'React', 'Next.js', 'Three.js'],
  authors: [{ name: 'Saumya Desai' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saumyadesai.com',
    title: 'Saumya Desai | Full-stack Developer & AI Specialist',
    description: 'Professional portfolio of Saumya Desai, a Full-stack Developer and AI Specialist building the future with code.',
    siteName: 'Saumya Desai Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saumya Desai | Full-stack Developer & AI Specialist',
    description: 'Professional portfolio of Saumya Desai, a Full-stack Developer and AI Specialist building the future with code.',
    creator: '@saumyadesai',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${firaCode.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}