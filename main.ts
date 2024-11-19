class Stock {
  prices: { [date: string]: number };

  constructor(name: string, prices: { [date: string]: number }) {
    this.prices = prices;
  }

  Price(date: Date) {
    const dateString = date.toISOString().split("T")[0];
    return this.prices[dateString] ?? 0;
  }
}

class Portfolio {
  stocks: Stock[];

  constructor(stocks: Stock[]) {
    this.stocks = stocks;
  }

  Profit(startDate: Date, endDate: Date): number {
    let startValue = 0;
    let endValue = 0;

    for (const stock of this.stocks) {
      startValue += stock.Price(startDate);
      endValue += stock.Price(endDate);
    }

    return endValue - startValue;
  }

  AnnualizedReturn(startDate: Date, endDate: Date): number {
    const profit = this.Profit(startDate, endDate);
    const startValue = this.stocks.reduce(
      (acc, stock) => acc + stock.Price(startDate),
      0
    );

    if (startValue === 0) return 0;

    const daysBetween =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const yearsBetween = daysBetween / 365;

    const totalReturn = profit / startValue;
    const annualizedReturn = Math.pow(1 + totalReturn, 1 / yearsBetween) - 1;

    return annualizedReturn;
  }
}
