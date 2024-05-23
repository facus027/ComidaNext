import Image from "next/image";

export default function Logo() {
  return (
    <div className=" flex justify-center mt-1">
      <div className="relative w-36 h-36">
        <Image fill alt="Logotipo Fresh coffee" src="/logo.svg" />
      </div>
    </div>
  );
}
