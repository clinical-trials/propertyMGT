import { describe, it, expect } from "vitest";
import { parseAddress } from "./address";

describe("address parsing", () => {
  it("parses the levario address with a unit designator", () => {
    const a = parseAddress("410 Harvard Drive Southeast, C, Albuquerque, NM 87106");
    expect(a.street).toBe("410 Harvard Drive Southeast");
    expect(a.unit).toBe("C");
    expect(a.city).toBe("Albuquerque");
    expect(a.state).toBe("NM");
    expect(a.zip).toBe("87106");
    expect(a.missing).toHaveLength(0);
  });

  it("parses the baca address (numeric-letter street + unit)", () => {
    const a = parseAddress("1100A 10th St SW, A, Albuquerque, NM 87102");
    expect(a.street).toBe("1100A 10th St SW");
    expect(a.unit).toBe("A");
    expect(a.city).toBe("Albuquerque");
    expect(a.state).toBe("NM");
    expect(a.zip).toBe("87102");
  });

  it("flags what it can't fill", () => {
    const a = parseAddress("just some street");
    expect(a.missing).toContain("state");
    expect(a.missing).toContain("zip");
  });
});
