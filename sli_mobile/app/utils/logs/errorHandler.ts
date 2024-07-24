import { postLogs } from "../functions/logs_function";

const globalErrorHandler = (error: any, isFatal?: boolean) => {
  postLogs(error.toString()).catch((err) => {
    console.error('Failed to send log:', err);
  });

  if (isFatal) {
    console.error('Fatal error:', error);
  } else {
    console.warn('Non-fatal error:', error);
  }
};

export default globalErrorHandler;
