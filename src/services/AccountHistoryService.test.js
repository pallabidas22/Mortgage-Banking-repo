import axios from "axios";
import { AccountHistoryService } from "./AccountHistoryService";
import { getBaseUrl } from "../utils/ConfigUtil";

// Mock axios and ConfigUtil
jest.mock("axios");
jest.mock("../utils/ConfigUtil", () => ({
  getBaseUrl: jest.fn(() => "http://mock-api"),
}));

describe("AccountHistoryService", () => {
  let service;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    service = new AccountHistoryService();
  });

  describe("getAccountHistory", () => {
    it("should fetch account history with only page parameter", async () => {
      // Arrange
      const mockResponse = {
        data: [
          {
            accountNumber: "1234567893",
            date: "2024-03-16T09:57:00.731563",
            type: "Mortgage",
            amount: 793,
            creditOrDebit: "Debit",
            remarks: "Amount Deposit",
          },
          {
            accountNumber: "1234567891",
            date: "2024-10-01T09:57:00.731589",
            type: "Mortgage",
            amount: 3975,
            creditOrDebit: "Debit",
            remarks: "Amount Credit",
          },
        ],
      };
      axios.get.mockResolvedValueOnce(mockResponse);
      const page = 1;

      // Act
      const result = await service.getAccountHistory(page);

      // Assert
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        "http://mock-api/accountHistory?_page=1"
      );
      expect(result).toEqual(mockResponse);
    });

    it("should fetch account history with page and size parameters", async () => {
      // Arrange
      const mockResponse = { data: ["history1", "history2"] };
      axios.get.mockResolvedValueOnce(mockResponse);
      const page = 2;
      const size = 10;

      // Act
      const result = await service.getAccountHistory(page, size);

      // Assert
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        "http://mock-api/accountHistory?_start=10&_end=20"
      );
      expect(result).toEqual(mockResponse);
    });

    it("should handle API errors", async () => {
      // Arrange
      const mockError = new Error("API Error");
      axios.get.mockRejectedValueOnce(mockError);
      const page = 1;

      // Act & Assert
      await expect(service.getAccountHistory(page)).rejects.toThrow(
        "API Error"
      );
    });

    it("should use correct pagination calculation", async () => {
      // Arrange
      const mockResponse = {
        data: [
          {
            accountNumber: "1234567893",
            date: "2024-03-16T09:57:00.731563",
            type: "Mortgage",
            amount: 793,
            creditOrDebit: "Debit",
            remarks: "Amount Deposit",
          },
          {
            accountNumber: "1234567891",
            date: "2024-10-01T09:57:00.731589",
            type: "Mortgage",
            amount: 3975,
            creditOrDebit: "Debit",
            remarks: "Amount Credit",
          },
        ],
      };
      axios.get.mockResolvedValueOnce(mockResponse);
      const page = 3;
      const size = 15;

      // Act
      await service.getAccountHistory(page, size);

      // Assert
      expect(axios.get).toHaveBeenCalledWith(
        "http://mock-api/accountHistory?_start=30&_end=45"
      );
    });
  });
});
