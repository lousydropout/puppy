import { createSignal } from "solid-js";
import { Action, ActionName } from "@/utils/actions";

const [muted, setMuted] = createSignal(true);
const [actions, setActions] = createSignal<Record<ActionName, Action>>();

export { muted, setMuted, actions, setActions };
