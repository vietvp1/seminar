"use client";
import { useState } from "react";

const ProductPage = (props: any) => {
  const [first, setfirst] = useState(0);
  return <div>ProductPage {props.slug} {props.a?.data?.title}</div>;
};

export default ProductPage;
