export function apiErrorMessage(error: unknown, fallback: string) {
  const message = (error as { response?: { data?: { message?: string } } })?.response?.data
    ?.message;
  return message || fallback;
}
