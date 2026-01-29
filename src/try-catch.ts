type TryCatchResult<T, E> =
  | { success: true; data: T }
  | { success: false; error: E };

export async function tryCatch<T, E = unknown>(
  promise: Promise<T>,
): Promise<TryCatchResult<T, E>> {
  try {
    const data = await promise;
    return { data, success: true };
  } catch (error) {
    return { error: error as E, success: false };
  }
}
