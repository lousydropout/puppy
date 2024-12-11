export const Instructions = () => {
  return (
    <div class="flex flex-col items-center justify-start py-8 md:py-16 gap-8 md:gap-16 mb-24">
      <h1 class="text-5xl md:text-7xl font-semibold italic text-center">
        Instructions
      </h1>

      <div class="flex flex-col items-start justify-start gap-4 md:gap-8 w-9/12 text-md sm:text-lg md:text-xl max-w-lg mx-auto text-left">
        <p>
          "Train Your Puppy!" is a simulation puzzle game where the roles are
          reversed. Instead of teaching your puppy commands, your task is to
          discover what each command does.
        </p>
        <p>
          As you issue commands (i.e., the buttons with different colors),
          you'll notice your puppy responds differently based on its current
          state.
        </p>
        <p>There are two points to keep in mind as you work on this puzzle.</p>
        <ol class="list-decimal">
          <li>
            For a given state (e.g. sitting up, lying down), there are only a
            few commands that will induce the puppy to do anything. Most
            commands will be ignored!
          </li>
          <li>
            The puppy only remembers a single command at a time and will try to
            follow the command after finishing its current cycle of motions. Of
            course, the command you issue might make no sense to the puppy at
            that time and, again, (1), will be ignored.
          </li>
        </ol>
        <p>
          Your task is to uncover the rules and fill out the Finite State
          Machine chart below (the boxes A-F and arrows 1-9).
        </p>

        <img
          src="/fsm.svg"
          alt="Finite State Machine"
          class="w-full rounded-lg w-lg"
        />
        <p>The states (boxes) take one of the following values:</p>
        <ol class="list-decimal">
          <li>Sitting</li>
          <li>Lying down</li>
          <li>Rolling over</li>
          <li>Eager</li>
          <li>Fetching food</li>
          <li>Excited</li>
        </ol>
        <p>The commands (arrows) take one of the following values:</p>
        <ol class="list-decimal">
          <li class="bg-red-500">Red</li>
          <li class="bg-green-300">Green</li>
          <li class="bg-pink-300">Pink</li>
          <li class="bg-blue-300">Blue</li>
          <li class="bg-yellow-300">Yellow</li>
          <li class="bg-purple-300">Purple</li>
          <li>(Nothing)</li>
          <li>(Nothing)</li>
          <li>(Nothing)</li>
        </ol>
        <p>
          A value of "(Nothing)" means that the states transitions from one to
          the other automatically, without any command.
        </p>
      </div>
    </div>
  );
};
