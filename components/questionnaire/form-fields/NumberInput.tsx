'use client';

interface NumberInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  error?: string;
}

export function NumberInput({
  label,
  value,
  onChange,
  placeholder,
  min,
  max,
  error,
}: NumberInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700
                   text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500
                   focus:border-transparent transition-colors ${
                     error
                       ? 'border-red-500 dark:border-red-400'
                       : 'border-gray-300 dark:border-gray-600'
                   }`}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
