import { createClient } from "@/prismicio";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createClient();
  const a = await client.getSingle("homepage");
  console.log('logggggggggggg')
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
