import { API_URL } from "@/config";

interface Params {
  page?: number;
}

export const getTopCharacters = async (params: Params = { page: 1 }) => {
  const { page } = params;
  return fetch(`${API_URL}/top/characters?page=${page}`).then((res) =>
    res.json()
  );
};

export const getRandomCharacter = async () => {
  return fetch(`${API_URL}/random/characters`).then((res) => res.json());
};


export const getCharacterById = async ({ id }: { id: string }) =>
  await fetch(`${API_URL}/characters/${id}`).then((res) => res.json());