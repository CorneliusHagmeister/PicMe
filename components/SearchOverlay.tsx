"use client";

import { Button, Input } from "@nextui-org/react";
import { X } from "lucide-react";
import { useState } from "react";

type SavedPicturesCardProps = {
  onClose: () => void;
  onSearch: (searchTerm: string) => void;
};
export default function SavedPicturesCard({
  onClose,
  onSearch,
}: SavedPicturesCardProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <section
      role="dialog"
      className="top-0 flex w-full h-full absolute bg-gray-700 bg-opacity-90 justify-center flex-col px-6"
    >
      <button
        className="absolute right-2 top-2"
        onClick={() => {
          onClose();
        }}
      >
        <X className="text-gray-300" />
      </button>

      <h2 className="text-gray-300 text-xl font-bold">
        Search for more pictures
      </h2>
      <div className="w-full">
        <Input
          variant="flat"
          radius="lg"
          value={searchQuery}
          onValueChange={(value) => {
            setSearchQuery(value);
          }}
          placeholder="Type to search..."
          className=" mt-6 "
        />
      </div>
      <Button
        className="mt-6"
        onClick={() => {
          onSearch(searchQuery);
        }}
      >
        Lets go
      </Button>
    </section>
  );
}
