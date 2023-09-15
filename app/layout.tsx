import getLayoutData from "./helper";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mainLayoutData, subData, menuDataDump } = await getLayoutData()
  console.log({ mainLayoutData, subData, menuDataDump })
  console.log('log')
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
