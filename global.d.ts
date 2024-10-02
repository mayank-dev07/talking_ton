// global.d.ts
interface TelegramWebApp {
  ready: () => void;
  initDataUnsafe: {
    user: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      photo_url?: string;
      language_code?: string;
    };
  };
  sendData: (data: string) => void;
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp;
  };
}
