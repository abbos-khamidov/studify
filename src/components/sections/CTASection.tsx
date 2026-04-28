"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function CTASection() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const headingRef = React.useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = React.useRef<HTMLParagraphElement | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !subtitleRef.current || !buttonRef.current) return;
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    const button = buttonRef.current;

    const ctx = gsap.context(() => {
      if (isMobile) {
        gsap.set(section, { backgroundColor: "#FF8225" });
        gsap.fromTo(
          [heading, subtitle, button],
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          }
        );
        return;
      }

      gsap.set(section, { backgroundColor: "#FFFFFF" });
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom-=200",
        end: "center center",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(section, {
            backgroundColor: `rgb(${Math.round(255)}, ${Math.round(255 - 125 * p)}, ${Math.round(255 - 218 * p)})`,
          });
        },
      });

      gsap.fromTo(
        heading,
        { opacity: 0, y: -100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );
      gsap.fromTo(
        subtitle,
        { opacity: 0, y: -100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.82,
          delay: 0.2,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );
      gsap.fromTo(
        button,
        { opacity: 0, y: -100, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.86,
          delay: 0.4,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden py-20 lg:py-24">
      <div className="cta-float-circle absolute -left-20 top-8 h-[220px] w-[220px] rounded-full bg-[#FFA54D] opacity-15" />
      <div className="cta-float-circle absolute right-[-90px] top-12 h-[340px] w-[340px] rounded-full bg-[#FFA54D] opacity-15 [animation-delay:1.2s]" />
      <div className="cta-float-circle absolute left-1/3 bottom-[-140px] h-[280px] w-[280px] rounded-full bg-[#FFA54D] opacity-15 [animation-delay:2.3s]" />
      <div className="cta-float-circle absolute right-1/4 bottom-[-120px] h-[200px] w-[200px] rounded-full bg-[#FFA54D] opacity-15 [animation-delay:0.7s]" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 ref={headingRef} className="text-white text-4xl lg:text-5xl font-extrabold tracking-tight">
            Готов изменить свою жизнь?
          </h2>
          <p ref={subtitleRef} className="text-white/85 text-lg mt-6 font-medium">
            Получи бесплатную консультацию за 5 минут
          </p>
          <button
            ref={buttonRef}
            className="mt-10 rounded-pill bg-white px-8 py-4 font-bold text-brand transition-all duration-300 hover:scale-105 hover:text-[#d66c1f] hover:shadow-[0_16px_48px_rgba(26,17,8,0.2)]"
          >
            Начать сейчас &rarr;
          </button>
        </div>
      </Container>
    </section>
  );
}
