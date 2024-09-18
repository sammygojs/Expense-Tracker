// app/layout.tsx
import React from 'react';

export const metadata = {
  title: 'Expense Tracker',
  description: 'Track your expenses easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}