import "@/app.css";
import { clientOnly } from "@solidjs/start";
import { createEffect, createSignal, onCleanup, Show } from "solid-js";
import { View } from "@/utils/constants";
import { muted, setMuted } from "@/utils/store";

const ClientOnlyComp = clientOnly(() => import("./main"));

export default function App() {
  const [view, setView] = createSignal<View>("menu");

  let bgMusic: HTMLAudioElement | undefined;

  createEffect(() => {
    if (typeof window !== "undefined") {
      if (!bgMusic) {
        bgMusic = new Audio("/level-7-27947.mp3");
        bgMusic.loop = true;
      }
      if (muted()) {
        bgMusic.pause();
      } else {
        bgMusic.play();
      }
    }
  }, [muted]);

  onCleanup(() => {
    if (bgMusic) bgMusic.pause();
  });

  const Menu = () => {
    return (
      <div class="w-full min-h-screen flex flex-col items-center justify-center gap-4 p-4 pt-0 -mt-12">
        <h1 class="text-6xl mb-12 flex flex-col items-center">
          <p>Welcome to</p>
          <span class="italic font-semibold">Puppy!</span>
        </h1>
        <h2 class="text-2xl">Choose your mode of interaction:</h2>
        {["chromium", "other"].map((type) => (
          <button
            class="bg-slate-300 hover:bg-slate-400 hover:text-white
           active:bg-slate-500 active:text-white
           border rounded-lg px-5 py-3 mt-4 hidden sm:block"
            onClick={() => {
              setMuted(false);
              setView(type as View);
            }}
          >
            {(() => {
              switch (type) {
                case "chromium":
                  return (
                    <>
                      <p>Voice command</p>
                      <p class="italic text-sm group-hover:text-slate-100 group-active:text-white text-slate-600">
                        (Chrome/Brave on desktop only)
                      </p>
                    </>
                  );
                case "other":
                  return <p>Buttons</p>;
              }
            })()}
          </button>
        ))}
      </div>
    );
  };

  return (
    <Show
      when={view() === "menu"}
      fallback={
        <ClientOnlyComp view={view()} bgMusic={bgMusic as HTMLAudioElement} />
      }
    >
      <Menu />
    </Show>
  );
}
