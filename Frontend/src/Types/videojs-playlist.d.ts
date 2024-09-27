// src/videojs-playlist.d.ts

declare module 'videojs-playlist' {
    const videojsPlaylist: (player: videojs.Player, options?: any) => void;
    export default videojsPlaylist;
  }
  

  // Extend the video.js Player type to include playlist and playlistUi
declare module 'video.js' {
    export interface Player {
      playlist: (playlistItems: object[]) => void;
      playlistUi: () => void;
    }
  }
  