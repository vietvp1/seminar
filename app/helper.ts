import { fetchMenuData, fetchSubMenuData } from "@/DataHelpers";
import { createClient } from "@/prismicio";

export default async function getLayoutData() {
  const client = createClient();
  let prismicMainLayoutDataRes = client.getSingle("main-layout");
  const subDataRes = fetchSubMenuData();
  const menuDataDumpRes = fetchMenuData("TopMenuLevel");
  const allData = await Promise.all([
    prismicMainLayoutDataRes,
    subDataRes,
    menuDataDumpRes,
  ]);
  const [prismicMainLayoutData, subData, menuDataDump] = allData;

  return {
    mainLayoutData: prismicMainLayoutData,
    subData,
    menuDataDump,
  };
}
