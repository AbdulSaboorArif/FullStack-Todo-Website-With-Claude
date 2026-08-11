type IconProps = {
  name: string;
  filled?: boolean;
  className?: string;
  size?: number | string;
};

export function Icon({ name, filled = false, className = "", size = 24 }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${filled ? "fill" : ""} ${className}`}
      style={{ fontSize: typeof size === "number" ? `${size}px` : size }}
    >
      {name}
    </span>
  );
}
