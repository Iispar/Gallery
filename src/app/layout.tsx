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
  icons: {
    icon: [
      { media: "(prefers-color-scheme: dark)", url: "iconLight.svg" },
      {
        media: "(prefers-color-scheme: light)",
        url: "icon.svg",
      },
    ],
  },
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
