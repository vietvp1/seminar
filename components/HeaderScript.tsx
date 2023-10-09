/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from "next/script";
import { FC } from "react";

const HeaderScript: FC = () => {
  return (
    <>
      <Script
        src="https://storage.googleapis.com/tagalys-front-end-components/tagalys-api-connector-1.3.2.min.js"
        type="text/javascript"
        strategy="beforeInteractive"
        defer
      ></Script>

      {/* Preezie guide */}
      <Script
        type="text/javascript"
        src="https://preeziecdn.azureedge.net/production/preguide.min.js"
        strategy="beforeInteractive"
        defer
      ></Script>
    </>
  );
};

export default HeaderScript;
