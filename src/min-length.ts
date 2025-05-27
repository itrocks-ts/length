import { KeyOf, ObjectOrType }   from '@itrocks/class-type'
import { decorate, decoratorOf } from '@itrocks/decorator/property'

const MIN_LENGTH = Symbol('minLength')

export function MinLength<T extends object>(length: number = 0)
{
	return decorate<T>(MIN_LENGTH, length)
}

export function minLengthOf<T extends object>(target: ObjectOrType<T>, property: KeyOf<T>)
{
	return decoratorOf(target, property, MIN_LENGTH, 0)
}
