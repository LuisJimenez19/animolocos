import { API_URL } from "@/config";

interface Params {
  limit?: number;
  page?: number;
}

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
