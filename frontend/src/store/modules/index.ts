export type IObjectKeys = {
	[key: string]: string | null | undefined
}

export type UserLogin = {
	email: string
	password: string
}

export type GetToken = {
	access: string
	refresh: string
}

type ISellerUser = {
	background_image: string
	id: number
	insta_image: string
	instagram_link: string
	main_image: string
	mini_description: string
	product: number
	shop_name: string
	user: number
}

export type TokenNodules = {
	email: string
	first_name: string
	id: number
	last_name: string
	seller_user: null | ISellerUser
}

export type DetailProfile = {
	id: number
	insta_image: string
	main_image: null
	mini_description: string
	shop_name: string
	user: number
	followers: number
	product: number
	instagram_link: string
	background_image: string
}
export type ImagesMas = {
	image: string
}
export type ProfileCardModules = {
	id: number
	name: string
	description: string
	seller: number
	price: string
	image: string
	images: ImagesMas[]
	sub_category: number
	sub_category_name: string
	category_name: string
}

export type IStores = {
	id: number
	user: number
	shop_name: string
	main_image: string | null
	insta_image: string
	mini_description: string

}

export type ISubCategory = {
	id: number
	name: string
}

export type ICategory = {
	id: number
	name: string
	sub_categories: ISubCategory[]
}

export type IProductsCat = {
	id: string
	cat_id: string
	sub_id: string
}


export type IAddProductsCard = {
	name: string,
	description: string,
	price: string,
	sub_category: string
	image: File | string
	images: File[]
}

export type IForAddProduct = {
	productCard: FormData
	token: string
}

export type IForChangeProduct = {
	productCard: FormData
	token: string
	id: number
}

export type IIdToken = {
	id: number
	token: string
}