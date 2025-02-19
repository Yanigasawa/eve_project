import { searchTypes } from "./searchTypes";
import "@testing-library/jest-dom";

global.fetch = jest.fn();

describe("searchTypes", () => {
  let consoleErrorSpy: jest.SpyInstance;
  const mockResponse = [
    {
      typeid: 194,
      groupid: 83,
      typename: "Carbonized Lead L",
      description:
        "Large Projectile Ammo. This ammo uses a simple lead slug encased in a hard shell of crystalline carbon. It is fairly cheap and works very well against most armors. Shields, however, are a problem.\n\n60% increased optimal range.\n5% increased tracking speed.",
      capacity: null,
      portionsize: 100,
      raceid: "0",
      published: true,
      iconid: 1300,
      marketgroupid: 109,
      soundid: 0,
      graphicid: 1300,
      mass: "1",
      baseprice: "2000",
    },
    {
      typeid: 195,
      groupid: 83,
      typename: "Nuclear L",
      description:
        "Large Projectile Ammo. Nuclear weapons are considered by most races to be crude and primitive. However, the Minmatar still favor them over more sophisticated weapons due to the abundance of materials for plutonium production in Minmatar space.\n\n60% increased optimal range.\n5% increased tracking speed.",
      capacity: null,
      portionsize: 100,
      raceid: "0",
      published: true,
      iconid: 1304,
      marketgroupid: 109,
      soundid: 0,
      graphicid: 1304,
      mass: "1",
      baseprice: "3000",
    },
    {
      typeid: 196,
      groupid: 83,
      typename: "Proton L",
      description:
        "Large Projectile Ammo. Emits a focused, high intensity proton burst upon impact. Fairly effective vs. both shields and armor.\n\n60% increased optimal range.\n5% increased tracking speed.",
      capacity: null,
      portionsize: 100,
      raceid: "0",
      published: true,
      iconid: 1306,
      marketgroupid: 109,
      soundid: 0,
      graphicid: 1306,
      mass: "1",
      baseprice: "4000",
    },
    {
      typeid: 197,
      groupid: 83,
      typename: "Depleted Uranium L",
      description:
        "Large Projectile Ammo. Very commonly used by Minmatar pilots, this ammo is incendiary and also has great penetration. Just be careful handling it unless you want to wake up with an extra toe on your forehead.\n\n20% tracking speed bonus.",
      capacity: null,
      portionsize: 100,
      raceid: "0",
      published: true,
      iconid: 1301,
      marketgroupid: 109,
      soundid: 0,
      graphicid: 1301,
      mass: "1",
      baseprice: "5000",
    },
    {
      typeid: 198,
      groupid: 83,
      typename: "Titanium Sabot L",
      description:
        "Large Projectile Ammo. This is among the most feared ammunition around. It has excellent penetration. Once the ship's outer layer is penetrated, the core explodes, spraying the interior with a cloud of fragmentation fletchets that cause considerable damage to the vulnerable interior structure.\n\n20% increased tracking speed.",
      capacity: null,
      portionsize: 100,
      raceid: "0",
      published: true,
      iconid: 1307,
      marketgroupid: 109,
      soundid: 0,
      graphicid: 1307,
      mass: "1",
      baseprice: "6000",
    },
    {
      typeid: 199,
      groupid: 83,
      typename: "Fusion L",
      description:
        "Large Projectile Ammo. The destructive power of a fusion warhead is superior to most other projectile warheads available, although it has problems penetrating heavy shield systems.\n\n50% reduced optimal range.",
      capacity: null,
      portionsize: 100,
      raceid: "0",
      published: true,
      iconid: 1303,
      marketgroupid: 109,
      soundid: 0,
      graphicid: 1303,
      mass: "1",
      baseprice: "7000",
    },
    {
      typeid: 200,
      groupid: 83,
      typename: "Phased Plasma L",
      description:
        "Large Projectile Ammo. This ammo uses a similar plasma containment core as hybrid charges except that it is mounted in a standard cannon shell.\n\n50% reduced optimal range.",
      capacity: null,
      portionsize: 100,
      raceid: "0",
      published: true,
      iconid: 1305,
      marketgroupid: 109,
      soundid: 0,
      graphicid: 1305,
      mass: "1",
      baseprice: "8000",
    },
    {
      typeid: 201,
      groupid: 83,
      typename: "EMP L",
      description:
        "Large Projectile Ammo. A new technology, this highly advanced ammunition emits a focused EM pulse. Very potent against shields.\n\n50% reduced optimal range.",
      capacity: null,
      portionsize: 100,
      raceid: "0",
      published: true,
      iconid: 1302,
      marketgroupid: 109,
      soundid: 0,
      graphicid: 1302,
      mass: "1",
      baseprice: "10000",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test("fetches data and returns parsed JSON", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await searchTypes(109);

    expect(fetch).toHaveBeenCalledWith("api/types/search?marketgroupid=109");
    expect(result).toEqual(mockResponse);
  });

  test("handles fetch failure and returns an empty array", async () => {
    (fetch as jest.Mock).mockRejectedValue(
      new Error("Error searching people: "),
    );

    const result = await searchTypes(109);

    expect(console.error).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
