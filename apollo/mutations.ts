import { gql } from '@apollo/client'



export const CREATE_USER = gql`
	mutation CreateUser($username: String!, $password: String!) {
		createUser(username: $username, password: $password) {
			username
			id
		}
	}
`

export const LOGIN = gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`

export const UPDATE_USERNAME = gql`
	mutation UpdateUsername($newUsername: String!) {
		updateUsername(newUsername: $newUsername) {
			username
			id
		}
	}
`

export const UPDATE_PASSWORD = gql`
	mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
		updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
			username
			id

		}
	}
`

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

export const ADD_REVIEW = gql`
 mutation AddReview($body: String!, $rating: Int!, $productId: String!) {
	 addReview(body: $body, rating: $rating, productId: $productId) {
		 ...ProductDetails
	 }
 }
 ${PRODUCT_DETAILS}
`

export const MARK_AS_RECEIVED = gql`
 mutation MarkAsReceived($orderId: String!) {
	 markAsReceived(orderId: $orderId) {
		 ...OrderDetails
	 }
 }
 ${ORDER_DETAILS}
`