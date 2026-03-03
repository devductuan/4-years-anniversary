import Image from "next/image";

export const AnniversariesHero = () => {
  return (
    <section className="py-40">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center mb-20">
          Nhìn lại những kỷ niệm của chúng mình
        </h1>
        <div className="max-w-2xl text-center mb-20 text-zinc-500">
          <p>
            4 năm qua kể từ ngày anh lấy hết can đảm để nói &quot;Em làm người
            yêu anh nhớ&quot;, anh luôn thấy biết ơn vì em đã gật đầu và luôn
            khiến anh làm người đàn ông hạnh phúc nhất thế giới.
          </p>
          <p className="mt-4">Anh muốn cùng em đi qua thêm hàng trăm, hàng nghìn kỷ niệm cùng nhau nữa.</p>
        </div>
        <Image
          src="/images/anniversaries-hero.png"
          alt="Anniversaries"
          width={1000}
          height={1000}
        />
      </div>
    </section>
  );
};
