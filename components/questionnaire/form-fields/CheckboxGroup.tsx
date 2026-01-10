'use client';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  options: CheckboxOption[];
  error?: string;
}

export function CheckboxGroup({
  label,
  values,
  onChange,
  options,
  error,
}: CheckboxGroupProps) {
  const handleToggle = (optionValue: string) => {
    if (values.includes(optionValue)) {
      onChange(values.filter((v) => v !== optionValue));
    } else {
      onChange([...values, optionValue]);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        {label}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={values.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              className="text-blue-600 focus:ring-blue-500 rounded"
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
