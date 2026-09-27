import Image from "next/image";
import headerLogo from "../public/header-logo.png";

export default function BrandLogo({ className = "w-[160px]", priority = false }: { className?: string; priority?: boolean }) {
  return <Image src={headerLogo} alt="asconsultations" className={`h-auto ${className}`} sizes="(max-width: 600px) 145px, 210px" priority={priority} />;
}
