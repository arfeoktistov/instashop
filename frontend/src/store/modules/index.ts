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


}



export type Icategory = {
	id: number
	name: string
	category?: string
}

export type IStores = {
	id: number
	user: number
	shop_name: string
	main_image: string | null
	insta_image: string
	mini_description: string

}

type ISubCategory = {
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