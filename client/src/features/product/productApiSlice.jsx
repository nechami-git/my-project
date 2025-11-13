import apiSlice from "../../app/apiSlice"
const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getProduct: build.query({
            query: () => ({
                url: '/api/product'
            })
        }),

        getByProduct: build.query({
            query: (id) => ({
                url: `api/product/${id}`
            })
        }),
        addProduct: build.mutation({
            query: (newProduct) => ({
                url: '/api/product',
                method: 'POST',
                body: newProduct,
            }),
             invalidatesTags: ["product"]
        }),
        upDateProduct: build.mutation({
            query: ( updatedProduct ) => ({
                url: 'api/product',
                method: "PUT",
                body: updatedProduct
            }),
            invalidatesTags: ["product"]
        }),
        DeleteProduct: build.mutation({
            query: (id) => ({
                url: `/api/product/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["product"]
        }),

    }),

})
export const { useGetProductQuery, useGetByProductQuery, useAddProductMutation, useUpDateProductMutation, useDeleteProductMutation } = productApiSlice