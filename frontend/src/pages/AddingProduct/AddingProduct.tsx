import React, { FC, FormEventHandler, useEffect, useState } from 'react'
import s from './AddingProduct.module.scss'
import AddPhoto from './AddPhoto/AddPhoto'
import AddProductForm from './AddProductForm/AddProductForm'
import { IAddProductsCard } from '../../store/modules'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { fetchByAddNewCard } from '../../store/slice/addProductSlice'
import axios from 'axios'
import Loading from '../../Component/Loading/Loading'
import { useSearchParams } from 'react-router-dom'

const AddingProduct: FC = () => {
	const dispatch = useAppDispatch()
	const { loading, error, profileCard } = useAppSelector(state => state.addProductSlice)
	const [filesReq, setFilesReq] = useState<File[]>([])
	const [errorText, setErrorText] = useState('')

	const [searchParams] = useSearchParams()
	const [query] = useState(searchParams.get('id_card'))
	console.log(query);


	const [productCard, setProductCard] = useState<IAddProductsCard>({
		name: '',
		description: '',
		price: '',
		sub_category: {
			name: '',
		},
		seller: 3,
		image: '',
		images: [],
	})
	useEffect(() => {
		if (query) {
			profileCard.filter((el) => el.id === +query && setProductCard({ ...productCard, name: el.name, description: el.description, price: el.price, seller: el.seller, image: el.image, sub_category: { ...productCard.sub_category, name: el.sub_category.name } }))
		}
	}, [query])

	if (errorText.includes('Добавьте фото!')) {
		filesReq.length > 0 && setErrorText('')
	} else if (errorText.includes('Введите название!')) {
		productCard.name && setErrorText('')
	} else if (errorText.includes('Введите описание!')) {
		productCard.description && setErrorText('')
	} else if (errorText.includes('Введите стоимость!')) {
		productCard.price && setErrorText('')
	} else if (errorText.includes('Введите подкатегорию!')) {
		productCard.sub_category.name && setErrorText('')
	}

	const handleAddProduct: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault()
		console.log({ ...productCard, image: filesReq[0], images: filesReq });
		if (productCard.name && productCard.description && productCard.price && productCard.sub_category.name && productCard.seller && filesReq.length > 0) {
			dispatch(fetchByAddNewCard({ ...productCard, image: filesReq[0], images: filesReq }))
		} else if (filesReq.length === 0) {
			setErrorText('Добавьте фото!')
		} else if (!productCard.name) {
			setErrorText('Введите название!')
		} else if (!productCard.description) {
			setErrorText('Введите описание!')
		} else if (!productCard.price) {
			setErrorText('Введите стоимость!')
		} else if (!productCard.sub_category.name) {
			setErrorText('Введите подкатегорию!')
		}
	}
	// console.log(filesReq);
	// const handleSend = () => {
	// 	axios.post(`http://agregagator.gagaga.kg:8080/api/products/products/`, {
	// 		"name": "RATATA",
	// 		"description": "ifhdh dbvugdfg dvfgbud",
	// 		"price": "200000.00",
	// 		"sub_category": {
	// 			"name": "Футболки"
	// 		},
	// 		"seller": 1,
	// 		"image": filesReq[0],
	// 		"images": filesReq,
	// 		"category": 'Женская',
	// 	}, {
	// 		headers: {
	// 			"Content-Type": "multipart/form-data"
	// 		}
	// 	})
	// }
	if (loading) {
		// return <Loading />
	}
	return (
		<div className={s.AddingProduct}>
			<h2>Заполните данные для добавления товара</h2>
			<AddPhoto errorText={errorText} setFilesReq={setFilesReq} />
			<AddProductForm query={query} errorText={errorText} productCard={productCard} setProductCard={setProductCard} handleAddProduct={handleAddProduct} />
			{/* <button onClick={handleSend}>sdf</button> */}
			{loading && <Loading />}
		</div>
	)
}

export default AddingProduct
