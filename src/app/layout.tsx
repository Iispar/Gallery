import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* const inconsolataSemiBold = localFont({
  src: "../../public/Inconsolata-SemiBold.ttf",
}); */

const inconsolataMedium = localFont({
  src: "../../public/Inconsolata-Medium.ttf",
});

export const metadata: Metadata = {
  title: "Gallery",
  // icons: "red.jpeg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inconsolataMedium.className}   antialiased`}>
        {children}
      </body>
    </html>
  );
}
