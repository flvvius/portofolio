/**
 * The back room: the things i didn't make, but keep.
 *
 * The page renders whatever is in `backRoomShelves` in order, so adding a
 * sixth shelf (records, games, recipes) is just another object in the array,
 * no component changes.
 *
 * Voice, same as everywhere else: `note` is one short line about why it stuck,
 * never a review and never a synopsis. If it needs a comma it's probably long
 * enough. Nothing here gets spoiled for anyone who hasn't read or seen it.
 */

export type BackRoomEntry = {
  title: string;
  /**
   * The small print at the right of the line: whoever made it, or for a place,
   * where it is. Omitted entirely on the aesthetics shelf, where there is no
   * one to credit.
   */
  by?: string;
  /** One line on why it stuck. Optional: some things don't need defending. */
  note?: string;
  /** Optional link out. Rendered as the title itself, never a separate "link". */
  href?: string;
};

export type BackRoomShelf = {
  /** Anchor id, also the key. */
  slug: string;
  label: string;
  /** Small print at the right of the heading rule. Keep it to a few words. */
  aside: string;
  entries: BackRoomEntry[];
};

export const backRoom = {
  title: "the back room",
  intro: ["things i didn't make but keep coming back to."],
  /** The one handwritten mark on the page. Two words, like everywhere else. */
  scribble: "borrowed taste",
  /** Sits under the last shelf, on paper. */
  note: "wrong by the time you read it. that's the point.",
  back: "← back to the bar",
};

export const backRoomShelves: BackRoomShelf[] = [
  {
    slug: "books",
    label: "books",
    aside: "the ones i re-read",
    entries: [
      {
        title: "1984",
        by: "george orwell",
        note: "the telescreen isn't the frightening part. newspeak is.",
      },
      {
        title: "mindset",
        by: "carol dweck",
        note: "one idea, and it happens to be the right one.",
      },
      {
        title: "four thousand weeks",
        by: "oliver burkeman",
        note: "that's the whole life. you won't get to everything.",
      },
    ],
  },
  {
    slug: "film",
    label: "film",
    aside: "watched more than twice",
    entries: [
      {
        title: "the shawshank redemption",
        by: "darabont, 1994",
        note: "patience as a plot device, twenty years of it.",
      },
      {
        title: "the mist",
        by: "darabont, 2007",
        note: "the ending. that's all i'm saying.",
      },
      {
        title: "the truman show",
        by: "weir, 1998",
        note: "less funny every year since.",
      },
    ],
  },
  {
    slug: "art",
    label: "art",
    aside: "makes me want to make something",
    entries: [
      {
        title: "frida kahlo",
        by: "painter",
        note: "painted the thing itself, not a polite version of it.",
      },
      {
        title: "haken",
        by: "prog, uk",
        note: "filed under art on purpose. composed, not assembled.",
      },
    ],
  },
  {
    slug: "places",
    label: "places",
    aside: "worth the trip",
    entries: [
      {
        title: "vârful piule",
        by: "retezat, romania",
        note: "everyone stops talking on the way up.",
      },
      {
        title: "cafeneaua nației",
        by: "bucharest",
        note: "some rooms just let you think.",
      },
      {
        title: "assisi",
        by: "umbria, italy",
        note: "stone, hills, a slower clock than you arrived with.",
      },
    ],
  },
  {
    slug: "aesthetics",
    label: "aesthetics",
    aside: "the whole mood",
    // No `by` on this shelf: these are moods, not works. It's the one shelf
    // that reads as a list of phrases rather than a list of things.
    entries: [
      {
        title: "raw nature",
        note: "no path, no signage. the thing as it already was.",
      },
      {
        title: "a sunny morning",
        note: "light that's only there before anyone else is up.",
      },
      {
        title: "a rainy afternoon in the mountains",
        note: "inside, warm, weather happening to somebody else.",
      },
    ],
  },
];
