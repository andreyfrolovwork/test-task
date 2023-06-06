import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isEnumEmailPhoneValidator', async: false })
export class isEnumEmailPhoneValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return ['email','phone'].includes(text)
    // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Это не enum  !';
  }
}
