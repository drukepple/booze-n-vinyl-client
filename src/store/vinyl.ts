import { selector } from "recoil";
import { getAllVinyl } from "../services/vinyl";

export const genres = selector({
  key: "vinyl/genres",
  get: () => {
    return [
      `Rock`,
      'Dance',
      'Chill',
      'Seduce',
    ]
  }
})

export const vinyl = selector({
  key: "vinyl/all",
  get: async () => {
    return getAllVinyl();
  }
})