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
