import axios from "axios";

export async function getRatesFromApi() {
  const { data } = await axios("https://api.kuna.io:443/v3/exchange-rates", {
    method: "GET",
  });
  return data;
}
