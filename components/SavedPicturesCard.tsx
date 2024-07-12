/* eslint-disable @next/next/no-img-element */
import { QueryPictureStorageEntry } from "@/app/searchPage/page";
import { Accordion, AccordionItem, Card, CardBody } from "@nextui-org/react";
import { MutableRefObject } from "react";

type SavedPicturesCardProps = {
  queryPictureStorage: MutableRefObject<QueryPictureStorageEntry[]>;
};

export default function SavedPicturesCard({
  queryPictureStorage,
}: SavedPicturesCardProps) {
  // filter storage entries without saved pictures
  const filteredStorage = queryPictureStorage.current.filter(
    (item) => item.savedPictures.length > 0
  );
  return (
    <>
      <div className="flex font-bold text-xl p-2">Your saved pictures</div>
      <Accordion>
        {filteredStorage.map((item, index) => {
          return (
            <AccordionItem
              key={`Accordion-${index}`}
              aria-label="Accordion 1"
              title={item.searchQuery}
            >
              <div className="flex flex-col gap-4 p-3">
                {item.savedPictures.map((savedPicture, pictureIndex) => {
                  return (
                    <Card key={`SavedPicture-${pictureIndex}`} shadow="sm">
                      <CardBody>
                        <img
                          src={savedPicture.webSource}
                          alt={`Image saved for the query ${item.searchQuery}`}
                        />
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}
