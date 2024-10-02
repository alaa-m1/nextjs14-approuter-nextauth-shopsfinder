import { useTranslation } from "@/app/i18n";
import React from "react";
const Home = async ({ lng }: { lng: string }) => {
  const { t } = await useTranslation(lng);

  return (
    <div className="flex flex-col p-1">
      {/* <h1 className="text-blue-900 mb-2 font-bold text-center">Shops Finder</h1> */}
      <div className="m-2">
        <h2 className="text-blue-800 font-bold text-lg">
          {t("home_page.info1")}
        </h2>
        <ul className="list-disc ml-3 [&_li]:mb-1">
          <li>{t("home_page.info2")}</li>
          <li>{t("home_page.info3")}</li>
          <li>{t("home_page.multiple_themes")}</li>
          <li>{t("home_page.multiple_languages")}</li>
          <li>{t("home_page.fully_authentication")}</li>
          <ul className="list-disc ml-3">
            <li style={{margin:"0px 20px"}}>{t("home_page.nextauth_provider")}</li>
            <li style={{margin:"0px 20px"}}>{t("home_page.activate_email")}</li>
            <li style={{margin:"0px 20px"}}>{t("home_page.reset_pass")}</li>
          </ul>
          <li>{t("home_page.responsive_design")}</li>
          <li>{t("home_page.user_dashboard")}</li>

          {/* <li>{t("home_page.other_feat")}</li> */}
        </ul>
      </div>
      <div className="m-1 shadow-sm hover:shadow-md w-fit p-1">
        <h2 className="text-blue-800 font-bold">
          {t("home_page.test_credentials")}
        </h2>
        <p>
          <span className="font-bold">{t("home_page.email")}&nbsp;</span>
          developerpro1000@gmail.com
        </p>
        <p>
          <span className="font-bold">{t("home_page.password")}&nbsp;</span>
          1111111111
        </p>
      </div>
    </div>
  );
};
export default Home;
