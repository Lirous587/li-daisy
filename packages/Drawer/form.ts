export interface FormExpose {
  isValidate: () => boolean
  validateField: (fieldName: string) => Promise<void>
  // submit?: Function;
  // errors?: Record<string, string>;
}
