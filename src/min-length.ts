import { ObjectOrType } from '@itrocks/class-type'
import { decorate }     from '@itrocks/decorator/property'
import { decoratorOf }  from '@itrocks/decorator/property'

const MIN_LENGTH = Symbol('minLength')

export function MinLength<T extends object>(length: number = 0)
{
	return decorate<T>(MIN_LENGTH, length)
}

export function minLengthOf<T extends object>(target: ObjectOrType<T>, property: keyof T)
{
	return decoratorOf(target, property, MIN_LENGTH, 0)
}
