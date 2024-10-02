// telegram-web-app.d.ts
declare global {
  interface TelegramWebApp {
    ready: () => void;
    openWallet: () => void; // Method to open the Telegram wallet
    onEvent: (event: string, callback: (data: any) => void) => void;
    initDataUnsafe?: { user?: any }; // Adjust based on your needs
  }

  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export {};
