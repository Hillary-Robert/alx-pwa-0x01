# alx-project-0x14

## API Overview

The **MoviesDatabase API** provides access to a vast collection of data on movies, TV shows, and actors.  
It covers over **9 million titles** (including movies, series, and episodes) and **11 million actors, crew, and cast members**.  
Data includes YouTube trailer links, awards, biographies, ratings, box office performance, genres, and more.  
The database is updated regularly, with new titles added weekly and ratings/episodes updated daily.

## Version

**v1 (current)**

## Available Endpoints

### Titles

- `GET /titles` – Retrieve an array of titles with filtering and sorting.
- `GET /titles/{id}` – Get details for a specific title by IMDb ID.
- `GET /titles/{id}/ratings` – Get ratings and vote counts for a title.
- `GET /titles/random` – Get a random title.
- `GET /titles/x/upcoming` – List upcoming titles.
- `GET /titles/x/titles-by-ids` – Fetch multiple titles by IMDb IDs.

### Seasons & Episodes

- `GET /titles/series/{seriesId}` – Get all episodes for a series.
- `GET /titles/seasons/{seriesId}` – Get the total seasons for a series.
- `GET /titles/series/{seriesId}/{season}` – Get episodes for a specific season.
- `GET /titles/episode/{id}` – Get details for a specific episode.

### Search

- `GET /titles/search/keyword/{keyword}` – Search titles by keyword.
- `GET /titles/search/title/{title}` – Search titles by full or partial name.
- `GET /titles/search/akas/{aka}` – Search titles by alternative names (exact match, case-sensitive).

### Actors

- `GET /actors` – Get a list of actors with optional pagination.
- `GET /actors/{id}` – Get detailed info for a specific actor.

### Utils

- `GET /title/utils/titleType` – List available title types.
- `GET /title/utils/genres` – List all genres.
- `GET /title/utils/lists` – Get predefined title lists (e.g., most popular, top-rated).

## Request and Response Format

**Example Request:**

```bash
curl --request GET \
  --url 'https://moviesdatabase.p.rapidapi.com/titles/tt0000270' \
  --header 'X-RapidAPI-Key: YOUR_API_KEY' \
  --header 'X-RapidAPI-Host: moviesdatabase.p.rapidapi.com'

```

## Authentication

To authenticate requests, include the following headers:

- `X-RapidAPI-Key:` Your personal API key from RapidAPI.

- `X-RapidAPI-Host:` moviesdatabase.p.rapidapi.com

Example headers:

`X-RapidAPI-Key: YOUR_API_KEY`
`X-RapidAPI-Host: moviesdatabase.p.rapidapi.com`

## Error Handling

Common error responses you may encounter:

- `401 Unauthorized` – Missing or invalid API key.

- `404 Not Found` – The requested resource (e.g., IMDb ID) does not exist.

- `429 Too Many Requests` – Rate limit exceeded.

- `500 Internal Server Error` – Server-side issue.

Recommended handling:

Check response status before processing:

javascript
Copy code
if (!response.ok) {
throw new Error(`Error: ${response.status} ${response.statusText}`);
}

## Usage Limits and Best Practices

- `Rate Limits:` API usage is subject to rate limits defined by your RapidAPI subscription plan.

- `Maximum Results per Request:` Default limit is 10 results; maximum allowed is 50 (use the limit query parameter).

- `Filtering:` Use filters like genre, titleType, and year to narrow down results and improve performance.

- `Caching:` Cache frequent API responses locally to reduce the number of calls and improve efficiency.

- `Exact Matches:` Use the exact=true parameter when you require exact title matches in searches.
