"use client";

import Image from "next/image";
import liff from "@line/liff";
import { useEffect, useState } from "react";
import { getBasePath } from "../utils/basePath";
import { fetchOilPrices } from "../utils/api";

export default function Home() {
  const basePath = getBasePath();
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [oilPrices, setOilPrices] = useState([]);

  const handleFetchData = async () => {
    setLoading(true);
    const responseAPI = await fetchOilPrices();
    setOilPrices(responseAPI.data);
    setLoading(false);
  };

  useEffect(() => {
    const initLiff = async () => {
      try {
        if (process.env.NODE_ENV === "production") {
          await liff.init({ liffId: "2006968919-ArYdqmNG" });
          if (liff.isLoggedIn()) {
            const profile = await liff.getProfile();
            setUserProfile(profile);
          } else {
            liff.login();
          }
        } else {
          setUserProfile({
            displayName: "Guest",
            pictureUrl: `${basePath}/globe.svg`,
            statusMessage: "Hello, World!",
          });
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (typeof window !== "undefined") {
      initLiff();
    }
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src={`${basePath}/next.svg`}
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.js
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <h1 className="text-2xl font-bold">Welcome to LINE LIFF</h1>

          {error && <p className="text-red-500">{error}</p>}

          {userProfile ? (
            <div className="mt-4 flex flex-col items-center">
              <Image
                src={userProfile.pictureUrl}
                alt={userProfile.displayName}
                width={100}
                height={100}
                className="rounded-full"
              />
              <p className="mt-2 text-lg">{userProfile.displayName}</p>
              <p className="text-sm text-gray-500">{userProfile.statusMessage}</p>
            </div>
          ) : (
            <p>Loading user profile...</p>
          )}
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src={`${basePath}/vercel.svg`}
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleFetchData();
            }}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            <Image
              className="dark:invert"
              src={`${basePath}/graph-new-svgrepo-com.svg`}
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            {loading ? "กำลังโหลด..." : "เรียก API"}
          </a>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {/* แสดงตารางเมื่อมีข้อมูล */}
          {oilPrices.length > 0 && (
            <table className="min-w-full table-auto mt-8 border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border px-4 py-2">วันที่</th>
                  <th className="border px-4 py-2">ประเภทน้ำมัน</th>
                  <th className="border px-4 py-2">ราคา</th>
                </tr>
              </thead>
              <tbody>
                {oilPrices.map((item) =>
                  item.priceData.map((price, index) => (
                    <tr key={`${item.priceDate}-${index}`}>
                      {/* แสดงวันที่แค่แถวแรกของแต่ละกลุ่ม */}
                      {index === 0 && (
                        <td rowSpan={item.priceData.length} className="border px-4 py-2">
                          {new Date(item.priceDate).toLocaleDateString()}
                        </td>
                      )}
                      <td className="border px-4 py-2">{price.OilTypeId}</td>
                      <td className="border px-4 py-2">{price.Price}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src={`${basePath}/file.svg`}
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src={`${basePath}/window.svg`}
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src={`${basePath}/globe.svg`}
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
