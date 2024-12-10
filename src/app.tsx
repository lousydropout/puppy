import "@/app.css";
import { clientOnly } from "@solidjs/start";
import { createSignal, Match, Switch } from "solid-js";
import { View } from "@/utils/constants";
import { Instructions } from "@/instructions";
import { About } from "@/about";

const ClientOnlyComp = clientOnly(() => import("./main"));

export default function App() {
  const [view, setView] = createSignal<View>("game");

  const Footer = () => {
    return (
      <nav class="bg-blue-300 flex w-fit px-12 rounded-t-2xl gap-8 items-center justify-center fixed bottom-0">
        <button
          class="hover:underline hover:font-semibold active:underline px-5 min-h-12"
          onClick={() => setView("instructions")}
        >
          Instructions
        </button>
        <button
          class="hover:underline hover:font-semibold active:underline px-5 min-h-12"
          onClick={() => {
            window.location.href = "http://localhost:3000";
            // window.location.href = "https://puppy.lousydropout.com";
          }}
          disabled={view() === "game"}
        >
          Let's play!
        </button>
        <button
          class="hover:underline hover:font-semibold active:underline px-5 min-h-12"
          onClick={() => setView("about")}
        >
          About this game
        </button>
      </nav>
    );
  };

  return (
    <>
      <Switch>
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
