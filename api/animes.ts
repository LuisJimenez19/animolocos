import { API_URL } from "@/config";

interface Params {
  limit?: number;
  page?: number;
}

export const getAnimeById = async ({ id }: { id: string }) =>
  await fetch(`${API_URL}/anime/${id}`).then((res) => res.json());

export const getAnimeRandom = async () =>
  await fetch(`${API_URL}/random/anime`).then((res) => res.json());

export const getRecommendedAnimes = async (
  params: Params = { limit: 25, page: 1 }
) => {
  const { limit, page } = params;
  return await fetch(`${API_URL}/anime?page=${page}`).then((res) => res.json());
};

export const getPopulateAnimes = async (
  params: Params = { limit: 25, page: 1 }
) => {
  const { limit, page } = params;
  return await fetch(`${API_URL}/top/anime?limit=${limit}&page=${page}`).then(
    (res) => res.json()
  );
};

export const getCharactersAnimeById = async ({ id }: { id: number }) => {
  return await fetch(`${API_URL}/anime/${id}/characters`).then((res) =>
    res.json()
  );
};

export const getAnimeRelationshipById = async ({ id }: { id: number }) => {
  return await fetch(`${API_URL}/anime/${id}/recommendations`).then((res) =>
    res.json()
  );
};
