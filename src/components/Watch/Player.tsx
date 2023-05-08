import ReactHlsPlayer from "react-hls-player";
import React, { useRef, useState, useEffect } from "react";
import { BsFillSkipEndFill, BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiVolumeUp } from "react-icons/hi";
import { AiFillSetting } from "react-icons/ai";
import { CgMiniPlayer } from "react-icons/cg";
import { BiFullscreen } from "react-icons/bi";
import { formatVideoTime } from "@/src/utils/contants";
import { FaVolumeMute } from "react-icons/fa";
import { Spin } from "react-cssfx-loading";

interface Source {
  url: string;
  label: string;
}

interface PlayerProps {
  source: string | Source[];
  className: string;
  poster: string;
  color: string;
}

const Player: React.FC<PlayerProps> = ({
  className,
  source,
  poster,
  color,
}) => {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const seekRef = useRef<HTMLDivElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  const [currentSource, setCurrentSource] = useState(
    typeof source === "string" ? source : source?.[0]?.url
  );
  const [showControl, setShowControl] = useState(true);
  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePlayPause = () => {
    const player = playerRef.current;
    if (!player) return;

    if (play) {
      setPlay(false);
      player?.pause();
    } else {
      setPlay(true);
      player?.play();
    }
  };

  const handleFullScreen = () => {
    if (!videoContainerRef?.current) return;

    setFullScreen(!fullScreen);

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoContainerRef?.current?.requestFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    const player = playerRef.current;
    if (!player) return;

    setCurrentTime(player?.currentTime);
  };

  const handleSeekTime = (e: any) => {
    const clientX = e?.clientX || (e?.touches[0]?.clientX as number);
    const left = seekRef.current?.getBoundingClientRect().left as number;
    const width = seekRef.current?.getBoundingClientRect().width as number;
    const percent = (clientX - left) / width;

    document.body.style.userSelect = "none";

    if (clientX <= left) {
      if (playerRef !== null && playerRef?.current !== null) {
        playerRef.current.currentTime = 0;
      }
      setCurrentTime(0);
      return;
    }

    if (clientX >= width + left) {
      if (playerRef !== null && playerRef?.current !== null) {
        playerRef.current.currentTime = playerRef?.current?.duration;
        setCurrentTime(playerRef?.current?.duration);
      }
      return;
    }

    if (playerRef !== null && playerRef?.current !== null) {
      playerRef.current.currentTime = percent * playerRef.current?.duration;
    }

    if (playerRef !== null && playerRef?.current !== null) {
      setCurrentTime(percent * playerRef?.current?.duration);
    }
  };

  const handleToggleMuted = () => {
    if (muted) {
      setMuted(false);
      if (playerRef !== null && playerRef?.current !== null) {
        playerRef.current.muted = false;
      }
    } else {
      setMuted(true);
      if (playerRef !== null && playerRef?.current !== null) {
        playerRef.current.muted = true;
      }
    }
  };

  const handleVideoPicture = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      playerRef?.current?.requestPictureInPicture();
    }
  };

  useEffect(() => {
    let timeout: any;

    if (!play || !showControl) {
      return;
    }

    console.log("set time out");

    timeout = setTimeout(() => {
      setShowControl(false);
    }, 3000);

    return () => {
      console.log("clear time out");
      timeout && clearTimeout(timeout);
    };
  }, [showControl, play]);

  return (
    <div
      ref={videoContainerRef}
      onMouseOver={() => setShowControl(true)}
      onMouseLeave={() => setShowControl(false)}
      onClick={() => setShowControl(!showControl)}
      className="w-full h-full relative"
    >
      <ReactHlsPlayer
        src={currentSource}
        playerRef={playerRef}
        className={`${className}`}
        poster={poster}
        onPlay={() => setPlay(true)}
        onPause={() => setPlay(false)}
        onTimeUpdate={handleTimeUpdate}
        onCanPlay={() => setLoading(false)}
        onWaiting={() => setLoading(true)}
        onLoad={() => setLoading(true)}
      />

      {showControl && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 opacity-animation py-2 transition-colors bg-[rgba(0,0,0,0.5)] flex items-end"
        >
          <div className="w-full px-2">
            {/* Seek time */}
            <div
              ref={seekRef}
              onClick={handleSeekTime}
              className="py-2 w-full relative cursor-pointer"
            >
              <div
                style={{
                  left: `calc(${
                    (currentTime * 100) /
                    (playerRef?.current?.duration as number)
                  }% - 10px)`,
                  backgroundColor: color,
                }}
                className="absolute w-[10px] h-[10px] top-[50%] translate-y-[-50%] rounded-full"
              />
              <div className="w-full h-[3px] bg-gray-400 relative">
                <div
                  style={{
                    width: `${
                      (currentTime * 100) /
                      (playerRef?.current?.duration as number)
                    }%`,
                    backgroundColor: color,
                  }}
                  className="absolute top-0 bottom-0 bg-red-500"
                />
              </div>
            </div>
            {/* Main control */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {!loading ? (
                  <div onClick={handlePlayPause} className="cursor-pointer">
                    {play ? (
                      <BsPauseFill size={30} />
                    ) : (
                      <BsPlayFill size={30} />
                    )}
                  </div>
                ) : (
                  <Spin width={20} height={20} />
                )}
                <BsFillSkipEndFill className="cursor-pointer" size={30} />
                <div onClick={handleToggleMuted} className="cursor-pointer">
                  {muted ? (
                    <FaVolumeMute size={25} />
                  ) : (
                    <HiVolumeUp size={25} />
                  )}
                </div>
                <div className="text-sm font-semibold">
                  {formatVideoTime(currentTime)}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <AiFillSetting className="cursor-pointer" size={25} />
                <CgMiniPlayer
                  onClick={handleVideoPicture}
                  className="cursor-pointer"
                  size={25}
                />
                <BiFullscreen
                  onClick={handleFullScreen}
                  className="cursor-pointer"
                  size={25}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
