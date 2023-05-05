import React from "react";
import Logo from "./Headers/Logo";
import ShareSocial from "./ShareSocial";

const Footer = () => {
  return (
    <div
      style={{
        backgroundImage: `url(./footer.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="px-4 py-10 footer relative mt-10"
    >
      <div className="items-center z-[999] border-b border-gray-600 inline-flex pb-5">
        <Logo />
        <div className="h-[40px] mx-10 w-[1px] bg-gray-600" />
        <ShareSocial link="abc" title="Next Anime" />
      </div>
      <div className="flex items-center mt-5">
        <p className="font-semibold">A-Z</p>
        <div className="h-[20px] mx-5 w-[1px] bg-gray-600" />
        <p className="text-xs font-normal flex-1">
          Searching anime order by alphabet name A to Z.
        </p>
      </div>
      <div className="mt-5 grid md:grid-cols-4 grid-cols-1 md:space-y-0 space-y-4">
        <p className="text-xs font-normal hover:text-[#CAE962]">
          Terms of service
        </p>
        <p className="text-xs font-normal hover:text-[#CAE962]">DMCA</p>
        <p className="text-xs font-normal hover:text-[#CAE962]">Contact</p>
        <p className="text-xs font-normal hover:text-[#CAE962]">
          Zoro Proxy Sites
        </p>
      </div>
      <div className="mt-5 text-xs text-gray-500">
        Next Anime does not store any files on our server, we only linked to the
        media which is hosted on 3rd party services.4
        <br />
        ©next-anime.vercel.app
      </div>
    </div>
  );
};

export default Footer;
