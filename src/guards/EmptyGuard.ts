import { Guarder } from '../Guarder'
import { Guard } from '../types/Guard'
import { Instantiable } from '../types/Instantiable'
import { ArgumentError } from '../errors/ArgumentError'

/**
 * Empty Guard ensures that the property is not null or undefined. A string should contain at least one character, an
 * array should contain at least one item, an object should contain at least one key
 */
class EmptyGuard implements Guard {
  /**
   * @inheritDoc
   */
  public guard<T = unknown>(property: T, errorMessage?: string, error?: Instantiable<Error>): T {
    const message = errorMessage ?? 'Property not allowed to be empty'

    Guarder.null(property, message, error)
    Guarder.undefined(property, message, error)

    const isEmptyString = typeof property === 'string' ? property === '' : false
    const isArrayEmpty = Array.isArray(property) ? property.length === 0 : false
    const isObjectEmpty = typeof property === 'object' ? Object.keys(property)
      .length === 0 : false

    if (isEmptyString || isArrayEmpty || isObjectEmpty) {
      if (error) throw new error(message)
      throw new ArgumentError(message)
    }

    return property
  }
}

export { EmptyGuard }
