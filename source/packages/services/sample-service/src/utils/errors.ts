export interface ErrorWithResponse extends Error {
  response?: {
    status: number;
    text: string;
    body: any;
  };
}

export function handleError(e: ErrorWithResponse): string {
  return `handleError: ${JSON.stringify(e)}`;
}
