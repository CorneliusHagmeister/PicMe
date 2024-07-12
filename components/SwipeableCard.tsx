/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardBody } from "@nextui-org/react";
import { motion, useDragControls } from "framer-motion";

const sliderVariants = {
  incoming: (direction: any) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: any) => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 1,
    opacity: 0.2,
  }),
};
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
  const dragControls = useDragControls();
  const dragEndHandler = (dragInfo: any) => {
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
      initial
      drag={true}
      dragElastic={1}
      animate="active"
      exit="exit"
      transition={sliderTransition}
      //End of the window either side
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
    >
      <Card className="py-2 flex-grow bg-gray-100" shadow="sm">
        <CardBody className="py-2 flex flex-col justify-center">
          {/** eslint-disable-next-line @next/next/no-img-element**/}
          <img
            draggable="false"
            alt="Card background"
            className="object-cover rounded-xl "
            src={source}
          />
        </CardBody>
      </Card>
    </motion.div>
  );
}
