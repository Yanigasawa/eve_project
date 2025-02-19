import "@testing-library/jest-dom";
import "@testing-library/dom";
import { renderHook, waitFor } from "@testing-library/react";
import { useMarketGroups } from "./marketGroupService";
import { fetchMarketGroups } from "./fetchMarketGroups";

jest.mock("./fetchMarketGroups", () => {
  return { fetchMarketGroups: jest.fn() };
});

describe("useMarketGroups", () => {
  let consoleErrorSpy: jest.SpyInstance;

  const mockFetchMarketGroupsResponse = [
    {
      description: "test description",
      hastypes: 1,
      iconid: 1,
      marketgroupid: 10,
      marketgroupname: "1",
      parentgroupid: 1,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test("useMarketGroups should return a sorted MarketGroup object", async () => {
    (
      fetchMarketGroups as jest.MockedFunction<typeof fetchMarketGroups>
    ).mockResolvedValue(mockFetchMarketGroupsResponse);

    const { result } = renderHook(() => useMarketGroups());

    await waitFor(() => {
      expect(result.current.marketGroups.size).toBeGreaterThan(0);
    });

    expect(result.current.marketGroups).toEqual(expect.any(Map));
  });
});
