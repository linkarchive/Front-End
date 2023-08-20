import { InputHTMLAttributes, LabelHTMLAttributes } from 'react';

export interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    LabelHTMLAttributes<HTMLLabelElement> {
  isRequired?: boolean;
  message?: string;
}
