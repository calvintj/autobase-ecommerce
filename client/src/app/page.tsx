import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        <Image 
          className="w-full h-full object-cover"
          src="/R35.jpg" 
          alt="Nissan GT-R R35" 
          width={100} 
          height={100}
          priority
        />
      </main>
    </div>
  );
}
