export type IObjectKeys = {
	[key: string]: string | null | undefined
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
