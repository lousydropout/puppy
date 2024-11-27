// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import { ToastRegion, ToastList } from "@/components/ui/toast";
import { ColorModeProvider, ColorModeScript } from "@kobalte/core";

mount(
  () => (
    <>
      <StartClient />
      <ToastRegion>
        <ToastList />
      </ToastRegion>
    </>
  ),
  document.getElementById("app")!
);
