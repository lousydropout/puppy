import "@/app.css";
import { clientOnly } from "@solidjs/start";

const ClientOnlyComp = clientOnly(() => import("./main"));

export default function App() {
  return <ClientOnlyComp />;
}
