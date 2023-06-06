import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'dateValidator', async: false })
export class DateValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {

    return true // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Это не дата!';
  }
}

