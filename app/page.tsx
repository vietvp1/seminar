import HomePage from "@/components/HomePage";
import { createClient } from "@/prismicio";

export const revalidate = 60;

export default async function Page() {
  const client = createClient()
  const a = await client.getSingle('homepage')
  return <HomePage a={a}/>;
}
