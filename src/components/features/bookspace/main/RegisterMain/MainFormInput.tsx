import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';

interface MainFormInputProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export default function MainFormInput({
  form,
  name,
  label,
  placeholder,
  required = false,
}: MainFormInputProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <FormField
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm text-gray-500">
              {label} {required && <span className="text-red-600">*</span>}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder={placeholder}
                className="bg-transparent border-none shadow-none text-base pt-1 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
              />
            </FormControl>
            <FormMessage className="text-red-600 text-xs mt-1" />
          </FormItem>
        )}
      />
    </div>
  );
}
