import { vi, describe, beforeEach, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import BeerCard from "../app/_components/BeerCard";
import { useRouter } from "next/navigation";
import type { Beer } from "@/types/beer";

const mockAddToOrder = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("../../actions/order-actions", () => ({
  addToOrder: (
    ...args: Parameters<typeof mockAddToOrder>
  ): ReturnType<typeof mockAddToOrder> => mockAddToOrder(...args),
}));

const mockBeer: Beer = {
  quantity: 1,
  name: "Mock Lager",
  image: "/test.jpg",
  price: 4.99,
};

describe("BeerCard", () => {
  const mockRefresh = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      refresh: mockRefresh,
    });
    mockAddToOrder.mockResolvedValue({
      items: [{ name: "Corona", quantity: 1, price_per_unit: 115, total: 115 }],
      created: new Date().toISOString(),
      paid: false,
      subtotal: 115,
      taxes: 10,
      rounds: [],
      discounts: 0,
    });
  });

  it("renders beer name and image", () => {
    render(<BeerCard beer={mockBeer} />);
    expect(screen.getByText("Mock Lager")).toBeDefined();
    expect(screen.getByAltText("Mock Lager")).toBeDefined();
  });
});
