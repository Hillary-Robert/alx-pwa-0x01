import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { MoviesProps } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";

const Movies: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [year, setYear] = useState<number | null>(null);
  const [genre, setGenre] = useState<string>("All");
  const [movies, setMovies] = useState<MoviesProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch movies from API
  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/fetch-movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page,
          year,
          genre: genre === "All" ? "" : genre,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Fetch error:", text);
        setMovies([]);
        setError("Failed to fetch movies. Please try again.");
        return;
      }

      const data = await response.json();
      setMovies(data.movies || []);
    } catch (err) {
      console.error("Unexpected error:", err);
      setMovies([]);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, year, genre]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleGenreChange = (selectedGenre: string) => {
    setGenre(selectedGenre);
    setPage(1); // Reset to first page on filter change
  };

  const handleYearChange = (selectedYear: number | null) => {
    setYear(selectedYear);
    setPage(1); // Reset to first page on filter change
  };

  return (
    <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44">
      <div className="py-16">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between mb-4 items-center space-x-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="border-2 w-full md:w-96 border-[#E2D609] outline-none bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400"
          />

          <select
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              handleYearChange(Number(event.target.value))
            }
            className="border-2 border-[#E2D609] outline-none bg-transparent px-4 md:px-8 py-2 mt-4 md:mt-0 rounded-full w-full md:w-auto"
          >
            <option value="">Select Year</option>
            {[2025, 2024, 2023, 2022, 2021, 2020].map((yr) => (
              <option value={yr} key={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        {/* Title & Genre Buttons */}
        <p className="text-[#E2D609] text-xl mb-6 mt-6">Online streaming</p>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-lg md:text-6xl font-bold">
            {year || "All Years"} {genre} Movie List
          </h1>
          <div className="flex flex-wrap space-x-0 md:space-x-4 mt-4 md:mt-0">
            {["All", "Animation", "Comedy", "Fantasy"].map((g) => (
              <Button key={g} title={g} action={() => handleGenreChange(g)} />
            ))}
          </div>
        </div>

        {/* Movies grid */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id || movie.titleText.text}
              title={movie.titleText.text}
              posterImage={movie.primaryImage?.url}
              releaseYear={movie.releaseYear?.year}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button
            title="Previous"
            action={() => setPage((prev) => Math.max(prev - 1, 1))}
           
          />
          <Button title="Next" action={() => setPage(page + 1)} />
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && <Loading />}
    </div>
  );
};

export default Movies;
