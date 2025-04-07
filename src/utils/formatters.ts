export const formatPrice = (price: number): string => {
  return price.toFixed(2);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

export const calculateTotalPrice = (
  subtotal: number,
  taxes: number,
  serviceFee = 5
): number => {
  return subtotal + taxes + serviceFee;
};
