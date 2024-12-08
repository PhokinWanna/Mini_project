import Link from "next/link";

export default function Home() {
  return (<>
    {/* <div className="bg-gray-400">
      <h1 className="text-center text-black-300 text-2xl ">Wellcome To Me Project</h1> 
    </div> */}
    <a href="/api/auth/session" className="group relative block">
  <div className="relative h-[350px] sm:h-[450px]">
    <img
      src="https://i.ytimg.com/vi/E-Voff821tE/maxresdefault.jpg"
      alt=""
      className="absolute inset-0 h-full w-full object-fill opacity-100 group-hover:opacity-0 blur-[2px]"
    />

    <img
      src="https://www.codespeedy.com/wp-content/uploads/2018/12/number-guessing-game-in-python-1024x778.jpg"
      alt=""
      className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 blur-[2px]"
    />
  </div>

  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
    <h3 className="text-7xl font-bold text-white drop-shadow-md group-hover:text-black">Guess Number</h3>

    <p className="mt-1.5 text-pretty text-xl text-gray-300 group-hover:text-gray-700">
      from 1 to 100 number, and we will see how smart you are!
    </p>

    <span
      className="mt-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white hover:bg-white hover:text-black rounded"
    >
      Play Now
    </span>
  </div>
</a>
  </>)
}