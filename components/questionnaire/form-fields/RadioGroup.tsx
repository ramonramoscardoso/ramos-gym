'use client';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  error?: string;
}

export function RadioGroup({
  label,
  value,
  onChange,
  options,
  error,
}: RadioGroupProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        {label}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer
                       transition-colors ${
                         value === option.value
                           ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                           : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                       } ${
                         error
                           ? 'border-red-500 dark:border-red-400'
                           : ''
                       }`}
          >
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-900 dark:text-white">{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
