// types/global.d.ts
interface KkiapayConfig {
  amount: string;
  key: string;
  callback: string;
  sandbox: boolean;
  paymentmethod: string;
  theme: string;
  position: string;
  name?: string;
  email?: string;
  phone?: string;
  data?: string;
}

declare global {
  interface Window {
    kkiapay?: {
      open: (config: KkiapayConfig) => void;
      addSuccessListener: (callback: (response: any) => void) => void;
      addFailedListener: (callback: (error: any) => void) => void;
    };
    openKkiapayWidget?: (config: KkiapayConfig) => void;
    _kkiapayLoaded?: boolean;
  }
  
  // Pour le script global kkiapay
  const kkiapay: any;
}

export {};
