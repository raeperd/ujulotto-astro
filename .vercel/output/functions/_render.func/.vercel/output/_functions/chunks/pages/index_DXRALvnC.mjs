import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, i as renderHead, j as renderSlot, k as renderComponent, m as maybeRenderHead } from '../astro_BvCfnv2U.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Image } from './generic_yKnQzQRn.mjs';
import { g as getSession } from './__C-raTK11.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import Autoplay from 'embla-carousel-autoplay';
/* empty css                          */

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="Astro description"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="min-h-screen flex bg-black_2 2"> <div class="lg:max-w-[430px] min-w-[360px] w-full my-auto min-h-screen overflow-scroll border-white border-[1px] lg:mx-auto text-white [&::-webkit-scrollbar]:hidden h-dvh"> ${renderSlot($$result, $$slots["default"])} </div> </body></html>`;
}, "/Users/raeperd.117/Codes/github/ujulotto-astro/src/layouts/Layout.astro", void 0);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = React.forwardRef(
  ({
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
  }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api2) => {
      if (!api2) {
        return;
      }
      setCanScrollPrev(api2.canScrollPrev());
      setCanScrollNext(api2.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);
    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);
    const handleKeyDown = React.useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );
    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }
      setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
      if (!api) {
        return;
      }
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);
    return /* @__PURE__ */ jsx(
      CarouselContext.Provider,
      {
        value: {
          carouselRef,
          api,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            onKeyDownCapture: handleKeyDown,
            className: cn("relative", className),
            role: "region",
            "aria-roledescription": "carousel",
            ...props,
            children
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "flex",
        orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
        className
      ),
      ...props
    }
  ) });
});
CarouselContent.displayName = "CarouselContent";
const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "group",
      "aria-roledescription": "slide",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props
    }
  );
});
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous slide" })
      ]
    }
  );
});
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollNext,
      onClick: scrollNext,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
});
CarouselNext.displayName = "CarouselNext";

function NumberBall(props) {
  const { number, width, background, color, className, ...rest } = props;
  const colorFromNumber = (num) => {
    if (num < 11) {
      return "linear-gradient(143deg, #FFCD12 16.55%, #FFF2AB 71.22%)";
    }
    if (num < 21) {
      return "linear-gradient(143deg, #5F88F1 16.55%, #9BB2FB 71.22%)";
    }
    if (num < 31) {
      return "linear-gradient(143deg, #FF6969 16.55%, #FEB1B1 71.22%)";
    }
    if (num < 41) {
      return "linear-gradient(143deg, #636262 16.55%, #949494 71.22%)";
    }
    return "linear-gradient(143deg, #3CE038 16.55%, #9BFA98 70.85%)";
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `${className} aspect-square  rounded-full text-center leading-loose`,
      style: {
        width,
        fontSize: width / 2,
        background: background ?? colorFromNumber(number),
        color: color ?? "black"
      },
      ...rest,
      children: number
    }
  );
}

function BannerCarousel() {
  return /* @__PURE__ */ jsx(
    Carousel,
    {
      className: "w-full mt-5",
      opts: { loop: true, align: "center" },
      plugins: [Autoplay({ delay: 3e3 })],
      children: /* @__PURE__ */ jsx(CarouselContent, { children: [LocationCarouselItem, WeeklyWinnerCarousel].map((Item, index) => /* @__PURE__ */ jsx(Item, { children: /* @__PURE__ */ jsx(
        CarouselPageNumber,
        {
          className: "text-white",
          page: index + 1,
          lastPage: 2
        }
      ) }, index)) })
    }
  );
}
function LocationCarouselItem(props) {
  return /* @__PURE__ */ jsx(CarouselItem, { children: /* @__PURE__ */ jsxs("article", { className: "relative bg-[url(/carousel-location.png)] bg-cover bg-no-repeat py-4 px-5 rounded-xl", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "복권 판매점 쉽게 찾기" }),
    /* @__PURE__ */ jsx("p", { className: "text-xs mt-1", children: "전국 1등 판매점" }),
    props.children
  ] }) });
}
function WeeklyWinnerCarousel(props) {
  return /* @__PURE__ */ jsx(CarouselItem, { children: /* @__PURE__ */ jsxs("article", { className: "relative bg-[#e2e3ff] h-[90px] rounded-[14px] py-3 px-5 text-black", children: [
    /* @__PURE__ */ jsxs("h2", { className: "font-semibold  text-base", children: [
      /* @__PURE__ */ jsx("p", { className: "inline mr-1 bg-point text-white rounded-[14px] font-bold text-sm py-1 px-3", children: "1089회" }),
      "이번주 추첨 번호"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mt-2.5", children: [
      [1, 11, 22, 33, 44, 33].map((num, index) => /* @__PURE__ */ jsx(
        NumberBall,
        {
          number: num,
          width: 24
        },
        index
      )),
      "+",
      /* @__PURE__ */ jsx(
        NumberBall,
        {
          number: 44,
          width: 24
        }
      )
    ] }),
    props.children
  ] }) });
}
function CarouselPageNumber({
  className,
  page,
  lastPage
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `absolute bottom-[0.63rem] right-[1rem] rounded-[1.1875rem] bg-black bg-opacity-30 px-[0.62rem] py-[0.19rem] text-center text-[0.625rem] ${className}`,
      children: `${page} / ${lastPage}`
    }
  );
}

function NotificationHeader() {
  const { timeStr, stopped } = useCountdown(nextPickDate());
  return /* @__PURE__ */ jsxs("header", { className: "bg-point flex items-center justify-between rounded-[33px] px-4 py-2", children: [
    /* @__PURE__ */ jsxs("p", { className: "flex gap-1 items-center", children: [
      /* @__PURE__ */ jsx(IconClock, {}),
      /* @__PURE__ */ jsx("time", { children: timeStr })
    ] }),
    /* @__PURE__ */ jsx(IconBell, {})
  ] });
}
function IconClock() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "18",
      height: "18",
      viewBox: "0 0 18 18",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: "M9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0ZM9 16.2C5.02355 16.2 1.8 12.9764 1.8 9C1.8 5.02355 5.02355 1.8 9 1.8C12.9764 1.8 16.2 5.02355 16.2 9C16.2 10.9096 15.4414 12.7409 14.0912 14.0912C12.7409 15.4414 10.9096 16.2 9 16.2ZM12.6 10.188C12.4713 10.5708 12.1033 10.8211 11.7 10.8C11.6025 10.7976 11.5056 10.7824 11.412 10.755L8.712 9.855C8.34542 9.73118 8.099 9.38692 8.1 9V4.5C8.1 4.00294 8.50294 3.6 9 3.6C9.49706 3.6 9.9 4.00294 9.9 4.5V8.352L11.988 9.045C12.2234 9.11141 12.4216 9.27075 12.5371 9.48636C12.6525 9.70197 12.6752 9.95528 12.6 10.188Z",
          fill: "white"
        }
      )
    }
  );
}
function IconBell() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "34",
      height: "18",
      viewBox: "0 0 34 18",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M30.1214 6.71065C29.945 6.53446 29.9629 6.26467 30.1614 6.10806C30.3512 5.95826 30.6374 5.96627 30.8163 6.12144L30.84 6.14351L33.8505 9.15065C34.0498 9.34982 34.0498 9.65067 33.8505 9.84984L30.84 12.857C30.6636 13.0332 30.3598 13.049 30.1614 12.8924C29.9715 12.7426 29.9469 12.4893 30.0995 12.3133L30.1214 12.2898L32.7974 9.61677C32.8639 9.55039 32.8639 9.4501 32.7974 9.38371L30.1214 6.71065Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M26.1214 6.71065C25.945 6.53446 25.9629 6.26467 26.1614 6.10806C26.3512 5.95826 26.6374 5.96627 26.8163 6.12144L26.84 6.14351L29.8505 9.15065C30.0498 9.34982 30.0498 9.65067 29.8505 9.84984L26.84 12.857C26.6636 13.0332 26.3598 13.049 26.1614 12.8924C25.9715 12.7426 25.9469 12.4893 26.0995 12.3133L26.1214 12.2898L28.7974 9.61677C28.8639 9.55039 28.8639 9.4501 28.7974 9.38371L26.1214 6.71065Z",
            fill: "white"
          }
        ),
        /* @__PURE__ */ jsx("g", { "clip-path": "url(#clip0_205_1536)", children: /* @__PURE__ */ jsx(
          "path",
          {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M9 0C13.0874 0 16.4009 3.31836 16.4009 7.41176L16.4006 12.7056L16.9427 12.7059C17.5266 12.7059 18 13.1799 18 13.7647C18 14.3495 17.5266 14.8235 16.9427 14.8235H12.1718C12.1718 16.5778 10.7517 18 9 18C7.24826 18 5.82819 16.5778 5.82819 14.8235H1.05727C0.473355 14.8235 0 14.3495 0 13.7647C0 13.1799 0.473355 12.7059 1.05727 12.7059L1.59891 12.7056L1.59912 7.41176C1.59912 3.31836 4.91261 0 9 0ZM10.0573 14.8235H7.94273C7.94273 15.4083 8.41609 15.8824 9 15.8824C9.58391 15.8824 10.0573 15.4083 10.0573 14.8235ZM9 2.11765C6.08043 2.11765 3.71366 4.4879 3.71366 7.41176V12.7059H14.2863V7.41176C14.2863 4.4879 11.9196 2.11765 9 2.11765Z",
            fill: "white"
          }
        ) }),
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip0_205_1536", children: /* @__PURE__ */ jsx(
          "rect",
          {
            width: "18",
            height: "18",
            fill: "white"
          }
        ) }) })
      ]
    }
  );
}
function useCountdown(targetDate) {
  const targetDateTime = new Date(targetDate).getTime();
  const [countDown, setCountDown] = useState(
    targetDateTime - (/* @__PURE__ */ new Date()).getTime()
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown((countDown2) => countDown2 - 1e3);
    }, 1e3);
    return () => clearInterval(interval);
  }, [targetDateTime]);
  const days = Math.floor(countDown / (1e3 * 60 * 60 * 24));
  const hours = Math.floor(
    countDown % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)
  );
  const minutes = Math.floor(countDown % (1e3 * 60 * 60) / (1e3 * 60));
  const seconds = Math.floor(countDown % (1e3 * 60) / 1e3);
  const formatStr = `${days}일 ${hours}:${minutes?.toString().padStart(2, "0")}:${seconds?.toString().padStart(2, "0")}`;
  return {
    timeStr: formatStr,
    stopped: seconds < 0
  };
}
function nextPickDate() {
  const now = /* @__PURE__ */ new Date();
  const nextPickDate2 = new Date(now);
  nextPickDate2.setDate(now.getDate() + (7 + 6 - now.getDay()) % 7);
  nextPickDate2.setHours(20, 0, 0, 0);
  return nextPickDate2;
}

const IconLoginArrow = new Proxy({"src":"/_astro/iconLoginArrow.C5-OlOtP.svg","width":9,"height":16,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/raeperd.117/Codes/github/ujulotto-astro/src/images/iconLoginArrow.svg";
							}
							
							return target[name];
						}
					});

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const session = await getSession(Astro2.request);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "\uC6B0\uC8FC\uB85C\uB610" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="px-4 w-full py-1"> ${renderComponent($$result2, "NotificationHeader", NotificationHeader, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/raeperd.117/Codes/github/ujulotto-astro/src/components/NotificationHeader.tsx", "client:component-export": "default" })} <div class="flex items-center gap-2 mt-[30px]"> ${session ? renderTemplate`<p>${`\uC548\uB155\uD558\uC138\uC694 ${session.user?.name}\uB2D8`}</p>` : renderTemplate`<a href="/login">로그인 해주세요</a>`} ${renderComponent($$result2, "Image", $$Image, { "src": IconLoginArrow, "alt": "login arrow", "width": 9, "height": 16 })} </div> ${renderComponent($$result2, "BannerCarousel", BannerCarousel, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/raeperd.117/Codes/github/ujulotto-astro/src/components/BannerCarousel.tsx", "client:component-export": "default" })} </main> ` })}`;
}, "/Users/raeperd.117/Codes/github/ujulotto-astro/src/pages/index.astro", void 0);

const $$file = "/Users/raeperd.117/Codes/github/ujulotto-astro/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, index as i };
