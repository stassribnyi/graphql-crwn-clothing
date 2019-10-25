import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CartDropdown from './cart-dropdown.component';

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const TOGGLE_ICON_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const CartDropdownContainer = () => (
  <Query query={GET_CART_ITEMS}>
    {({ data }) => (
      <Mutation mutation={TOGGLE_ICON_HIDDEN}>
        {toggleCartHidden => (
          <CartDropdown
            cartItems={data.cartItems}
            toggleCartHidden={toggleCartHidden}
          />
        )}
      </Mutation>
    )}
  </Query>
);

export default CartDropdownContainer;
