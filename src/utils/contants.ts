import { Title } from "../types/utils";

export const providers = [
  {
    icon: "/share-icon/facebook.svg",
    link: (url: string, title: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}&t=${title}`,
    name: "Facebook",
  },
  {
    icon: "/share-icon/twitter.svg",
    link: (url: string, title: string) =>
      `http://twitter.com/share?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
    name: "Twitter",
  },
  {
    icon: "/share-icon/reddit.svg",
    link: (url: string, title: string) =>
      `http://www.reddit.com/submit?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
    name: "Reddit",
  },
  {
    icon: "/share-icon/email.svg",
    link: (url: string, title: string) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${url}`,
    name: "Email",
  },
];

export const convertQueryArrayParams = (queries: string[]) => {
  return `[${queries?.map((item) => `"${item}"`) || []}]`;
};

export const setBackgroundImage = (imageUrl: string) => {
  return {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
};

export const getAnimeTitle = (title: Title) => {
  return typeof title !== "string" ? (title.english || title.native || title.romaji || title.userPreferred) : title;
};

export const formatVideoTime = (seconds: number) => {
  try {
    const date = new Date(0);
    date.setSeconds(seconds);
    const time = date.toISOString().slice(11, 19);
    const result = time.startsWith("00:0")
      ? time.slice(4)
      : time.startsWith("00")
        ? time.slice(3)
        : time.length === 8 && time.startsWith("0")
          ? time.slice(1)
          : time;
    return result;
  } catch (error) {
    return "0:00";
  }
};

export const getStreamAnimeWithProxy = (url: string) => {
  return `${process.env.NEXT_PUBLIC_PROXY_CORS_URL}${encodeURI(url)}`;
};

export const BASE_URL = process.env.NEXT_PUBLIC_NEXT_ANIME_URL;

export const calculateCreatedTime = (timeCreated: any) => {
  const periods: any = {
    year: 365 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };

  const diff = Date.now() - +new Date(`${timeCreated}`);

  for (const key in periods) {
    if (diff >= Number(periods[key])) {
      const result = Math.floor(diff / Number(periods[key]));
      return `${result} ${result === 1 ? key : key + "s"} ago`;
    }
  }

  return "Just now";
};

export const playSpeedOptions = [
  {
    label: "0.25x",
    value: 0.25,
  },
  {
    label: "0.5x",
    value: 0.5,
  },
  {
    label: "0.75x",
    value: 0.75,
  },
  {
    label: "1x",
    value: 1,
  },
  {
    label: "1.25x",
    value: 1.25,
  },
  {
    label: "1.5x",
    value: 1.5,
  },
  {
    label: "2x",
    value: 2,
  },
];
