"use client";

import { WhatsappIcon } from "@/components/ui/whatsapp-icon";
import { whatsappQuoteUrl } from "@/lib/site";

export function WhatsappFloat() {
  const whatsappUrl = whatsappQuoteUrl("custom sign");

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      // Labels the Contact event fired by MetaPixelEvents' outbound-link
      // listener; without it the event only knows which page it happened on.
      data-meta-source="floating-whatsapp-button"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3.5 text-[#1e1a22] shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-all duration-300 hover:bg-[#20bd5a] hover:scale-105 hover:shadow-[0_14px_35px_rgba(37,211,102,0.6)] active:scale-95 active:bg-[#128C7E] group"
    >
      <span className="relative flex h-8 w-8 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1e1a22]/25 opacity-75" />
        <WhatsappIcon className="relative h-8 w-8 text-[#1e1a22]" />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm sm:text-base font-extrabold tracking-wide transition-all duration-300 group-hover:max-w-xs sm:max-w-xs">
        Chat on WhatsApp
      </span>
    </a>
  );
}
