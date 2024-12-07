import axios from "axios";
import { getBaseUrl } from "../utils/ConfigUtil";

export class AccountHistoryService {
  baseUrl = getBaseUrl();

  async getAccountHistory(page, size = -1) {
    if (size === -1) {
      return await axios.get(`${this.baseUrl}/accountHistory?_page=${page}`);
    } else {
      return await axios.get(
        `${this.baseUrl}/accountHistory?_start=${(page - 1) * size}&_end=${
          page * size
        }`
      );
    }
  }
}
