import { useEffect, useState } from 'react';

type Severity = 'success' | 'info' | 'warning' | 'error';
type Toast = {
  open: boolean;
  message: string;
  severity: Severity;
};

export function useToast() {
  const [toast, setToast] = useState<Toast>({
    open: false,
    message: '',
    severity: 'info',
  });

  useEffect(
    function autoCloseToastAfterDelay() {
      if (toast.open) {
        const timer = setTimeout(() => {
          closeToast();
        }, 3000);
        return () => clearTimeout(timer);
      }
    },
    [toast.open],
  );

  const showToast = (message: string, severity: Severity) => {
    setToast({
      open: true,
      message,
      severity,
    });
  };

  const closeToast = () => {
    setToast((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return {
    toast,
    showToast,
    closeToast,
  };
}
