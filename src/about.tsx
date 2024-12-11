export const About = () => {
  return (
    <div class="flex flex-col items-center justify-start py-8 md:py-16 gap-8 md:gap-16">
      <h1 class="text-5xl md:text-7xl font-semibold italic text-center">
        About
      </h1>
      <img src="/scooby.webp" alt="Scooby" class="rounded-lg w-lg" />
      <div class="flex flex-col items-start justify-start gap-8 w-9/12 text-md sm:text-lg md:text-xl max-w-lg mx-auto text-left">
        <h2 class="text-2xl font-semibold">The music and sounds</h2>
        <p>
          The amazing 8-bit background music is titled "Level 7" and composed by{" "}
          <a href="https://pixabay.com/sound-effects/level-7-27947/">
            Justahand (Freesound)
          </a>
          . Please check out their work!
        </p>
        <p>
          As for all of the yelpings and pantings you hear, they are from
          recordings of Scooby (see below). Unfortuantely (for me), since Scooby
          did not care to cooperate, I spend a ridiculous number of hours
          following and recording him. <i>(It's a good thing he's cute.)</i>
        </p>
      </div>
      <div class="flex flex-col items-start justify-start gap-8 w-9/12 text-md sm:text-lg md:text-xl max-w-lg mx-auto text-left">
        <h2 class="text-2xl font-semibold">The Puppy</h2>
        <p>The "puppy" in this game is modeled after my dog, Scooby.</p>
        <p>
          Scooby is a dog who hates being told what to do... unless you happen
          to have treats. The puppy in this game is a complete opposite. The
          puppy obeys commands.{" "}
          <i>
            (I've always wondered what it's like to have a dog who follows
            commands without having to be bribed with treats first{" "}
            <span class="not-italic">&#128517;</span>)
          </i>
        </p>
      </div>
    </div>
  );
};
