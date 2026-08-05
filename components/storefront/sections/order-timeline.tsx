import {
  StoreIcon,
  type StoreIconName,
} from "@/components/storefront/store-icon";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";

const timelineItems = [
  {
    day: "Day 1",
    title: "Inquiry & Custom Quote",
    copy: "Tell us your words, preferred size and colour.",
    icon: "FileText",
    tone: "purple",
  },
  {
    day: "Day 2",
    title: "Design Confirmation",
    copy: "Review and approve your digital neon preview.",
    icon: "ImageSquare",
    tone: "pink",
  },
  {
    day: "Day 3–10",
    title: "Handcraft & Packaging",
    copy: "Your sign is shaped, tested and packed with care.",
    icon: "Cube",
    tone: "purple",
  },
  {
    day: "Day 10–15",
    title: "Shipping & Delivery",
    copy: "Tracked delivery brings the glow to your door.",
    icon: "Truck",
    tone: "pink",
  },
] as const satisfies ReadonlyArray<{
  day: string;
  title: string;
  copy: string;
  icon: StoreIconName;
  tone: "purple" | "pink";
}>;

export function OrderTimeline() {
  return (
    <section
      className="order-timeline relative overflow-hidden border-y border-[#f2e7ec] bg-white py-14 md:py-16"
      id="custom"
      aria-labelledby="timeline-heading"
    >
      <div className="timeline-orb timeline-orb--left" aria-hidden="true" />
      <div className="timeline-orb timeline-orb--right" aria-hidden="true" />

      <div className="shell relative z-10">
        <header className="timeline-heading mx-auto max-w-3xl text-center">
          <p className="mb-2 text-[0.68rem] font-extrabold uppercase tracking-[0.17em] text-[#ce0754]">
            Clear from the start
          </p>
          <h2
            id="timeline-heading"
            className="text-[clamp(2rem,3.7vw,3.6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.06em] text-[#171319]"
          >
            Your order <PremiumAccentText>timeline</PremiumAccentText>
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#777077]">
            From first message to final delivery — here’s exactly what happens.
          </p>
          <span
            className="timeline-heading__line mt-3 inline-block h-0.5 w-20 rounded-full bg-gradient-to-r from-[#3510c7] to-[#f40b68]"
            aria-hidden="true"
          />
        </header>

        <ol
          className="timeline-stage relative mt-8 hidden h-[280px] grid-cols-4 min-[900px]:grid"
          aria-label="Four stages of your order"
        >
          <svg
            className="timeline-path pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
            viewBox="0 0 1000 280"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="arrow-purple"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3510c7" />
              </marker>
              <marker
                id="arrow-pink"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f40b68" />
              </marker>
            </defs>
            <path
              className="timeline-path__line timeline-path__line--purple"
              d="M 181 108 C 246 108, 260 184, 319 184"
              markerEnd="url(#arrow-purple)"
            />
            <path
              className="timeline-path__line timeline-path__line--pink"
              d="M 431 184 C 496 184, 510 108, 569 108"
              markerEnd="url(#arrow-pink)"
            />
            <path
              className="timeline-path__line timeline-path__line--purple"
              d="M 681 108 C 746 108, 760 184, 819 184"
              markerEnd="url(#arrow-purple)"
            />
          </svg>

          {timelineItems.map((item, index) => {
            const isLow = index % 2 === 1;
            return (
              <li
                key={item.title}
                className={`timeline-step timeline-step--${isLow ? "low" : "high"} relative z-10 flex flex-col items-center${isLow ? " pt-[128px]" : ""}`}
                data-timeline-step
              >
                {!isLow && (
                  <div className="timeline-step__copy timeline-step__copy--top text-center">
                    <strong>{item.day}</strong>
                    <span>{item.title}</span>
                  </div>
                )}
                <div
                  className={`timeline-step__node timeline-step__node--${item.tone}`}
                >
                  <StoreIcon name={item.icon} />
                  <span className="timeline-step__check">
                    <StoreIcon name="Check" />
                  </span>
                  <span className="timeline-step__badge">{index + 1}</span>
                </div>
                {isLow && (
                  <div className="timeline-step__copy timeline-step__copy--bottom text-center">
                    <strong>{item.day}</strong>
                    <span>{item.title}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <ol
          className="timeline-mobile relative mx-auto mt-10 grid max-w-xl gap-5 min-[900px]:hidden"
          aria-label="Four stages of your order"
        >
          <span
            className="timeline-mobile__track absolute bottom-7 left-[29px] top-7 w-px origin-top border-l-2 border-dashed border-[#d9cdef]"
            aria-hidden="true"
          />
          {timelineItems.map((item, index) => (
            <li
              key={item.title}
              className="timeline-mobile__step relative z-10 grid grid-cols-[60px_1fr] items-center gap-5"
              data-timeline-mobile-step
            >
              <div
                className={`timeline-mobile__node timeline-mobile__node--${item.tone}`}
              >
                <StoreIcon name={item.icon} />
                <span>{index + 1}</span>
              </div>
              <div>
                <strong>{item.day}</strong>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
