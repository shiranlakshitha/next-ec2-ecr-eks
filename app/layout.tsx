import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drivana — Exceptional cars, effortless journeys",
  description: "A refined car rental experience for city escapes, business trips, and everything in between.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
