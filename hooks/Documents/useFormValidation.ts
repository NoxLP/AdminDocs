import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { PickerItemProps } from '../../components/Picker/PickerProps';
import useYupValidationResolver from '../useYupValidationResolver';

export type FormFields = {
  name: string;
  comments: string;
  category: string;
};

export default function useFormValidation() {
  // Errors messages must be set before schema
  Yup.setLocale({
    mixed: {
      oneOf: 'Elija una categoría',
      required: 'Campo obligatorio',
    },
    string: {
      max: 'Máximo ${max} caracteres',
      required: 'Campo obligatorio',
    },
  });
  // Validation
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    comments: Yup.string(),
    category: Yup.mixed<PickerItemProps>().required(),
  });
  // Validation resolver
  const yupResolver = useYupValidationResolver(validationSchema);

  const { register, handleSubmit, formState, setValue, reset, control } =
    useForm<FormFields>({
      resolver: yupResolver,
    });

  return {
    register,
    handleSubmit,
    formState,
    setValue,
    reset,
    control,
  };
}
