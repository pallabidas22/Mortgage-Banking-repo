import { removeElement } from "./ArrayUtil";
import { initCap } from "./StringUtil";

// Mock StringUtil's initCap function
jest.mock("./StringUtil", () => ({
  initCap: jest.fn(
    (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  ),
}));

describe("ArrayUtil", () => {
  describe("removeElement", () => {
    beforeEach(() => {
      // Clear mock calls before each test
      jest.clearAllMocks();
    });

    it("should remove specified element from array", () => {
      // Arrange
      const array = ["apple", "banana", "cherry"];
      const elementToRemove = "banana";

      // Act
      const result = removeElement(array, elementToRemove);

      // Assert
      expect(result).toHaveLength(2);
      expect(result).not.toContain("banana");
      expect(result).toEqual(["Apple", "Cherry"]);
    });

    it("should return original array if element not found", () => {
      // Arrange
      const array = ["apple", "banana", "cherry"];
      const elementToRemove = "mango";

      // Act
      const result = removeElement(array, elementToRemove);

      // Assert
      expect(result).toHaveLength(3);
      expect(result).toEqual(["Apple", "Banana", "Cherry"]);
    });

    it("should not capitalize elements when canElementsUpperCase is false", () => {
      // Arrange
      const array = ["apple", "banana", "cherry"];
      const elementToRemove = "banana";

      // Act
      const result = removeElement(array, elementToRemove, false);

      // Assert
      expect(result).toEqual(["apple", "cherry"]);
      expect(initCap).not.toHaveBeenCalled();
    });

    it("should handle empty array", () => {
      // Arrange
      const array = [];
      const elementToRemove = "banana";

      // Act
      const result = removeElement(array, elementToRemove);

      // Assert
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it("should handle array with duplicate elements", () => {
      // Arrange
      const array = ["apple", "banana", "apple", "cherry"];
      const elementToRemove = "apple";

      // Act
      const result = removeElement(array, elementToRemove);

      // Assert
      expect(result).toHaveLength(2);
      expect(result).toEqual(["Banana", "Cherry"]);
      expect(result).not.toContain("Apple");
    });

    it("should preserve original array", () => {
      // Arrange
      const array = ["apple", "banana", "cherry"];
      const originalArray = [...array];
      const elementToRemove = "banana";

      // Act
      removeElement(array, elementToRemove);

      // Assert
      expect(array).toEqual(originalArray);
    });

    it("should call initCap for each remaining element when canElementsUpperCase is true", () => {
      // Arrange
      const array = ["apple", "banana", "cherry"];
      const elementToRemove = "banana";

      // Act
      removeElement(array, elementToRemove);

      // Assert
      expect(initCap).toHaveBeenCalledTimes(2);
      expect(initCap).toHaveBeenCalledWith("apple");
      expect(initCap).toHaveBeenCalledWith("cherry");
    });

    it("should handle case-sensitive element removal", () => {
      // Arrange
      const array = ["Apple", "banana", "CHERRY"];
      const elementToRemove = "apple";

      // Act
      const result = removeElement(array, elementToRemove);

      // Assert
      expect(result).toEqual(["Apple", "Banana", "Cherry"]);
      expect(result).toHaveLength(3);
    });

    it("should handle array with non-string elements", () => {
      // Arrange
      const array = [1, "banana", true, null, undefined];
      const elementToRemove = "banana";

      // Act
      const result = removeElement(array, elementToRemove);

      // Assert
      expect(result).toHaveLength(4);
      expect(result).not.toContain("banana");
      // Note: initCap might not handle non-string values well in real implementation
    });
  });
});
