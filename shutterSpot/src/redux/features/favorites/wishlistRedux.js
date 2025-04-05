import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlists: {}, // Object to store wishlists for different users
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addPhotographerToWishlist: (state, action) => {
      const { userId } = action.payload;
      if (!state.wishlists[userId]) {
        state.wishlists[userId] = {
          products: [],
          wishQuantity: 0,
        };
      }
      state.wishlists[userId].wishQuantity += 1;
      state.wishlists[userId].products.push({
        product: action.payload.product,
        quantity: action.payload.quantity
      });
    },
    removePhotographerFromWishlist: (state, action) => {
      const { userId, photographerId } = action.payload;
      if (state.wishlists[userId]) {
        const photographerIndex = state.wishlists[userId].products.findIndex(
          (item) => item.product.id === photographerId
        );
        if (photographerIndex !== -1) {
          state.wishlists[userId].wishQuantity -= 1;
          state.wishlists[userId].products.splice(photographerIndex, 1);
        }
      }
    },
  },
});

export const { 
  addPhotographerToWishlist, 
  removePhotographerFromWishlist 
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state, userId) =>
  state.wishlist.wishlists[userId] || { products: [], wishQuantity: 0 };

export default wishlistSlice.reducer;
