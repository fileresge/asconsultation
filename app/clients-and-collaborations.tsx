import Image from "next/image";

const clients = [
  "Shedein Enterprises",
  "LAAR",
  "Amafhh Paper & Board Works",
  "PFS",
  "Fabritex",
  "Bin Hashim",
  "Seyyam Shipping Line",
  "Imtiaz",
];

const collaborators = [
  "HBL",
  "Meezan Bank",
  "Faysal Bank",
  "Easypaisa",
  "JazzCash",
  "Raast",
  "ACCA",
  "Karachi Chamber of Commerce & Industry",
  "IRIS",
];

const cardClassName =
  "relative flex h-[98px] min-w-0 items-center justify-center rounded-[19px] border border-[#e6e6e6] bg-white px-4 py-3 shadow-[0_2px_7px_rgb(0_0_0/6%)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:z-10 hover:border-[#d0d0d0] hover:shadow-[0_12px_24px_rgb(0_0_0/12%)] motion-safe:hover:-translate-y-1.5 motion-safe:hover:scale-[1.04] motion-reduce:transition-none";

const panelClassName =
  "min-w-0 scroll-mt-8 rounded-[19px] border border-[#e5e5e5] bg-white px-4 pt-8 pb-9 shadow-[0_5px_28px_rgb(0_0_0/7%)] sm:px-9 sm:pt-10 sm:pb-[42px]";

const headingClassName =
  "mb-8 text-center text-[24px] leading-[1.3] font-extrabold tracking-[-0.8px] text-[#1c1c1c] sm:mb-9 sm:text-[28px]";

export default function ClientsAndCollaborations() {
  return (
    <div className="bg-white px-4 pt-3 pb-14 sm:px-[30px] sm:pb-20">
      <div className="mx-auto grid max-w-[1800px] items-stretch gap-6 lg:grid-cols-2 lg:gap-9">
        <section
          id="clients"
          aria-labelledby="clients-heading"
          className={panelClassName}
        >
          <h2 id="clients-heading" className={headingClassName}>
            Our Clients
          </h2>
          <ul className="grid grid-cols-2 gap-[18px] sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4" aria-label="Our clients">
            {clients.map((name, index) => (
              <li key={name} className={cardClassName}>
                <div className="relative h-full w-full">
                  <Image
                    src={`/clients/${index + 1}.png`}
                    alt={name}
                    fill
                    sizes="(max-width: 600px) 40vw, (max-width: 1140px) 22vw, (max-width: 1279px) 20vw, 10vw"
                    className="object-contain"
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="collaborations"
          aria-labelledby="collaborations-heading"
          className={panelClassName}
        >
          <h2 id="collaborations-heading" className={headingClassName}>
            Our Partners &amp; Collaborators
          </h2>
          <ul className="grid grid-cols-2 gap-[18px] sm:grid-cols-3" aria-label="Our collaborators">
            {collaborators.map((name, index) => (
              <li
                key={name}
                className={`${cardClassName} last:col-span-2 sm:last:col-span-1`}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={`/collabarate/${index + 1}.svg`}
                    alt={name}
                    fill
                    sizes="(max-width: 600px) 40vw, (max-width: 1140px) 28vw, 14vw"
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
