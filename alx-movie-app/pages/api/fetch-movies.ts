import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== "POST") {
    response.setHeader("Allow", ["POST"]);
    return response.status(405).json({ error: `Method ${request.method} Not Allowed` });
  }

  const { year, page, genre } = request.body;
  const date = new Date();

  try {
    const url = `https://moviesdatabase.p.rapidapi.com/titles?year=${
      year || date.getFullYear()
    }&sort=year.decr&limit=12&page=${page}${genre ? `&genre=${genre}` : ""}`;

    const resp = await fetch(url, {
      headers: {
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.MOVIE_API_KEY as string,
      },
    });

    if (!resp.ok) {
      const text = await resp.text();
      return response.status(resp.status).json({ error: text || "Failed to fetch movies" });
    }

    const moviesResponse = await resp.json();
    const movies: MoviesProps[] = moviesResponse.results || [];

    return response.status(200).json({ movies });
  } catch (err) {
    console.error("Unexpected error:", err);
    return response.status(500).json({ error: "Something went wrong" });
  }
}
