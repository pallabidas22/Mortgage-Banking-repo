import { initCap } from "./StringUtil";

describe("StringUtil", () => {
  describe("initCap", () => {
    it("should capitalize the first letter of a string", () => {
      // Arrange
      const input = "hello";

      // Act
      const result = initCap(input);

      // Assert
      expect(result).toBe("Hello");
    });

    it("should handle already capitalized strings", () => {
      // Arrange
      const input = "Hello";

      // Act
      const result = initCap(input);

      // Assert
      expect(result).toBe("Hello");
    });

    it("should handle single character strings", () => {
      // Arrange
      const input = "a";

      // Act
      const result = initCap(input);

      // Assert
      expect(result).toBe("A");
    });

    it("should preserve other capital letters in the string", () => {
      // Arrange
      const input = "helloWorld";

      // Act
      const result = initCap(input);

      // Assert
      expect(result).toBe("HelloWorld");
    });

    it("should handle empty string", () => {
      // Arrange
      const input = "";

      // Act
      const result = initCap(input);

      // Assert
      expect(result).toBe("");
    });

    it("should handle string with leading spaces", () => {
      // Arrange
      const input = "  hello";

      // Act
      const result = initCap(input);

      // Assert
      expect(result).toBe("  Hello");
    });

    it("should handle string with only spaces", () => {
      // Arrange
      const input = "   ";

      // Act
      const result = initCap(input);

      // Assert
      expect(result).toBe("   ");
    });

    it("should handle string with special characters", () => {
      // Arrange
      const input = "@hello";

      // Act
      const result = initCap(input);

      // Assert
      expect(result).toBe("@hello");
    });

    it("should handle string starting with number", () => {
      // Arrange
      const input = "1hello";

      // Act
      const result = initCap(input);

      // Assert
      expect(result).toBe("1hello");
    });

    it("should handle mixed case strings", () => {
      // Arrange
      const input = "hElLo";

      // Act
      const result = initCap(input);

      // Assert
      expect(result).toBe("HElLo");
    });

    it("should handle strings with multiple words", () => {
      // Arrange
      const input = "hello world";

      // Act
      const result = initCap(input);

      // Assert
      expect(result).toBe("Hello world");
    });

    it("should not modify other characters in the string", () => {
      // Arrange
      const input = "hello123!@#";

      // Act
      const result = initCap(input);

      // Assert
      expect(result).toBe("Hello123!@#");
    });
  });
});
