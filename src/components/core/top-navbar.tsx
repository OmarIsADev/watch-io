"use client";

import { ChevronDown, Search, User2 } from "lucide-react";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "../ui/dropdown";
import UserStore from "@/store/user";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "../ui/button";
import Input from "../ui/input";

export default function TopNavbar() {
  const router = useRouter();

  const { user, logout } = UserStore();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = e.currentTarget.search.value;

    if (!search) {
      return;
    }

    router.push(`/search?q=${search}`);
  };

  return (
    <div className="flex w-full gap-4">
      <Dropdown>
        <DropdownTrigger className="h-full">
          <Button
            className="bg-background-primary h-full rounded-full px-6 py-2 text-sm"
            Suffix={<ChevronDown className="size-4" />}
          >
            All
          </Button>
        </DropdownTrigger>
        <DropdownContent className="bg-background-primary rounded-2xl *:rounded-2xl">
          <DropdownItem onClick={() => router.push("/")}>All</DropdownItem>
          <DropdownItem onClick={() => router.push("/Anime")}>
            Anime
          </DropdownItem>
          <DropdownItem onClick={() => router.push("/Movies")}>
            Movies
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
      <form className="flex flex-grow" onSubmit={handleSearch}>
        <Input
          Suffix={
            <button type="submit" className="rounded-full outline-offset-[6px]">
              <Search className="size-4 cursor-pointer" />
            </button>
          }
          name="search"
          className="outline-none"
          classNames={{
            wrapper:
              "h-10 !rounded-full bg-background-primary flex-grow rounded-2xl",
          }}
          placeholder="Search"
        />
      </form>

      {user ? (
        <Dropdown>
          <DropdownTrigger>
            <div
              tabIndex={0}
              onClick={() => alert("suka")}
              onKeyDown={(e) => ["Enter", " "].includes(e.key) && alert("suka")}
              className="bg-background-primary flex h-10 cursor-pointer items-center gap-2 rounded-full"
            >
              {user.img ? (
                <Image
                  className="rounded-full"
                  unoptimized
                  src={user.img}
                  width={40}
                  height={40}
                  alt="user"
                />
              ) : (
                <User2 className="text-background-primary bg-foreground size-10 rounded-full p-2" />
              )}

              <div className="flex gap-2 pr-4">
                {user.firstName}
                <ChevronDown />
              </div>
            </div>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem onClick={logout}>Logout</DropdownItem>
          </DropdownContent>
        </Dropdown>
      ) : (
        <Link href="/login" className="h-10 rounded-full">
          <Button
            tabIndex={-1}
            className="bg-background-primary h-10 rounded-full px-6 py-2 text-sm"
          >
            Login
          </Button>
        </Link>
      )}
    </div>
  );
}
