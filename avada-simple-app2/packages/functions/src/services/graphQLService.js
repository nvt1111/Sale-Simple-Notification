const getOrders = async (shopify, limit) => {
  const query = `
    query ($limit: Int!) {
      orders(first: $limit) {
        edges {
          node {
            createdAt
            updatedAt
            billingAddress {
              firstName
              city
              country
            }
            lineItems(first: 1) {
              edges {
                node {
                  name
                  product {
                    id
                    featuredImage {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`;

  const variables = {limit};

  return await shopify.graphql(query, variables);
  // (data: String, variables)
};

export default getOrders;
