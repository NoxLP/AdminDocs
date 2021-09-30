import {
  ValidationRule,
  FieldError,
  UseFormSetValue,
  UseFormRegister,
} from "react-hook-form";

export interface ErrorMap {
  [key: string]: FieldError | undefined;
}

export interface FormProps {
  children: JSX.Element | JSX.Element[];
  register: UseFormRegister<Document>;
  errors: ErrorMap;
  setValue: UseFormSetValue<Document>;
}

// register: ({ name }: { name: string }, validation: ValidationRule) => void;
// setValue: (name: string, value: string, validate?: boolean) => void;
