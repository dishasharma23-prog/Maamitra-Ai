import { useId } from "react";

const SANS = "'Noto Sans', sans-serif";

export function TextInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  prefix,
}: {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  prefix?: string;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          style={{ fontFamily: SANS }}
          className="text-sm font-medium text-foreground/60"
        >
          {label}
        </label>
      )}
      <div
        className="flex items-stretch border border-border rounded-xl overflow-hidden bg-white"
        style={{ minHeight: 52 }}
      >
        {prefix && (
          <span
            style={{ fontFamily: SANS, minHeight: 52 }}
            className="px-4 text-foreground/50 text-base border-r border-border bg-muted flex items-center flex-shrink-0 text-sm"
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ fontFamily: SANS, minHeight: 52 }}
          className="flex-1 px-4 text-base text-foreground bg-transparent outline-none placeholder:text-foreground/25 min-w-0"
        />
      </div>
    </div>
  );
}
