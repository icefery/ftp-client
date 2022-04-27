export default class R<T> {
  private constructor(public readonly code: number, public readonly message: string, public readonly data: T) {}

  public static success<T = void>(data: T = null): R<T> {
    return new R<T>(0, 'success', data)
  }

  public static failure(message: string = 'failure', code: number = -1): R<void> {
    return new R<void>(code, message, null)
  }
}
