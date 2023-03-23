import Image from "next/image";
import ProfilePopover from "../profile/ProfilePopover";
import Notifications from "../notifications/Notifications";

/**
 * @author Tom Whitticase
 *
 * @description This component is used to display the header on the page.
 */

export default function Header() {
  return (
    <>
      <div className="w-full h-[4rem] bg-dark-main shadow-lg text-white flex items-center justify-between px-8">
        <div className="flex gap-4 items-center">
          <Image
            src={"/images/make-it-all.png"}
            alt={"make-it-all"}
            width={32}
            height={32}
          />
          <div className="text-2xl mobile-only:text-base">Make-it-All</div>
        </div>
        <div className="flex gap-8 justify-center items-center">
          {/* Notifications system incomplete - will be added in the future. */}
          {/* <Notifications /> */}
          <ProfilePopover />
        </div>
      </div>
    </>
  );
}
