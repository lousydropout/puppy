export const About = () => {
  return (
    <div class="flex flex-col items-center justify-start py-8 md:py-16 gap-8 md:gap-16">
      <h1 class="text-5xl md:text-7xl font-semibold italic text-center">
        About
      </h1>
      <div class="flex flex-col items-start justify-start gap-8 w-9/12 text-md sm:text-lg md:text-xl max-w-lg mx-auto text-left">
        <p>The "puppy" in this game is modeled after my dog, Scooby.</p>
        <p>
          Scooby is a dog who hates being told what to do... unless you happend
          to have treats. The puppy in this game is a complete opposite. The
          puppy obeys commands. (I always wondered what it would be like to have
          a dog that listens to me lol.)
        </p>
        <p>
          All of the yelpings and pantings you hear are from recordings of
          Scooby. Scooby did not want to cooperate and the few sounds used in
          this game came from hours of recordings lol.
        </p>
        <img src="/scooby.webp" alt="Scooby" class="rounded-lg w-lg" />
      </div>
    </div>
  );
};
