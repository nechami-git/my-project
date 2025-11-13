import apiSlice from "../../app/apiSlice"

const BasketApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getBasket: build.query({
            query: () => ({
                url: 'api/basket'
            }),
            providesTags: ['Basket'],
        }),
        addToBasket: build.mutation({
            query: (product) => ({
                url: 'api/basket',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ["Basket"],
        }),
        deleteInBasket: build.mutation({
            query: (product) => ({
                url: 'api/basket',
                method: 'DELETE',
                body: product
            }),
            invalidatesTags: ["Basket"],
        }),


    })
})
export const { useGetBasketQuery, useAddToBasketMutation, useDeleteInBasketMutation } = BasketApiSlice