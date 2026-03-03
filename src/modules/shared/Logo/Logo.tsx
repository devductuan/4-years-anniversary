import Image from "next/image";
import Link from "next/link";

type Props = {
  src: string;
};

export const Logo = (props: Props) => {
  return (
    <Link href="/" className="cursor-pointer shrink-0">
      <Image
        src={props.src}
        alt="Logo"
        width={80}
        height={80}
        className="w-20 h-auto shrink-0"
      />
    </Link>
  );
};
