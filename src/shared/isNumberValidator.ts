import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isNumberValidator', async: false })
export class isNumberValidator implements ValidatorConstraintInterface {
  validate(text: string | number, args: ValidationArguments) {
    return !isNaN(Number(text))
    // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Это не число  !';
  }
}
