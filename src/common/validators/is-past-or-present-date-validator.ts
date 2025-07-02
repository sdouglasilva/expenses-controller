import { 
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions
} from "class-validator";


@ValidatorConstraint({name: 'isPastOrPresentDate', async:false})
export class isPastOrPresentDateConstraint implements ValidatorConstraintInterface{
  validate(dateString:string, args: ValidationArguments){
    const receivedDate = new Date(dateString);
    const today = new Date();
    return receivedDate <= today;
  }
  defaultMessage(args:ValidationArguments){
    return "A data da despesa não pode ser uma data futura"
  }
}

export function isPastOrPresentDate(validationOptions?: ValidationOptions){
  return function (object: object, propetyName:string){
    registerDecorator({
      target: object.constructor,
      propertyName: propetyName,
      options: validationOptions,
      constraints: [],
      validator: isPastOrPresentDateConstraint,

    })
  }
  
}