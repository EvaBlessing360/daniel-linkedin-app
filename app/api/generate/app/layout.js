export const metadata = {
  title: "Daniel's LinkedIn Post Generator · Overbooked",
  description: "Generate LinkedIn posts in Daniel's brand voice — helping coaches and founders get overbooked.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #0a0a0a; }
          textarea:focus { border-color: #6366f1 !important; }
          button:hover:not(:disabled) { opacity: 0.88; }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
