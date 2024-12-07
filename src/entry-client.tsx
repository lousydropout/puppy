// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import { ToastRegion, ToastList } from "@/components/ui/toast";

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
