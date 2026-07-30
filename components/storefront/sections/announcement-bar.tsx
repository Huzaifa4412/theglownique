import { StoreIcon } from "@/components/storefront/store-icon";

export function AnnouncementBar() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="announcement" aria-label="Store benefits">
        <div className="announcement__viewport">
          <div className="announcement__track">
            <div className="announcement__group">
              <span><StoreIcon name="Sparkle" /> Free international shipping over $99</span>
              <span aria-hidden="true">|</span>
              <span>24-month warranty</span>
              <span aria-hidden="true">|</span>
              <span>100% glow guarantee</span>
              <span aria-hidden="true">|</span>
              <span>Free design preview</span>
              <span aria-hidden="true">|</span>
              <span>Made to order</span>
              <span aria-hidden="true">|</span>
              <span>Ready to hang</span>
              <span aria-hidden="true">|</span>
              <span>Custom colours</span>
              <span aria-hidden="true">|</span>
              <span>Hand-finished</span>
              <span aria-hidden="true">|</span>
              <span>Design support included</span>
            </div>
            <div className="announcement__group" aria-hidden="true">
              <span><StoreIcon name="Sparkle" /> Free international shipping over $99</span>
              <span aria-hidden="true">|</span>
              <span>24-month warranty</span>
              <span aria-hidden="true">|</span>
              <span>100% glow guarantee</span>
              <span aria-hidden="true">|</span>
              <span>Free design preview</span>
              <span aria-hidden="true">|</span>
              <span>Made to order</span>
              <span aria-hidden="true">|</span>
              <span>Ready to hang</span>
              <span aria-hidden="true">|</span>
              <span>Custom colours</span>
              <span aria-hidden="true">|</span>
              <span>Hand-finished</span>
              <span aria-hidden="true">|</span>
              <span>Design support included</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
