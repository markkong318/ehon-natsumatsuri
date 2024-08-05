export function loadAudio(audioElm: HTMLAudioElement) {
  return new Promise<void>((resolve) => {
    audioElm.oncanplaythrough = () => {
      resolve();
    };
    audioElm.onerror = () => {
      console.error('Error loading audio');
      resolve();
    };
    audioElm.preload = 'auto';
    audioElm.load();
  });
}

export async function playAudioAsync(voice: AudioBuffer, audioContext: AudioContext) {
  const source = audioContext.createBufferSource();
  source.buffer = voice;
  source.connect(audioContext.destination);

  // Create a new Promise that resolves when the source ends
  const promise = new Promise<void>((resolve) => {
    source.onended = () => {
      resolve();
    };
  });

  source.start(0);

  // Wait for the source to end
  await promise;
}
