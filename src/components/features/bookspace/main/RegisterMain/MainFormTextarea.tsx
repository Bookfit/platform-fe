import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn, Path, FieldValues } from "react-hook-form";

interface MainFormTextareaProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  required?: boolean;
  minHeight?: string;
}

export default function MainFormTextarea<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  required = false,
  minHeight = "80px",
}: MainFormTextareaProps<TFieldValues>) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm text-gray-500">
              {label} {required && <span className="text-red-600">*</span>}
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={placeholder}
                className="bg-transparent border-none text-base pt-1 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                style={{ minHeight }}
              />
            </FormControl>
            <FormMessage className="text-red-600 text-xs mt-1" />
          </FormItem>
        )}
      />
    </div>
  );
}
