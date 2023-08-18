# tauri-taskify
A toy example of React + Tauri desktop app.

I made this application to experiment with and understand Tauri a little bit 
better and to determine if it was an appropriate choice for developing Rust 
desktop applications. After some initial stumbles understanding how React 
executes and shuttling data between Javascript and Typescript, I'm pretty 
impressed with the result.

Additionally, I had a problem finding tutorial content that properly leveraged
Rust as a backend. Pretty much every Tauri tutorial utilized its APIs for 
accessing the filesystem directly and didn't actually write any Rust to 
manage application logic.

The React frontend was made while following [this Youtube series](https://www.youtube.com/watch?v=knqz3_rPcKk). The channel also made a pretty good drag-and-drop tutorial that I'll probably be exploring soon.

## Building
For backend dependencies for your platform, see [Tauri's documentation](https://tauri.app/v1/guides/getting-started/prerequisites).

For frontend dependencies, I think you just need `npm` and `yarn`.