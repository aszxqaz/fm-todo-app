import clsx from "clsx";
import type { PropsWithChildren } from "react";
import bgDesktopDarkAvif from "./assets/img/bg-desktop-dark.avif";
import bgDesktopDarkJpg from "./assets/img/bg-desktop-dark.jpg";
import bgDesktopLightAvif from "./assets/img/bg-desktop-light.avif";
import bgDesktopLightJpg from "./assets/img/bg-desktop-light.jpg";
import bgMobileDarkAvif from "./assets/img/bg-mobile-dark.avif";
import bgMobileDarkJpg from "./assets/img/bg-mobile-dark.jpg";
import bgMobileLightAvif from "./assets/img/bg-mobile-light.avif";
import bgMobileLightJpg from "./assets/img/bg-mobile-light.jpg";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        "min-h-screen isolate select-none",
        "text-base",
        "text-body bg-body-bg dark:text-body-dark dark:bg-body-bg-dark"
      )}
    >
      <div className="absolute -z-50 w-full h-50 select-none md:h-75 2xl:100">
        <BackgroundPicture
          className={clsx(
            "absolute inset-0 dark:hidden",
            "bg-linear-[78deg] from-gradient-light-start to-gradient-light-end"
          )}
          avifDesktop={bgDesktopLightAvif}
          avifMobile={bgMobileLightAvif}
          jpgDesktop={bgDesktopLightJpg}
          jpgMobile={bgMobileLightJpg}
        />
        <BackgroundPicture
          className={clsx(
            "absolute inset-0 not-dark:hidden",
            "bg-linear-[78deg] from-gradient-dark-start to-gradient-dark-end"
          )}
          avifDesktop={bgDesktopDarkAvif}
          avifMobile={bgMobileDarkAvif}
          jpgDesktop={bgDesktopDarkJpg}
          jpgMobile={bgMobileDarkJpg}
        />
      </div>
      {children}
    </div>
  );
}

type BackgroundPictureProps = {
  avifDesktop: string;
  avifMobile: string;
  jpgDesktop: string;
  jpgMobile: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

function BackgroundPicture({
  avifDesktop,
  avifMobile,
  jpgDesktop,
  jpgMobile,
  ...props
}: BackgroundPictureProps) {
  return (
    <picture {...props}>
      <source
        srcSet={avifDesktop}
        type="image/avif"
        media="(min-width: 48rem)"
      />
      <source srcSet={jpgDesktop} type="image/jpg" media="(min-width: 48rem)" />
      <source srcSet={avifMobile} type="image/avif" />
      <source srcSet={jpgMobile} type="image/jpg" />
      <img
        src={jpgMobile}
        alt=""
        className="w-full h-full object-cover opacity-25"
      />
    </picture>
  );
}
