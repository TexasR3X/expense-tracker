import localFont from "next/font/local";
import "./styles/globals.css";
import FirebaseAuthProvider from "@/contexts/FirebaseAuthContext";
import DBCollectionsProvider from "@/contexts/DBCollectionsContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Expense Tracker",
  description: "App that tracks expenses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <FirebaseAuthProvider>
          <DBCollectionsProvider>
            {children}
          </DBCollectionsProvider>
        </FirebaseAuthProvider>
      </body>
    </html>
  );
}