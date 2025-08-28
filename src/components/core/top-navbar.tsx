"use client";
import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../ui/button";
import Input from "../ui/input";
import UserStore from "@/store/user";
import Link from "next/link";

export default function TopNavbar() {
  const router = useRouter();

  const { user } = UserStore();

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
      <Button
        className="bg-background-primary rounded-full px-6 py-2 text-sm"
        Suffix={<ChevronDown className="size-4" />}
      >
        All
      </Button>
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
        <div
          tabIndex={0}
          onClick={() => alert("suka")}
          onKeyDown={(e) => ["Enter", " "].includes(e.key) && alert("suka")}
          className="bg-background-primary flex h-10 items-center gap-2 rounded-full"
        >
          <Image
            className="rounded-full"
            unoptimized
            src={user.img}
            width={40}
            height={40}
            alt="user"
          />

          <div className="flex gap-2 pr-4">
            {user.name}
            <ChevronDown />
          </div>
        </div>
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
