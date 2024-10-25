"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  streak: number | null;
  xp: number | null;
};

export default function Main({ streak, xp }: Props) {
  const [email, setEmail] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("email")) {
      setEmail(localStorage.getItem("email"));
    }
  }, [email]);

  const handleSelect = (selected: string) => {
    setLoading(true);
    setCountry(selected);

    if (selected === "india") {
      router.push("https://calendar.app.google/AFg6RWvmdp9F7umZ9");
    } else {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (type === "online") {
      router.push("https://calendar.app.google/AFg6RWvmdp9F7umZ9");
    } else if (type === "offline") {
      router.push("https://");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black relative">
      <div className="pb-32 text-6xl font-bold">XP&nbsp;${xp}</div>
      {loading && (
        <div className="flex min-h-screen w-screen items-center justify-center ">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}

      {!loading && (
        <>
          <h1 className="text-3xl font-bold mb-6">Welcome to TalkingTOM</h1>

          {!country && (
            <div className="flex space-x-4">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={() => handleSelect("uae")}
              >
                Select UAE
              </button>
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                onClick={() => handleSelect("india")}
              >
                Select India
              </button>
            </div>
          )}

          {country === "uae" && (
            <form
              className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mt-6"
              onSubmit={handleSubmit}
            >
              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">
                  How do you want to talk to TOM?
                </label>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="online"
                    name="interaction"
                    value="online"
                    className="mr-2"
                    onChange={() => setType("online")}
                    required
                  />
                  <label htmlFor="online">Online</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="offline"
                    name="interaction"
                    value="offline"
                    className="mr-2"
                    onChange={() => setType("offline")}
                    required
                  />
                  <label htmlFor="offline">Offline</label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Submit
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
