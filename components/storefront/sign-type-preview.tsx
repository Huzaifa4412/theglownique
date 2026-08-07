import Image from "next/image";

import { getSignTypeDetail, type SignType } from "@/lib/store-data";

/**
 * The standard reference photo for the sign type currently selected in the
 * quote dialog.
 *
 * The dialog's left column is a narrow 360px full-height panel (roughly 1:2.3),
 * while the four standard photos are 4:3, 3:2 and 1:1. Cover-cropping them into
 * that column threw away most of the width and left a meaningless vertical
 * slice, so the photo is contained inside a fixed 4:3 frame instead — every
 * type keeps its true proportions — and the remaining column height carries the
 * type's name and description.
 *
 * The <Image> is deliberately not keyed to the sign type: reusing one element
 * lets the browser keep painting the previous photo until the new one decodes,
 * so switching types never flashes an empty frame.
 */
export function SignTypePreview({ signType }: { signType: SignType }) {
  const detail = getSignTypeDetail(signType);

  return (
    <div className="sign-type-preview">
      <div className="sign-type-preview__frame">
        <Image
          src={detail.image}
          alt={detail.imageAlt}
          fill
          // The frame is 320px wide in the desktop panel and full width minus
          // padding once the dialog stacks. Without this the browser assumes
          // 100vw and fetches a far larger file than the frame can show.
          sizes="(max-width: 800px) calc(100vw - 32px), 320px"
          // Left lazy on purpose: the dialog is mounted on every page but stays
          // display:none until opened, so eager loading would cost a request on
          // every page load for a dialog most visitors never open.
          className="sign-type-preview__image"
        />
      </div>

      <div className="sign-type-preview__copy">
        {/* Deliberately not a heading: this panel precedes the form's <h2>, so a
            heading here would break the dialog's heading order. */}
        <p className="sign-type-preview__eyebrow">Selected sign type</p>
        <p className="sign-type-preview__name">{detail.label}</p>
        <p className="sign-type-preview__desc">{detail.description}</p>
      </div>
    </div>
  );
}
