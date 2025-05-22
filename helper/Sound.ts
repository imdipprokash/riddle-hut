import SoundPlayer from "react-native-sound-player";

export const PlaySound = () => {
    try {
        // play the file tone.mp3
        SoundPlayer.playSoundFile("click", "mp3");
        // or play from url
        SoundPlayer.playUrl("https://example.com/music.mp3");
        // or play file from folder
        SoundPlayer.playAsset(require("./assets/tone.mp3"));
    } catch (e) {
        console.log(`cannot play the sound file`, e);
    }
}