import { Database } from "../infra/database";
import GenProcuracaoUseCase from "../use_cases/GenProcuracaoUseCase";
import { genProcuracao } from "./GenDocService";
import fs from "fs";

describe("genProcuracao", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  test("should generate a procuracao document and return the base64 string", async () => {
    // Mock the input data
    const usersid = ["1", "2"];

    // Mock the GenProcuracaoUseCase class
    // jest.mock("./GenProcuracaoUseCase", () => {
    //   return {
    //     GenProcuracaoUseCase: jest.fn().mockImplementation(() => {
    //       return {
    //         execute: jest.fn().mockResolvedValue("Lorem ipsum dolor sit amet"),
    //       };
    //     }),
    //   };
    // });

    jest
      .spyOn(GenProcuracaoUseCase.prototype, "execute")
      .mockResolvedValue("Lorem ipsum dolor sit amet");
    // jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});
    jest
      .spyOn(Database.person, "findMany")
      .mockResolvedValue([{ name: "John Doe" } as any, { name: "Jane Smith" }]);

    // // Mock the Database.person.findMany function
    // jest.mock("Database", () => {
    //   return {
    //     person: {
    //       findMany: jest
    //         .fn()
    //         .mockResolvedValue([{ name: "John Doe" }, { name: "Jane Smith" }]),
    //     },
    //   };
    // });

    // Mock the fs.writeFileSync function
    jest.spyOn(fs, "writeFileSync").mockImplementation(() => {});

    // Call the function
    const result = await genProcuracao(usersid, true);

    // Assert the result
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);

    // Verify the mock function calls
    expect(fs.writeFileSync).toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      "base64"
    );
  });

  test("should throw an error if there is an error generating the procuracao", async () => {
    // Mock the input data
    const usersid = ["1", "2"];

    // Mock the GenProcuracaoUseCase class to throw an error
    // jest.mock("./GenProcuracaoUseCase", () => {
    //   return {
    //     GenProcuracaoUseCase: jest.fn().mockImplementation(() => {
    //       return {
    //         execute: jest.fn().mockRejectedValue(new Error("Mocked error")),
    //       };
    //     }),
    //   };
    // });

    jest
      .spyOn(GenProcuracaoUseCase.prototype, "execute")
      .mockRejectedValue(new Error("Mocked error"));

    // Call the function and expect it to throw an error
    await expect(genProcuracao(usersid)).rejects.toThrow(
      "Error generating procuracao"
    );
  });
});
