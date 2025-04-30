import { Roboto } from "next/font/google";
import "./globals.css";

const getRoboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"]
});

export const metadata = {
  title: "CalTriks",
  description: "Web Calculasi Matriks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${getRoboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
