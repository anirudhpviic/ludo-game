import {
  Injectable,
  Type,
  UnprocessableEntityException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class BaseValidator {
  async validateObject<T>(
    inputs: Record<string, any>,
    schemaMeta: Type<T>,
  ): Promise<T> {
    const schema: T = plainToClass(schemaMeta, inputs);
    const errors = await validate(schema as Record<string, any>, {
      stopAtFirstError: true,
    });
    if (errors.length) {
      const parsedError = this.parseError(errors);
      throw new UnprocessableEntityException(parsedError);
    }

    return schema;
  }

  private parseError(errors: Record<string, any>[]) {
    const parsedError: Record<string, any>[] = [];
    for (const error of errors) {
      const errorObj: Record<string, any> = {};
      errorObj.key = error.property;
      if (error.children.length) {
        const children = this.parseError(error.children);
        errorObj.children = children;
      }
      if (error.constraints && Object.keys(error.constraints).length) {
        Object.values(error.constraints).forEach((val) => {
          errorObj.message = val;
        });
      }
      parsedError.push(errorObj);
    }
    return parsedError;
  }
}
