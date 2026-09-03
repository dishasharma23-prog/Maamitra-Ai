export function BrandMark({ size = 52 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MaaMitra logo — mother and child"
    >
      <circle cx="26" cy="26" r="24" stroke="#1c4f60" strokeWidth="1.4" />
      <circle cx="22" cy="15" r="4.5" stroke="#1c4f60" strokeWidth="1.4" fill="none" />
      <path
        d="M13 38 C13 29 17 25 22 25 C26 25 29 27 30 31"
        stroke="#1c4f60"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M17 33 Q23 29 33 33"
        stroke="#1c4f60"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="33" cy="30" r="4" stroke="#1c4f60" strokeWidth="1.4" fill="none" />
      <path
        d="M33 34 L33 38"
        stroke="#1c4f60"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
