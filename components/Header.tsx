import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between pb-4 border-b mb-4 py-4 fixed w-full bg-white z-50 top-0 left-0 right-0 px-28">
      <div>
        <Link href={"/"}>
          <h1 className="text-dark text-4xl font-bold tracking-tighter">Tech News</h1>
        </Link>
        {/* <p className="text-sm">
          Exploring Tomorrow's Innovations,
          <br /> One Byte at a Time
        </p> */}
      </div>
      <div className="flex items-center">
        <Link href={"/sign-in"} className="btn">
          Entrar
        </Link>
      </div>
    </header>
  );
}
