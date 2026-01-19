declare module 'kkiapay' {
  const kkiapay: {
    open: (config: any) => void;
    addSuccessListener: (callback: (response: any) => void) => void;
    addFailedListener: (callback: (error: any) => void) => void;
  };
  export default kkiapay;
}
