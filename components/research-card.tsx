"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { tagColor } from "@/lib/constants";

export function ResearchCard({
  title,
  desc,
  tags,
  date,
  readLabel,
  href,
}: {
  title: string;
  desc: string;
  tags: readonly string[];
  date: string;
  readLabel: string;
  /** When set, the whole card links to this URL (blog-style detail). */
  href?: string;
}) {
  const cta = href ? (
    <span className="inline-flex items-center gap-1 text-xs text-neutral-600 group-hover:text-neutral-900">
      {readLabel} <ChevronRight className="w-3 h-3" />
    </span>
  ) : (
    <Button
      variant="ghost"
      size="sm"
      className="text-neutral-600 hover:text-neutral-900 p-0 h-auto gap-1 text-xs"
    >
      {readLabel} <ChevronRight className="w-3 h-3" />
    </Button>
  );

  const card = (
    <Card className="h-full bg-white border-neutral-200 hover:border-neutral-400 transition-all duration-300 group shadow-sm">
      <CardContent className="p-6 h-full flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base font-semibold leading-snug group-hover:text-neutral-900 transition-colors text-neutral-900">
            {title}
          </h3>
          <span className="text-xs text-neutral-500 shrink-0 mt-0.5">{date}</span>
        </div>
        <p className="text-sm text-neutral-600 leading-relaxed flex-1">{desc}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={`text-[11px] px-2 py-0 ${tagColor[tag] ?? "text-neutral-600 border-neutral-300"}`}
              >
                {tag}
              </Badge>
            ))}
          </div>
          {cta}
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {card}
      </Link>
    );
  }

  return card;
}

export function CarouselWithDots({ children, itemCount }: { children: React.ReactNode; itemCount: number }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setSnapCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
      <CarouselContent className="-ml-4">
        {children}
      </CarouselContent>
      {itemCount > 3 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <CarouselPrevious className="static translate-y-0 shrink-0" />
          <div className="flex gap-2">
            {Array.from({ length: snapCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === current ? "w-4 h-1.5 bg-neutral-900" : "w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-500"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <CarouselNext className="static translate-y-0 shrink-0" />
        </div>
      )}
    </Carousel>
  );
}
