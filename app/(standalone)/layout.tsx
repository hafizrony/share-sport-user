import React from 'react';
import "../globals.css";
export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <html lang="en">
      <head />
      <body>
        <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-800">
          {children}
        </div>
      </body>
    </html>
  );
}