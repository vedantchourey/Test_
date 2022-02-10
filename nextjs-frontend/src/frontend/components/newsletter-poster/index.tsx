import React from "react"
import { deviceTypes } from "../../redux-store/layout/device-types";
import { isDeviceTypeSelector } from "../../redux-store/layout/layout-selectors";
import { useAppSelector } from "../../redux-store/redux-store";
import NoobDesktopNewsletterPoster from "./noob-desktop-newsletter-poster"
import NoobMobileNewsletterPoster from "./noob-mobile-newsletter-poster"

export default function NewsletterPoster(): JSX.Element {
  const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));
  return (
    <nav>
      {isDesktop && <NoobDesktopNewsletterPoster />}
      {!isDesktop && <NoobMobileNewsletterPoster />}
    </nav>
  );
}
