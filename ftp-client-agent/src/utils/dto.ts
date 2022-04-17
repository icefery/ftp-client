export class R<T> {
  private constructor(public readonly code: number, public readonly message: string, public readonly data: T) {}

  public static success<T>(data: T): R<T> {
    return new R<T>(0, 'success', data)
  }

  public static failure<T>(message: string): R<T> {
    return new R<T>(-1, message, null)
  }
}