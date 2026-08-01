import { Nav } from "@/components/Nav";
import { TheBar } from "@/components/sections/TheBar";
import { TheShelf } from "@/components/sections/TheShelf";
import { TheSetlist } from "@/components/sections/TheSetlist";
import { TheRecordPlayer } from "@/components/sections/TheRecordPlayer";
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
      <main>
        <TheBar />
        <TheShelf />
        <TheSetlist />
        <TheRecordPlayer />
        <TheDoor />
      </main>
    </>
  );
}
