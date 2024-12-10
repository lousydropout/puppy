// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <title>Good Puppy</title>
          {assets}
        </head>
        <body>
          <div
            id="app"
            class="w-full min-h-screen flex flex-col items-center justify-around"
          >
            {children}
          </div>
          {scripts}
        </body>
      </html>
    )}
  />
));
