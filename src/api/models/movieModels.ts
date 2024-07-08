export interface Movie {
  id: number;
  image: string;
  name: string;
  description: string;
  cast: string[];
  genre: string;
  duration: number;
  release_date: string; // Formato ISO 8601
}
