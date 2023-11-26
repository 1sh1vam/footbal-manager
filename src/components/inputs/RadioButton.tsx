interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const RadioButton = ({ label, value, checked, onChange }: RadioButtonProps) => {
  const handleInputChange = () => {
    onChange(value);
  };

  return (
    <label className="flex items-center space-x-3 cursor-pointer text-sm text-content-2">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={handleInputChange}
        className={`appearance-none rounded-full w-4 h-4 cursor-pointer ${checked ? 'border-4 border-primary-orange' : 'border border-outline'}`}
      />
      <span>{label}</span>
    </label>
  );
};

export default RadioButton;
