/* eslint-disable @next/next/no-img-element */
"use client";

import { Card } from "@nextui-org/react";
import { motion } from "framer-motion";

const sliderTransition = {
  duration: 0.5,
  ease: [0.56, 0.03, 0.12, 1.04],
};

type SwipeableCardProps = {
  source: string;
  onExit: () => void;
  active: boolean;
  className?: string;
  onSwipeRight: () => void;
};

export default function SwipeableCard({
  source,
  onExit,
  className,
  onSwipeRight,
}: SwipeableCardProps) {
  const dragEndHandler = (event: any, dragInfo: any) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 150;
    if (draggedDistance > swipeThreshold) {
      onSwipeRight();
      onExit();
    } else if (draggedDistance < -swipeThreshold) {
      onExit();
    }
  };
  return (
    <motion.div
      className={`flex-grow flex absolute top-0 right-0 left-0 bottom-0 ${className}`}
      initial={true}
      drag
      dragElastic={1}
      animate="active"
      exit="exit"
      transition={sliderTransition}
      //End of the window either side
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={(event, dragInfo) => dragEndHandler(event, dragInfo)}
    >
      <Card className="p-2 flex-grow bg-gray-100" shadow="sm">
        {/* For some reason CardBody and dragging don't get along */}
        <div className="h-full flex flex-col justify-center">
          {/** eslint-disable-next-line @next/next/no-img-element**/}
          <img
            draggable="false"
            alt="Card background"
            className="object-cover rounded-xl "
            src={source}
          />
        </div>
      </Card>
    </motion.div>
  );
}
