import { providers } from "@/src/utils/contants";
import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface ShareSocialProps {
  link: string;
  title: string;
}

const ShareSocial: React.FC<ShareSocialProps> = ({ link, title }) => {
  return (
    <div className="flex items-center">
      {providers?.map((provider) => (
        <Link
          key={provider.name}
          target="_blank"
          href={provider?.link(link, title)}
          className="mr-2 h-7 w-7 cursor-pointer last:mr-0"
        >
          <LazyLoadImage
            width={28}
            height={28}
            effect="blur"
            className="rounded-full"
            src={provider?.icon}
          />
        </Link>
      ))}
    </div>
  );
};

export default ShareSocial;
