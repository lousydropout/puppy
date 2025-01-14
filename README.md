# Train Your Puppy!

Play this unique, role-reversed puzzle game where you discover what commands do to an unusually obedient virtual puppy, inspired by a real-life disobedient (but incredibly cute) dog.

## Introduction

"Train Your Puppy" is a unique simulation puzzle game where the traditional roles of dog training are reversed. Instead of teaching commands to a puppy, your task is to discover what each command does to an unusually obedient virtual puppy. The game is inspired by my real-life dog, Scooby, who ironically hates being told what to do unless treats are involved.

In this game, you'll interact with a puppy that responds to various commands represented by colored buttons. The puppy can be in different states such as sitting, lying down, rolling over, being eager, fetching food, or excited. As you issue commands, you'll observe how the puppy's state changes, gradually uncovering the rules that govern its behavior.

All the yelpings and pantings you hear in the game are actual recordings of Scooby. I hope you enjoy hearing his barks and noises as much as I do.

Your goal in this game is to understand the puppy's behavior patterns and master the art of indirect puppy training in this charming and puzzling adventure.

## Inspiration

"Train Your Puppy" was inspired by my real-life dog, Scooby. Unlike the obedient virtual puppy in the game, Scooby is quite the opposite - he hates being told what to do unless treats are involved. This contrast between my stubborn pet and the game's compliant character adds a layer of irony and humor to the project.

All the yelpings and pantings you hear in the game are actual recordings of Scooby, who did not want to cooperate during the recording process. This authentic touch brings a piece of Scooby's personality into the game, making it a truly personal project.

### Learning Experience

Developing this game has been an incredible learning journey. I've gained valuable experience in:

- Game design and puzzle mechanics
- Audio processing and integration in web applications
- Animation techniques using sprite sheets
- Using Speech-to-text API services such as Amazon Transcript (even though I removed this in the end due to the latency of the API calls affecting game immersion)

The process of creating this game has allowed me to combine my love for dogs, puzzle games, and web development into a unique and personal project.

### Building the Project

The project was built using

- **Solid.js**: For building the user interface and managing the application state
- **Tailwind CSS**: For styling the components and creating a responsive design
- **Procreate Dreams**: For drawing the animations
- **Audacity**: For editing and cleaning audio recordings of Scooby
- **ImageMagick**: For creating the (animation) sprite sheets

The game's audio features real recordings of Scooby, which were processed using `ffmpeg` to convert them into web-friendly formats. The animations were created using `Procreate Dreams` and exported as sequences of images, which were then processed using `ImageMagick` to create sprite sheets for efficient rendering in the game.

### Challenges Faced

Some of the main challenges I encountered during development included:

1. **Audio Recording**: Convincing Scooby to cooperate during the recording sessions was quite the task! His reluctance to follow commands in real life made capturing the necessary audio clips an adventure in itself. I spent multiple days just following him around and recording with my iPhone.

2. **Animation**: I quickly found out I lacked the drawing skills needed to draw my dog properly. So, I switched to drawing a blob instead. Getting this blob to feel alive was surprisingly difficult, as was getting the animation and audio to sync well with each other.

3. **Performance Optimization**: Ensuring smooth animations between animation cycles and responsive controls, especially when dealing with sprite sheets and audio playback, required optimization techniques to maintain good performance across different devices. Because of performance considerations, I ultimately had to remove a voice command feature due to the latency the Speech-to-text API added.

Despite these challenges, the development process was incredibly rewarding. It allowed me to combine my love for dogs, puzzle games, and web development into a unique and personal project. I hope you enjoy playing "Train Your Puppy" as much as I enjoyed creating it!

## Audio

The background music is titled "Level 7," by [freesound_community](https://pixabay.com/users/freesound_community-46691455/), and was taken from the site [pixabay](https://pixabay.com).

The dog sounds were recorded by me and are of my dog, Scooby.

The audio files were recording on my `iPhone` and converted from `.qt` to `.aac` using `ffmpeg`:

```bash
ffmpeg -i input.qt -c:a aac output.aac
```

## Sprite sheets

The animations are done in `Procreate Dreams` and exported as a sequences of images.

Suppose the exported images are named `frame_*.png`, going from `frame_01.png`, `frame_02.png`, and on.
Then, we take the following steps:

1. create a temporary directory `tmp`,
   ```bash
   mkdir -p tmp
   ```
2. convert the `png`s to `webp` while resizing and store the resulting `webp`s in `tmp/`,
   ```bash
   mogrify -define webp:lossless=true -format webp -path tmp -resize 688x523! frame_*.png
   ```
   and
3. glue the `tmp/frame_*.webp` images one-by-one horizontally next to each other.
   ```bash
   montage tmp/frame_*.webp -tile x1 -geometry +0+0 sprite_sheet.webp
   ```

The commands, `mogrify` and `montage`, are part of `ImageMagick`.
