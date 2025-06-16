import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  formName: Path<T>;
  label?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;

  additionalText?: string | null;
  onChange?: (value: string) => void;
  validation?: RegisterOptions<T, Path<T>>;
  className?: string;
}

const FormInput = <T extends FieldValues>({
  formName,
  label,
  type = "text",
  placeholder,
  disabled,
  required,
  additionalText,
  onChange,

  className,
}: FormInputProps<T>) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<T>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(formName, value as PathValue<T, Path<T>>, {
      shouldValidate: true,
    });
    onChange?.(value);
  };

  const value = watch(formName);
  const error = errors[formName];
  const errorMessage = error?.message as string;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={formName}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={formName}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={handleChange}
        className={`
            input-base
            ${error ? "border-red-500" : "border-gray-300"}
            ${error ? "focus:border-red-500" : "focus:border-blue-500"}
            ${disabled ? "bg-gray-100" : "bg-white"}
            ${className ?? ""}
          `}
      />

      {(errorMessage || additionalText) && (
        <p
          className={`
            mt-1
            text-sm
            ${error ? "text-red-500" : "text-gray-500"}
          `}
        >
          {errorMessage || additionalText}
        </p>
      )}
    </div>
  );
};

export default FormInput;
