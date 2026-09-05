import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Montserrat, Alex_Brush } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Shakib & Bristy — Wedding Celebration Invitation",
  description: "Together with our families, we joyfully invite you to celebrate the wedding of Shakib & Bristy on October 24, 2026.",
  openGraph: {
    title: "Shakib & Bristy Wedding Celebration",
    description: "Join us in celebrating our special day.",
    images: ["/couple.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${montserrat.variable} ${alexBrush.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#faf7f2] text-[#2d241a] antialiased selection:bg-[#d4af37]/30 selection:text-[#5a420b] overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
