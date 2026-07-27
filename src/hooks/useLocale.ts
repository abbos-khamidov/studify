"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

export type Locale = "uz" | "ru" | "en";

export function useLocale() {
  const pathname = usePathname();
  const [locale, setLocale] = React.useState<Locale>("uz");

  React.useEffect(() => {
    const pathLocale = pathname.split("/").filter(Boolean)[0];
    const savedLocale =
      window.localStorage.getItem("studify-locale") ||
      document.cookie.match(/(?:^|; )studify-locale=([^;]*)/)?.[1];

    if (pathLocale === "uz" || pathLocale === "ru" || pathLocale === "en") {
      setLocale(pathLocale);
      window.localStorage.setItem("studify-locale", pathLocale);
      document.documentElement.lang = pathLocale;
      return;
    }

    if (savedLocale === "uz" || savedLocale === "ru" || savedLocale === "en") {
      setLocale(savedLocale);
      document.documentElement.lang = savedLocale;
    }
  }, [pathname]);

  return locale;
}
