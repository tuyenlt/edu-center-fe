import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function MagicInput({
  value,
  placeholder = 'Placeholder',
  className = '',
  height = 44,
  type = 'text',
  onChange,
  bgColor = 'white',
  textColor = 'black',
}) {
  const [focused, setFocused] = useState(false);

  const isFloating = focused || value;

  return (
    <div
      className={cn(`relative w-full`)}
      style={{ backgroundColor: `${bgColor}` }}
    >
      <input
        className="w-full border border-gray-300 rounded-md px-4 pt-5 pb-3 text-sm outline-none focus:border-blue-500 transition-all "
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
        }}
        onChange={onChange}
        type={type}
        style={{ height: `${height}px`, color: `${textColor}` }}
      />

      <label
        className={cn(
          'absolute left-3 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none',
          isFloating ? 'text-xs -top-2  text-blue-500' : 'text-sm top-3.5 '
        )}
      >
        {placeholder}
      </label>
    </div>
  );
}
