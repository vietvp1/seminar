'use client'
import { useRouter } from "next/navigation";
import React from "react";

const HomePage = (props: any) => {
  console.log('props', props)
  const router = useRouter();
  return <div>HomePage</div>;
};

export default HomePage;
