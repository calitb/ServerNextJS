import { Metadata } from "next";

export const metadata: Metadata = {
  title: "calitb.dev",
  description: "Personal Site",
};

export default function Page() {
  return (
    <main className="home-container relative h-full text-2xl text-[#80ff80cc;] ">
      <div className="overlay absolute h-full w-full"></div>
      <div className="flex-1 p-16 uppercase">
        <h1 className="my-8 text-5xl font-bold">calitb.dev</h1>
        <p className="text-terminal-green terminal-shadow opacity-80">
          &gt; This page is under construction
        </p>
      </div>
    </main>
  );
}
