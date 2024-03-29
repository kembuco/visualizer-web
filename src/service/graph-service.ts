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

  static async getNetworkInfo() {
    try {
      const response = await client.get(`${endpoint}/networkInfo`);

      return response.data;
    } catch (e) {
      // TODO: gracefully handle error
      throw e;
    }
  }

  static async getNodeInfo() {
    try {
      const response = await client.get(`${endpoint}/nodeInfo`);

      return response.data;
    } catch (e) {
      // TODO: gracefully handle error
      throw e;
    }
  }
}
