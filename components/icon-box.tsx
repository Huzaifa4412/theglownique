import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

type IconBoxProps = {
  icon: PhosphorIcon;
  label?: string;
};

export function IconBox({ icon: Glyph, label }: IconBoxProps) {
  return (
    <i
      className="icon-box"
      aria-hidden={label ? undefined : true}
      aria-label={label}
    >
      <Glyph focusable="false" />
    </i>
  );
}
