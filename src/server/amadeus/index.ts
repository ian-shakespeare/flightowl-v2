type AmadeusAuthResponse = {
  type: string;
  username: string;
  application_name: string;
  client_id: string;
  token_type: string;
  access_token: string;
  expires_in: number;
  state: string;
  scope: string;
};

export class Amadeus {
  static #clientId: string;
  static #clientSecret: string;
  #accessToken = "";
  #tokenExpiration = new Date();

  constructor(clientId: string, clientSecret: string) {
    Amadeus.#clientId = clientId;
    Amadeus.#clientSecret = clientSecret;
    this.getAmadeusToken();
  }

  async getAmadeusToken() {
    const res: AmadeusAuthResponse = await fetch(
      `${import.meta.env.VITE_AMADEUS_BASE_URL}/v1/security/oauth2/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${
          Amadeus.#clientId
        }&client_secret=${Amadeus.#clientSecret}`,
      }
    )
      .then((r) => r.json().then((body) => body))
      .catch((err) => console.error(err));

    this.#accessToken = res.access_token;
    this.#tokenExpiration = new Date(
      1000 * (Math.floor(new Date().getTime() / 1000) + res.expires_in)
    );
  }

  async performRequest(
    path: string,
    method: string,
    body: string
  ): Promise<any> {
    if (new Date() > this.#tokenExpiration) await this.getAmadeusToken();
    return await fetch(import.meta.env.VITE_AMADEUS_BASE_URL + path, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.#accessToken}`,
      },
      body: body,
    }).then((res) => res.json());
  }
}
