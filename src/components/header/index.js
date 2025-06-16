import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-[var(--primary)] rounded-lg flex justify-center items-center py-5 textL text-center px-3">
      <p>
        Test Task by{" "}
        <Link
          href="https://github.com/diamondniam"
          className="font-bold relative"
        >
          Diamond Niam
          <Image
            src="/logo.png"
            alt="logo"
            width={110}
            height={110}
            className="absolute -top-1/2 right-1/2 -translate-y-6 translate-x-1/2 max-md:hidden dark:invert-0 invert"
          />
        </Link>
      </p>
    </div>
  );
}
