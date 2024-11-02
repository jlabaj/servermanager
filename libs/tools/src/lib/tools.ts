import 'reflect-metadata';

export const nameKey = Symbol('name');

export function name(className: string): ClassDecorator {
  return Reflect.metadata(nameKey, className);
}

export function getClassName(type: any): string {
  return Reflect.getMetadata(nameKey, type) ?? type.constructor.name;
}
