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

export type ISellerUser = {
	[key: string]: string | number | File | undefined | null
	background_image: string | File | null
	id?: number
	insta_image: string | File | null
	instagram_link: string
	main_image: string | File | null
	mini_description: string
	product_count: number | string
	shop_name: string
	user: number | string
	followers: string
	whatsapp_number: string
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
	product_count: number
	instagram_link: string
	background_image: string
	whatsapp_number: string
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
	instagram_link: string
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

export type IShopSellerUser = {
	user: string | number
	shop_name: string
	mini_description: string
	instagram_link: string
	product_count: string | number
	followers: string
	main_image?: File | string | null
	background_image?: string | File | null
	insta_image?: string | File | null
}

export type IIdTokenShopUser = {
	id: number
	token: string
	seller_user: IShopSellerUser
}

export type IInfoData = {
	id: number
	phone_number: string
	instagram_link: string
}

export type FeedbackData = {
	name: string
	phone_number: string
	instagram_link: string
	application_text: string
}
