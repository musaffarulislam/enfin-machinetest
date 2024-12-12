import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='w-full h-full bg-background'>
        <div className="margin">
          <div className="max-w-screen-xl mx-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
