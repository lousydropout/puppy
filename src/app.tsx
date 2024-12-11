import "@/app.css";
import { clientOnly } from "@solidjs/start";
import { createSignal, Match, Switch } from "solid-js";
import { View } from "@/utils/constants";
import { Instructions } from "@/instructions";
import { About } from "@/about";
import { setMuted } from "./utils/store";

const ClientOnlyComp = clientOnly(() => import("./main"));

export default function App() {
  const [view, setView] = createSignal<View>("menu");

  const Footer = () => {
    return (
      <nav class="bg-blue-300 flex w-fit px-4 md:px-20 rounded-t-2xl gap-4 md:gap-8 items-center justify-center fixed bottom-0 text-xs sm:text-lg">
        <button
          class="hover:underline hover:font-semibold active:underline px-5 min-h-12"
          onClick={() => {
            setMuted(true);
            setView("instructions");
          }}
        >
          Instructions
        </button>
        <button
          class="hover:underline hover:font-semibold active:underline px-5 min-h-12"
          onClick={() => {
            setMuted(true);
            setView("menu");
          }}
        >
          Home
        </button>
        <button
          class="hover:underline hover:font-semibold active:underline px-5 min-h-12"
          onClick={() => {
            setMuted(true);
            setView("about");
          }}
        >
          About
        </button>
      </nav>
    );
  };

  const Menu = () => {
    return (
      <div class="flex flex-col items-center justify-start gap-4 md:gap-8 w-9/12 text-md sm:text-lg md:text-xl max-w-lg mx-auto mb-20">
        <h1 class="text-5xl sm:text-7xl font-semibold italic text-center">
          Train Your Puppy!
        </h1>
        <p class="text-xl sm:text-3xl italic">A simulation puzzle game</p>
        <p class="text-lg sm:text-xl mt-4 sm:mt-12">
          "Train Your Puppy!" is a simulation puzzle game where the roles{" "}
          <span class="font-semibold">Human</span> and{" "}
          <span class="font-semibold">Puppy</span> are reversed. Instead of you
          teaching your puppy commands, your task is to discover what each
          command does.
        </p>
        <button
          class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl px-5 min-h-12"
          onClick={() => {
            setMuted(false);
            setView("game");
          }}
        >
          Start playing
        </button>
      </div>
    );
  };

  return (
    <>
      <Switch fallback={<Menu />}>
        <Match when={view() === "instructions"}>
          <Instructions />
        </Match>
        <Match when={view() === "game"}>
          <ClientOnlyComp />
        </Match>
        <Match when={view() === "about"}>
          <About />
        </Match>
      </Switch>
      <Footer />
    </>
  );
}
