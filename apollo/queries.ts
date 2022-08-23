import { gql } from '@apollo/client'






const PRODUCT_DETAILS = gql`
fragment ProductDetails on Product {
	label
	price
	stock
	description
	id
	rating
	category
	reviews {
		id
		rating
		text
		created
		postedBy {
			username
			id
		}
	}
}
`
export const GET_PRODUCT_BY_ID = gql`
	query GetProductById($productId: String!) {
		getProductById(productId: $productId) {
			...ProductDetails
		}
	}
	${PRODUCT_DETAILS}
`
export const ALL_PRODUCTS = gql`
query {
	allProducts {
		...ProductDetails
	}
}
${PRODUCT_DETAILS}
`

export const PRODUCT_COUNT = gql`
query {
	productCount
}
`

export const FIND_PRODUCTS = gql`
	query FindProducts($label: String!) {
		findProducts(label: $label) {
			...ProductDetails
		}
	}
	${PRODUCT_DETAILS}
`

// DONT FORGET TO WRITE TEST FOR LIMIT OPTION ON BACKEND
export const GET_BY_CATEGORY = gql`
	query GetByCategory($category: String!, $limit: YesNo) {
		getByCategory(category: $category, limit: $limit) { 
			...ProductDetails
		}
	}
	${PRODUCT_DETAILS}
`

export const ME = gql`
query {
	me {
		username
		id
	}
}
`

const ORDER_DETAILS = gql`
	fragment OrderDetails on Order {
		orderedProduct {
			...ProductDetails
		}
		quantity
		created
		address
		id
		finished
		shipped
		user {
			username
			id
		}
	}
	${PRODUCT_DETAILS}
`

export const PLACE_ORDER = gql`
	mutation PlaceOrder($orderedProductId: String!, $quantity: Int!, $address: String!) {
		placeOrder(orderedProductId: $orderedProductId, quantity: $quantity, address: $address) {
			...OrderDetails
		}
	}
	${ORDER_DETAILS}
`

export const GET_ORDERS_BY_USER = gql`
	query {
		getOrdersByUser {
			...OrderDetails
		}
	}
	${ORDER_DETAILS}
`