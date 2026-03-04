import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
    >
      {/* Logo Image */}
      <div className="w-8 h-8 md:w-10 md:h-10 relative">
        <Image
          src="/favicon.ico"
          alt="Cream & Co. Logo"
          width={40}
          height={40}
          className="w-full h-full"
          priority
        />
      </div>

      {/* Logo Text */}
      <div className="flex flex-col leading-tight">
        <p className="font-serif font-bold text-lg md:text-xl m-0">Cream</p>
        <p className="font-sans font-semibold text-xs md:text-sm -mt-1 m-0">
          & Co.
        </p>
      </div>
    </Link>
  );
}
