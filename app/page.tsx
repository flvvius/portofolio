import { Nav } from "@/components/Nav";
import { TheBar } from "@/components/sections/TheBar";
import { TheShelf } from "@/components/sections/TheShelf";
import { TheTab } from "@/components/sections/TheTab";
import { TheRecordPlayer } from "@/components/sections/TheRecordPlayer";
import { TheDoor } from "@/components/sections/TheDoor";

export const metadata = {
  title: "Flavius Cojocaru | Full-Stack Engineer",
  description:
    "a shelf of things i've built, the stories behind them, and whatever's currently on rotation.",
};

export default function Home() {
  return (
    /*
     * The left gutter is reserved for the nav rail at all times, not only once
     * the rail fades in — otherwise the whole page would reflow 224px sideways
     * on the first scroll. The rail is `fixed`, so it ignores this padding and
     * sits in the space it leaves behind.
     */
    <div className="xl:pl-[224px]">
      <Nav />
      <main>
        <TheBar />
        <TheShelf />
        <TheTab />
        <TheRecordPlayer />
        <TheDoor />
      </main>
    </div>
  );
}
