import { KeyOf, ObjectOrType }   from '@itrocks/class-type'
import { decorate, decoratorOf } from '@itrocks/decorator/property'

export * from './max-length'
export * from './min-length'

const LENGTH = Symbol('length')

export function Length<T extends object>(length?: number)
{
	return decorate<T>(LENGTH, length)
}

export function lengthOf<T extends object>(target: ObjectOrType<T>, property: KeyOf<T>)
{
	return decoratorOf<number | undefined, T>(target, property, LENGTH)
}
