import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Header from "../components/header";
import { TRPCReactProvider } from "~/trpc/react";
import Container from "~/components/container";
import Footer from "~/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ZeetCode",
  description: "LeetCode replica ZeetCode",
  icons: [{ rel: "icon", url: "/fplogoblack.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Container>
          <Header />
          <TRPCReactProvider cookies={cookies().toString()}>
            {children}
          </TRPCReactProvider>
          <Footer />
        </Container>
      </body>
    </html>
  );
}
