import apiSlice from "../../app/apiSlice"

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation({
            query: (registerUser) => ({
                url: "/api/user/register",
                method: "POST",
                body: registerUser
            })
        }),
        login: build.mutation({
            query: (loginData) => ({
                url: "/api/user/login",
                method: "POST",
                body: loginData
            })
        }),
        updateProduct: build.mutation({
            query: ({ id, updatedProduct }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body: updatedProduct,
            }),
            invalidatesTags: ['Product'],
        }),

    })
})
export const { useRegisterMutation, useLoginMutation,useUpdateProductMutation } = authApiSlice