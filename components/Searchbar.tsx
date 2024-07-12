"use client";

import { Button, Input, Spacer } from "@nextui-org/react";
import { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
export default function SearchbarSection() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div>
      <Input
        type="text"
        variant="underlined"
        defaultValue="junior@nextui.org"
        className="max-w-xs"
        placeholder="Type to search..."
        value={searchQuery}
        isClearable
        onValueChange={setSearchQuery}
        startContent={
          <div className="pointer-events-none flex items-center">
            <Search />
          </div>
        }
      />
      <Spacer y={4} />
      <div className="flex justify-center">
        <Button>
          <Link href="/swipe_page"> Lets go!</Link>
        </Button>
      </div>
    </div>
  );
}
