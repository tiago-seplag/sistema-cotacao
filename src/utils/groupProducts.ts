import { SavedProduct, GroupedProduct } from '../types';

export const groupProducts = (products: SavedProduct[]): GroupedProduct[] => {
  const grouped: { [key: string]: GroupedProduct } = {};

  products.forEach((product) => {
    if (!grouped[product.productName]) {
      grouped[product.productName] = {
        productName: product.productName,
        quantity: product.quantity || 1, // Use the quantity from the first product (user-defined)
        prices: [],
        averagePrice: 0,
        totalValue: 0,
      };
    }

    // Add price only once per source to avoid duplicates in average calculation
    const existingPriceIndex = grouped[product.productName].prices.findIndex(
      p => p.source === product.source && p.supplier === product.supplier
    );
    
    if (existingPriceIndex === -1) {
      grouped[product.productName].prices.push({
        source: product.source,
        price: product.price,
        supplier: product.supplier,
      });
    }
  });

  // Calculate average prices and total values
  Object.keys(grouped).forEach((productName) => {
    const group = grouped[productName];
    // Calculate average price from all sources
    const avgPrice =
      group.prices.reduce((sum, p) => sum + p.price, 0) / group.prices.length;
    group.averagePrice = Math.round(avgPrice * 100) / 100;
    // Total value = average price × user-defined quantity
    group.totalValue = Math.round(group.averagePrice * group.quantity * 100) / 100;
  });

  return Object.values(grouped);
};

export const calculateTotalBudget = (groupedProducts: GroupedProduct[]): number => {
  return groupedProducts.reduce((sum, product) => sum + product.totalValue, 0);
};
