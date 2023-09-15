import ProductPage from "@/components/ProductPage";
import { createClient } from "@/prismicio";

type Props = {
  params: { slug: string };
};

export const revalidate = 60;

export async function generateStaticParams() {
  const products = [];
  for (let i = 0; i < 1000; i++) {
    products.push({ slug: `slug-${i}` });
  }
  return products;
}

export default async function Product({ params: { slug } }: Props) {
  const client = createClient();
  const a = await client.getSingle("homepage");
  return (
    <div>
      {slug}
      <ProductPage a={a} />
    </div>
  );
}
