"use client";
import { Compass, Home, Play, Settings, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { watchStore } from "@/store/watch";
import Button, { type ButtonProps } from "../ui/button";
import Spacer from "../ui/spacer";

export default function Navbar() {
  const { watched } = watchStore();

  return (
    <nav className="bg-background-primary flex h-[calc(100vh-2rem)] w-[314px] flex-col items-center justify-between rounded-2xl px-2 py-4 text-center">
      <div className="flex w-full flex-col items-center gap-4">
        <h1 className="mx-12 font-mono text-2xl font-bold">
          Watch <span className="text-accent">IO</span>
        </h1>
        <div className="flex w-full flex-col">
          <NavbarButton href="/" Prefix={<Home />}>
            Home
          </NavbarButton>
          {/* <NavbarButton href="/videos" Prefix={<Play />}>
          Videos
        </NavbarButton> */}
          <NavbarButton href="/explore" Prefix={<Compass />}>
            Explore
          </NavbarButton>
          <Spacer className="my-4" />
          <NavbarButton href="/settings" Prefix={<User2 />}>
            Profile
          </NavbarButton>
          <NavbarButton href="/profile/settings" Prefix={<Settings />}>
            Settings
          </NavbarButton>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-2 px-2">
        {watched.length > 0 && (
          <>
            <small>Continue Watching</small>
            {watched.slice(0, 3).map((series) => (
              <div className="flex w-full items-center gap-2" key={series.name}>
                <Image
                  className="rounded-md"
                  unoptimized
                  width={64}
                  height={64}
                  src={series.img}
                  alt={series.name}
                />

                <div className="flex flex-col justify-center text-start">
                  <b>{series.name}</b>
                  <small className="text-zinc-500">
                    Episode {(series.ep.at(-1) || 0) + 1}
                  </small>
                </div>

                <Link
                  href={`/watch/${series.name}/${(series.ep.at(-1) || 0) + 1}`}
                  className="ml-auto"
                >
                  <Play className="fill-foreground text-foreground size-8 rounded-full bg-zinc-500/10 p-2" />
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </nav>
  );
}

interface NavbarButtonProps extends ButtonProps {
  href: string;
}

const NavbarButton = ({ href, children, ...props }: NavbarButtonProps) => {
  const path = usePathname();

  return (
    <Link href={href} className="w-full rounded-xl">
      <Button
        {...props}
        tabIndex={-1}
        variant="ghost"
        className={`w-full justify-start rounded-xl ${path === href && "text-accent"}`}
      >
        {children}
      </Button>
    </Link>
  );
};
