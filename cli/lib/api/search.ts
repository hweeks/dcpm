import fetch from "node-fetch";

interface SearchResult {
  name: string;
  versions: string[];
  requestedVersion: string;
  owner: string;
  about: string;
  tags: string[];
}

export const search = async (
  searchTerm: string,
  searchVersion: string,
  baseUrl: string
): Promise<SearchResult[]> => {
  const request = await fetch(`${baseUrl}/api/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ searchTerm, searchVersion }),
  });
  if (!request.ok) {
    const body = await request.json();
    throw new Error(body.message || request.statusText);
  }
  return request.json();
};
