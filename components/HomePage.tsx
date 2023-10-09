"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import withSuppense from "./withSuppense";

const HomePage = () => {
  const [data, setData] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  console.log("searchParams :>> ", pathname);
  const q = searchParams?.get("q") || "";

  useEffect(() => {
    console.log(q);
  }, [q]);

  useEffect(() => {
    console.log("HomePage client side");
    const fetchData = async function () {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, []);

  return (
    <div>
      HomePage Okeeeeeeee
      <div>
        {data.map((item, i) => (
          <div style={{ border: "solid 1px lightgray" }} key={i}>
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default withSuppense(HomePage);
