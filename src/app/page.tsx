"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [country, setCountry] = useState<string | null>(null);
  const [option, setOption] = useState<string | null>(null);
  const router = useRouter();

  const handelSelect = (selected: string) => {
    setCountry(selected);

    if (selected === "india") {
      router.push("https://calendar.app.google/AFg6RWvmdp9F7umZ9");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (option === "online") {
      router.push("https://calendar.app.google/AFg6RWvmdp9F7umZ9");
    } else if (option === "offline") {
      router.push("https://example.com/luma-event");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-black bg-gradient-to-r from-violet-200 to-pink-200">
      <h1 className="text-3xl font-bold mb-6">Welcome to TalkingTOM</h1>

      {!country && (
        <div className="flex space-x-4">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => handelSelect("uae")}
          >
            Select UAE
          </button>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
            onClick={() => handelSelect("india")}
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
                onChange={() => setOption("online")}
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
                onChange={() => setOption("offline")}
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
    </div>
  );
}
