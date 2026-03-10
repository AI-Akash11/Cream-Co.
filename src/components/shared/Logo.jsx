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
          src="/logoImage.png"
          alt="Cream & Co. Logo"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 32px, 40px"
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
