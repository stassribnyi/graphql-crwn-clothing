import { gql } from 'apollo-boost';

import { addItemToCart } from './cart.utils';

export const typeDefs = gql`
  extend type Item {
    quantity: Int!
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
  }
`;

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, _context, _info) => {
      const { cartHidden } = _context.cache.readQuery({
        query: GET_CART_HIDDEN
      });

      _context.cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: {
          cartHidden: !cartHidden
        }
      });

      return !cartHidden;
    },
    addItemToCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      });

      const modifiedCartItems = addItemToCart(cartItems, item);

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          cartItems: modifiedCartItems
        }
      });

      return modifiedCartItems;
    }
  }
};
