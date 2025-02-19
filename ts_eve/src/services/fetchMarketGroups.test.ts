import "@testing-library/jest-dom";
import "@testing-library/dom";
import { fetchMarketGroups } from "./fetchMarketGroups";

global.fetch = jest.fn();

describe("fetchMarketGroups", () => {
  let consoleErrorSpy: jest.SpyInstance;

  const mockResponse = {
    children: [],
    description: "test description",
    hastypes: 1,
    iconid: 1,
    marketgroupid: 10,
    marketgroupname: 1,
    parentgroupid: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test("query should return with an unsorted list of marketgroups", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });
    const result = await fetchMarketGroups();

    expect(fetch).toHaveBeenCalledWith("api/marketgroups");
    expect(result).toEqual(mockResponse);
  });

  test("query should return with an empty array upon error", async () => {
    (fetch as jest.Mock).mockRejectedValue(
      new Error("Error fetching marketgroups: "),
    );

    const result = await fetchMarketGroups();

    expect(console.error).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
