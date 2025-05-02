import React, { ReactNode } from "react";
import Bg from "@/assets/bg.png"
import Image from "next/image";

const PageWrapper = ({
  children,
  percentageWidth = "full",
}: {
  children?: ReactNode;
  percentageWidth?: string;
}) => {
  return (
    <div className="h-full w-full relative bg-[#eaeaeb]">
      {/* Fixed background image that stays in place */}
      <div className="absolute top-0 left-0 right-0 h-1/2 w-full">
        <Image
          className="h-full w-full object-center z-0"
          src={Bg.src}
          alt="Background"
          height={150}
          width={150}
        />
      </div>

      {/* Content container that scrolls over the background */}
      <div className="z-10 relative h-full overflow-y-auto">
        <div className="flex flex-col items-center min-h-full py-10 gap-5">
          <div className={`${percentageWidth}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
