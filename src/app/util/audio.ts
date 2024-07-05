export function loadAudio(audioElm: HTMLAudioElement) {
  return new Promise<void>((resolve) => {
    audioElm.oncanplaythrough = () => {
      resolve();
    };
    audioElm.onerror = () => {
      console.error('Error loading audio');
      resolve();
    };
    audioElm.preload = "auto";
    audioElm.load();
  });
}
