import React from "react";
<<<<<<< HEAD

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
=======
import Header from "./components/header";
export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;}>){
>>>>>>> 6671ae4b1ac48f16e8cd5621b2505294a03745bc
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
