export const About = () => {
  return (
    <div class="flex flex-col items-center justify-start py-16 gap-16">
      <h1 class="text-7xl font-semibold italic text-center">About</h1>
      <div class="flex flex-col items-start justify-start gap-8 text-xl">
        <p class="max-w-lg text-left mx-auto">
          The "puppy" in this game is modeled after my dog, Scooby.
        </p>
        <p class="max-w-lg text-left mx-auto">
          Scooby is a dog who hates being told what to do... unless you happend
          to have treats. The puppy in this game is a complete opposite. The
          puppy obeys commands. (I always wondered what it would be like to have
          a dog that listens to me lol.)
        </p>
        <p class="max-w-lg text-left mx-auto">
          All of the yelpings and pantings you hear are from recordings of
          Scooby. Scooby did not want to cooperate and the few sounds used in
          this game came from hours of recordings lol.
        </p>
        <img src="/scooby.webp" alt="Scooby" class="rounded-lg w-lg" />
      </div>
    </div>
  );
};
