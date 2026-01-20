export default function Gallery() {
  return (
    <div className="text-center px-2">
      <div className="py-10 md:w-150 m-auto">
        <h2 className="text-4xl md:text-5xl font-semibold pb-5 text-black leading-snug">
          Life isn't perfect, but your outfit can be
        </h2>
        <p className="text-xl md:text-2xl text-gray-500">
          "Find your perfect match in our collection."
        </p>
      </div>
      <div className="py-10 md:w-150 m-auto">
        <h2 className="text-4xl md:text-5xl font-semibold pb-5 text-black leading-snug">
          Wear your dreams, own your story
        </h2>
        <p className="text-xl md:text-2xl text-gray-500">
          "Every outfit is a step toward your best self."
        </p>
      </div>
      <div className="container m-auto grid md:grid-cols-4 md:grid-rows-2 gap-6 py-10 md:h-200">
        <div className="col-span-2 row-span-2 items-center overflow-hidden rounded-3xl">
          <img
            src="/images/hanging-pullover.jpg"
            alt=""
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="col-span-2 overflow-hidden rounded-3xl">
          <img
            src="/images/still-life-with-classic-shirts-hanger (1).jpg"
            alt=""
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="overflow-hidden rounded-3xl">
          <img
            src="/images/still-life-with-classic-shirts-hanger.jpg"
            alt=""
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="bg-[#dedfde] overflow-hidden rounded-3xl">
          <img
            src="/images/10556978.png"
            alt=""
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
