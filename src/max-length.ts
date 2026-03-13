import { ObjectOrType } from '@itrocks/class-type'
import { decorate }     from '@itrocks/decorator/property'
import { decoratorOf }  from '@itrocks/decorator/property'

const MAX_LENGTH = Symbol('maxLength')

export function MaxLength<T extends object>(length?: number)
{
	return decorate<T>(MAX_LENGTH, length)
}

export function maxLengthOf<T extends object>(target: ObjectOrType<T>, property: keyof T)
{
	return decoratorOf<number | undefined, T>(target, property, MAX_LENGTH, undefined)
}
