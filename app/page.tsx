import { Nav } from "@/components/Nav";
import { TheBar } from "@/components/sections/TheBar";
import { TheShelf } from "@/components/sections/TheShelf";
import { TheRecordPlayer } from "@/components/sections/TheRecordPlayer";
import { TheHouseRules } from "@/components/sections/TheHouseRules";
import { TheDoor } from "@/components/sections/TheDoor";

export const metadata = {
  title: "Flavius Cojocaru | Full-Stack Engineer",
  description:
    "a shelf of things i've built, the stories behind them, and whatever's currently on rotation.",
};

export default function Home() {
  return (
    <>
      <Nav />
      {/* `id`/`tabIndex` are the skip link's target, on every page. */}
      <main id="main" tabIndex={-1}>
        <TheBar />
        <TheShelf />
        <TheRecordPlayer />
        <TheHouseRules />
        <TheDoor />
      </main>
    </>
  );
}
