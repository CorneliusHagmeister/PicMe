"use client";

import { Search } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import SwipeableCard from "@/components/SwipeableCard";
import SavedPicturesCard from "@/components/SavedPicturesCard";
import SearchOverlay from "@/components/SearchOverlay";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@nextui-org/react";

const MAX_STACKED_PICS = 2;

type PictureSource = {
  webSource: string;
  shown: boolean;
  index: number;
};

export type QueryPictureStorageEntry = {
  searchQuery: string;
  savedPictures: PictureSource[];
};

export default function SearchPage() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <SearchPageContent />
    </Suspense>
  );
}

function SearchPageContent() {
  const lastImageIndex = useRef<number>(0);

  const searchParams = useSearchParams();
  const UrisearchQuery = searchParams.get("search_query");
  const [searchQuery, setSearchQuery] = useState<string>(UrisearchQuery ?? "");
  const queryPictureStorage = useRef<QueryPictureStorageEntry[]>([]);
  const [selectedTabKey, setSelectedTabKey] = useState<number>(0);

  //   acts as a queue and should always contain max 2 images
  const [picturesToShow, setPicturesToShow] = useState<PictureSource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showExplore, setShowExplore] = useState<boolean>(true);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const [pictures, setPictures] = useState<PictureSource[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/fetch-images?search_query=${searchQuery}`
      );
      const image_list = await response.json();
      const pictureSourceList = image_list.data.map(
        (source: any, index: number) => {
          return { webSource: source.original, shown: false, index };
        }
      );
      const tmpPicturesToShow = [];
      for (let i = 0; i < MAX_STACKED_PICS; i++) {
        if (lastImageIndex.current < pictureSourceList.length) {
          tmpPicturesToShow.unshift(pictureSourceList[lastImageIndex.current]);
          lastImageIndex.current += 1;
        }
      }
      setPicturesToShow(tmpPicturesToShow);
      setPictures(pictureSourceList);
      // prevent pushing the query storage twice
      if (
        queryPictureStorage.current.length > 0 &&
        queryPictureStorage.current[queryPictureStorage.current.length - 1]
          .searchQuery === searchQuery
      ) {
        return;
      }
      queryPictureStorage.current.push({
        searchQuery: searchQuery,
        savedPictures: [],
      });
      setIsLoading(false);
    }
    fetchData();
    // setIsLoading(false);
  }, [isLoading, searchQuery]);

  const getMainSectionContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-grow flex-col justify-center">
          <Spinner size="lg" />
        </div>
      );
    }
    if (showExplore) {
      return picturesToShow.map((pic, key) => {
        return (
          <SwipeableCard
            source={pic.webSource}
            active={key === MAX_STACKED_PICS - 1}
            key={pic.index}
            onSwipeRight={() => {
              // pushing a new picture on the stack of saved pictures
              queryPictureStorage.current[
                queryPictureStorage.current.length - 1
              ].savedPictures.push(pic);
            }}
            onExit={() => {
              pictures[key].shown = true;
              picturesToShow.pop();
              picturesToShow.unshift(pictures[lastImageIndex.current]);
              lastImageIndex.current += 1;
              setPicturesToShow([...picturesToShow]);
            }}
          />
        );
      });
    } else {
      return <SavedPicturesCard queryPictureStorage={queryPictureStorage} />;
    }
  };

  return (
    <div className="relative">
      <div className="min-h-screen h-screen p-3 bg-gray-100 flex flex-col">
        <div className="flex flex-row justify-between p-2 h-12">
          <h1 className="font-bold text-2xl">PicMe</h1>
          <button onClick={() => setShowSearch(true)}>
            <Search />
          </button>
        </div>
        <div
          className={`flex flex-grow flex-col relative ${
            !showExplore ? "overflow-y-scroll" : ""
          }`}
        >
          {getMainSectionContent()}
        </div>
        <Tabs
          variant={"solid"}
          aria-label="Tabs variants"
          className="h-12 mt-3"
          fullWidth
          selectedKey={selectedTabKey}
          onSelectionChange={(key) => {
            setShowExplore(key === "explore");
            setSelectedTabKey(key as number);
          }}
        >
          <Tab key="explore" title="Explore" />
          <Tab key="saved" title="Saved Pictures" />
        </Tabs>
      </div>
      {showSearch && (
        <SearchOverlay
          onClose={() => setShowSearch(false)}
          onSearch={(query) => {
            setIsLoading(true);
            setSearchQuery(query);
            setShowExplore(true);
            setShowSearch(false);
            setSelectedTabKey(0);
          }}
        />
      )}
    </div>
  );
}
