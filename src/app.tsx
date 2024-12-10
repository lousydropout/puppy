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
      <nav class="bg-blue-300 flex w-fit px-20 rounded-t-2xl gap-8 items-center justify-center fixed bottom-0">
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
      <div class="flex flex-col items-center justify-start sm:py-16 px-2 gap-8">
        <h1 class="text-7xl font-semibold italic text-center">
          Train Your Puppy!
        </h1>
        <p class="text-3xl italic">A simulation puzzle game</p>
        <p class="text-xl max-w-lg text-left mx-auto mt-12">
          "Train Your Puppy!" is a simulation puzzle game where the roles{" "}
          <span class="font-semibold">Human</span> and{" "}
          <span class="font-semibold">Puppy</span> are reversed. Instead of you
          teaching your puppy commands, your task is to discover what each
          command does.
        </p>
        <p class="text-xl max-w-lg text-left mx-auto text-red-500">
          Note: The sounds do not work when played on a smart phone. For best
          experience, play on a desktop.
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
