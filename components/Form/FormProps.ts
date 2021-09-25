import { ValidationRule, FieldError } from "react-hook-form";

export interface ValidationMap {
  [key: string]: ValidationRule;
}

export interface ErrorMap {
  [key: string]: FieldError | undefined;
}

export interface FormProps {
  children: JSX.Element | JSX.Element[];
  register: ({ name }: { name: string }, validation: ValidationRule) => void;
  errors: ErrorMap;
  validation: ValidationMap;
  setValue: (name: string, value: string, validate?: boolean) => void;
}
