// Calulates total price of amount of selected seats.
export function calcTotalTicketPrice(seats, prices) {
  return prices.reduce((acc, value) => {
    const amount = seats[value.id] || 0;
    return acc + value.price * amount;
  }, 0);
}
