export function prepareOrdersFromShopify({datas, shopId, shopifyDomain}) {
  if (!datas) return [];
  const orders = datas.orders.edges.map(edge => edge.node);

  const result = orders.map(order => {
    const lineItems = order.lineItems.edges[0].node;
    return {
      createdAt: new Date(order.createdAt),
      updatedAt: new Date(order.updatedAt),
      firstName: order.billingAddress.firstName,
      city: order.billingAddress.city,
      country: order.billingAddress.country,
      productName: lineItems.name,
      productImage: lineItems.product.featuredImage.url,
      productId: lineItems.product.id.split('/').pop(),
      shopId,
      shopifyDomain
    };
  });
  return result;
}
