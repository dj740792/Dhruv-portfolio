import "./styles/index.css";


export const metadata = {
  title: "Dhruv's portfolio",
  description: "Dhruv's personal corner on the web",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
