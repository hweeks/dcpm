import fetch from "node-fetch";

export const login = async (
  username: string,
  password: string,
  baseUrl: string
): Promise<string | undefined> => {
  const request = await fetch(`${baseUrl}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!request.ok) {
    const body = await request.json();
    throw new Error(body.message || request.statusText);
  }
  const response = await request.json();
  return response && response.token;
};

export const create = async (
  username: string,
  password: string,
  baseUrl: string
): Promise<string | undefined> => {
  const request = await fetch(`${baseUrl}/api/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!request.ok) {
    const body = await request.json();
    throw new Error(body.message || request.statusText);
  }
  const response = await request.json();
  return response && response.token;
};

export interface UserApiInterface {
  login: typeof login;
  create: typeof create;
}

export interface UserApiPayload {
  username: string;
  password: string;
  baseUrl: string;
}

export type TUserApiChoices = "login" | "create";
