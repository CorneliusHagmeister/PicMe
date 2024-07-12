"use client";

import { Button } from "@nextui-org/button";
import { Input, NextUIProvider, Spacer } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

enum IntroSteps {
  WELCOME,
  ABOUT,
  PICTURE_DESCRIPTION,
}

export default function IntroPage() {
  const [currentStep, setCurrentStep] = useState<IntroSteps>(
    IntroSteps.WELCOME
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const WelcomeStepContent = (
    <>
      <h1 className="text-gray-800 text-center text-2xl">Welcome</h1>
      <h1 className=" text-gray-800 align text-center text-2xl">to</h1>
      <h1 className="font-bold text-gray-800 text-center text-2xl">PicMe</h1>
    </>
  );

  const AboutStepContent = (
    <>
      <h1 className=" text-gray-800 text-center text-2xl">
        <span className="font-bold">PicMe</span> is a fun, interactive way to
        find pictures you care about
      </h1>
    </>
  );

  const PictureDescriptionStepContent = (
    <>
      <h1 className=" text-gray-800 text-center text-2xl">
        Tell me what kind of picture you&apos;re looking for
      </h1>
      <Input
        value={searchQuery}
        onValueChange={(value) => setSearchQuery(value)}
        variant="bordered"
        radius="lg"
        placeholder="Type to search..."
        className="max-w-xs mt-6"
        errorMessage={errorMessage}
        isInvalid={errorMessage !== "" && searchQuery === ""}
      />
    </>
  );

  const getContent = () => {
    switch (currentStep) {
      case IntroSteps.WELCOME:
        return WelcomeStepContent;
      case IntroSteps.ABOUT:
        return AboutStepContent;
      case IntroSteps.PICTURE_DESCRIPTION:
        return PictureDescriptionStepContent;
    }
  };

  const onNext = () => {
    switch (currentStep) {
      case IntroSteps.WELCOME:
        setCurrentStep(IntroSteps.ABOUT);
        break;
      case IntroSteps.ABOUT:
        setCurrentStep(IntroSteps.PICTURE_DESCRIPTION);
        break;
      default:
        if (searchQuery !== "") {
          router.push(`/searchPage?search_query=${searchQuery}`);
        } else {
          setErrorMessage("Be more creative with the search query");
        }
    }
  };

  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center p-24 bg-gray-100 justify-center">
        {getContent()}
        <Spacer y={14} />
        <Button onClick={onNext}>Next</Button>
      </main>
    </NextUIProvider>
  );
}
