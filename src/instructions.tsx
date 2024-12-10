export const Instructions = () => {
  return (
    <div class="flex flex-col items-center justify-start py-16 gap-16">
      <h1 class="text-7xl font-semibold italic text-center">Instructions</h1>

      <div class="flex flex-col items-start justify-start gap-8 text-xl">
        <p class="max-w-lg text-left mx-auto">
          "Train Your Puppy!" is a simulation puzzle game where the roles are
          reversed. Instead of teaching your puppy commands, your task is to
          discover what each command does.
        </p>
        <p class="max-w-lg text-left mx-auto">
          As you issue commands (i.e., the buttons with different colors),
          you'll notice your puppy responds differently based on its current
          state. Your task is to uncover the rules.
        </p>
        <img
          src="/fsm.svg"
          alt="Finite State Machine"
          class="w-full rounded-lg w-lg mx-auto"
        />
        <p class="max-w-lg text-left mx-auto">
          The states (boxes) take one of the following values:
        </p>
        <ol class="list-decimal">
          <li>Sitting</li>
          <li>Lying down</li>
          <li>Rolling over</li>
          <li>Eager</li>
          <li>Fetching food</li>
          <li>Excited</li>
        </ol>
        <p class="max-w-lg text-left mx-auto">
          The commands (arrows) take one of the following values:
        </p>
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
        <p class="max-w-lg text-left mx-auto">
          A value of "(Nothing)" means that the states transitions from one to
          the other automatically, without any command.
        </p>
      </div>
    </div>
  );
};
