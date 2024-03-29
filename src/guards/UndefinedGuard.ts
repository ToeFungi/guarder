import { Guard } from '../types/Guard'
import { Instantiable } from '../types/Instantiable'
import { ArgumentError } from '../errors/ArgumentError'

/**
 * Undefined Guard ensures that the property is not undefined
 */
class UndefinedGuard implements Guard {
  /**
   * @inheritDoc
   */
  public guard<T = unknown>(property: T, errorMessage?: string, error?: Instantiable<Error>): T {
    const message = errorMessage ?? 'Property not allowed to be undefined'

    if (property === undefined) {
      if (error) throw new error(message)
      throw new ArgumentError(message)
    }

    return property
  }
}

export { UndefinedGuard }
