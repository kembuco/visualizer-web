import client from "./client";

const endpoint = "/graph";

export default class GraphService {
  static async describe() {
    try {
      const response = await client.get(`${endpoint}/describe`);

      return response.data;
    } catch (e) {
      // TODO: gracefully handle error
      throw e;
    }
  }
}
