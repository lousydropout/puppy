# Puppy

# Audio

The background music is titled "Level 7," by [freesound_community](https://pixabay.com/users/freesound_community-46691455/), and was taken from the site [pixabay](https://pixabay.com).

The dog sounds were recorded by me and are of my dog, Scooby.

The audio files were recording on my `iPhone` and converted from `.qt` to `.aac` using `ffmpeg`:

```bash
ffmpeg -i input.qt -c:a aac output.aac
```

# Sprite sheets

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
3. glue the `tmp/frame_*.webp` images one-by-one horizontally next to each other.
   ```bash
   montage tmp/frame_*.webp -tile x1 -geometry +0+0 sprite_sheet.webp
   ```

The commands, `mogrify` and `montage`, are part of `ImageMagick`.
