import React from "react";
import Logo from "../components/Headers/Logo";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Meta from "../components/Meta";
import { toast } from "react-hot-toast";

const signInMethods = [
  {
    icons: BsGithub,
    content: "Sign in with Github",
    provider: "github",
  },
  {
    icons: FcGoogle,
    content: "Sign in with Google",
    provider: "google",
  },
];

const SignIn = () => {
  return (
    <div className="h-screen">
      <Meta
        title="Next Anime - Sign In"
        image="https://res.cloudinary.com/annnn/image/upload/v1683898263/logo_id1pyr.png"
        description="Next Anime is a free anime watch website built using Consumet API"
      />
      <div className="p-4 flex items-center justify-between">
        <Logo />
        <h4 className="flex items-center space-x-2">
          <AiOutlineInfoCircle />
          <span className="font-semibold hover:underline">Feed and help</span>
        </h4>
      </div>

      <div>
        <div className="mx-auto w-[375px] max-w-[calc(100%-32px)] text-center">
          <h4 className="my-4 text-[32px] font-bold text-primary">
            Log in to Next Anime
          </h4>
          <p className="mt-3 mb-[32px] text-[15px] font-normal text-[rgba(255,255,255,0.75)]">
            Manage your account, check notifications, comment on anime, and
            more.
          </p>

          <div>
            {signInMethods.map((item) => (
              <button
                onClick={() => signIn(item.provider)}
                key={item.provider}
                className="relative mb-4 flex w-full items-center justify-center border border-gray-600 px-4 py-2.5 last:mb-0"
              >
                <div className="absolute left-4 top-[50%] translate-y-[-50%]">
                  <item.icons size={25} />
                </div>{" "}
                <span className="text-[15px]">{item.content}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const redirect = (context.query?.redirect as string) || "/";

  if (session?.user) {
    return {
      redirect: {
        permanent: true,
        destination: redirect,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

export default SignIn;
