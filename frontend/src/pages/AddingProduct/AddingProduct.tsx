import React, { FC, FormEventHandler, useEffect, useState } from 'react'
import s from './AddingProduct.module.scss'
import AddPhoto from './AddPhoto/AddPhoto'
import AddProductForm from './AddProductForm/AddProductForm'
import { IAddProductsCard } from '../../store/modules'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { fetchByAddNewCard, fetchByChangeCard, fetchByGetDetailCard } from '../../store/slice/addProductSlice'
import Loading from '../../Component/Loading/Loading'
import { useSearchParams } from 'react-router-dom'
import SuccessfullRequest from './SuccessfullRequest/SuccessfullRequest'
import { Helmet } from 'react-helmet-async'
interface ImagesObj {
	blobUrl: string
	file: File
}
const AddingProduct: FC = () => {
	const dispatch = useAppDispatch()
	const { token, user } = useAppSelector(state => state.user)
	const { loading, error, reboot, detail_card } = useAppSelector(state => state.addProductSlice)
	const [previewImg, setPreviewImg] = useState<string[]>([])
	const [files, setFiles] = useState<ImagesObj[]>([])
	const [filesReq, setFilesReq] = useState<File[]>([])
	const [errorText, setErrorText] = useState('')
	const [categories, setCategories] = useState('')
	const [searchParams] = useSearchParams()
	const [query] = useState(searchParams.get('id_card'))

	const [productCard, setProductCard] = useState<IAddProductsCard>({
		name: '',
		description: '',
		price: '',
		sub_category: '',
		image: '',
		images: [],
	})

	if (errorText.includes('Картинки должны быть от 2 до 6')) {
		(filesReq.length > 2 && filesReq.length < 6) && setErrorText('')
	} else if (errorText.includes('Введите название!')) {
		productCard.name && setErrorText('')
	} else if (errorText.includes('Введите описание!')) {
		productCard.description && setErrorText('')
	} else if (errorText.includes('Введите стоимость!')) {
		productCard.price && setErrorText('')
	} else if (errorText.includes('Стоимость должен быть менее 9999999999сом!')) {
		+productCard.price < 9999999999 && setErrorText('')
	} else if (errorText.includes('Введите подкатегорию!')) {
		productCard.sub_category && setErrorText('')
	}

	const handleAddProduct: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault()
		if (productCard.name && productCard.description && productCard.price && +productCard.price < 9999999999 && productCard.sub_category && query && token && user) {
			const formData = new FormData()
			formData.append('name', `${productCard.name}`);
			formData.append('description', `${productCard.description}`);
			formData.append('price', `${productCard.price}`);
			formData.append('seller_id', `${user?.id}`);
			formData.append('sub_category', `${productCard.sub_category}`);
			// Добавление основного изображения  
			if (filesReq.length >= 2 && filesReq.length <= 6) {
				formData.append('image', filesReq[0]);
				// Добавление списка изображений 
				const newArr = filesReq.slice(1)
				for (let file of newArr) {
					formData.append('images', file);
				}
			}
			dispatch(fetchByChangeCard({ id: +query, token, productCard: formData }))
		} else if (productCard.name && productCard.description && (productCard.price && +productCard.price < 9999999999) && productCard.sub_category && (filesReq.length >= 2 && filesReq.length <= 6) && token && user) {
			const formData = new FormData()
			formData.append('name', `${productCard.name}`);
			formData.append('description', `${productCard.description}`);
			formData.append('price', `${productCard.price}`);
			formData.append('seller_id', `${user?.id}`);
			formData.append('sub_category', `${productCard.sub_category}`);
			// Добавление основного изображения  
			formData.append('image', filesReq[0]);
			// Добавление списка изображений 
			const newArr = filesReq.slice(1)
			for (let file of newArr) {
				formData.append('images', file);
			}
			dispatch(fetchByAddNewCard({ token, productCard: formData }))
		} else if (!query && filesReq.length < 2) {
			setErrorText('Количество картинок от 2 до 6')
		} else if (!productCard.name) {
			setErrorText('Введите название!')
		} else if (!productCard.description) {
			setErrorText('Введите описание!')
		} else if (!productCard.price) {
			setErrorText('Введите стоимость!')
		} else if (!productCard.price && +productCard.price > 9999999999) {
			setErrorText('Стоимость должен быть менее 9999999999сом!')
		} else if (!productCard.sub_category) {
			setErrorText('Введите подкатегорию!')
		}
	}

	const deleteImg = (url: string) => {
		setFiles(files.filter(item => item.blobUrl !== url))
		for (let file of files) {
			setFilesReq([...filesReq.filter(el => el !== file.file)]);
		}
	}

	useEffect(() => {
		if (query) {
			dispatch(fetchByGetDetailCard(+query))
		}
	}, [query])

	useEffect(() => {
		if (detail_card && query) {
			setProductCard({ ...productCard, name: detail_card.name, description: detail_card.description, price: `${Math.ceil(+detail_card.price)}`, sub_category: `${detail_card.sub_category}` })
			setCategories(detail_card.category_name)
		}
	}, [detail_card])

	useEffect(() => {
		if (reboot) {
			setFilesReq([])
			setFiles([])
			setCategories('')
			setPreviewImg([])
			setProductCard({ name: '', description: '', price: '', sub_category: '', image: '', images: [], })
		}
	}, [reboot])

	return (
		<div className={s.AddingProduct}>
			<Helmet>
				<title>Добавление/Изменение товара</title>
			</Helmet>
			<h2>Заполните данные для добавления товара</h2>
			<AddPhoto deleteImg={deleteImg} setFiles={setFiles} files={files} previewImg={previewImg} setPreviewImg={setPreviewImg} setErrorText={setErrorText} errorText={errorText} setFilesReq={setFilesReq} />
			<AddProductForm categories={categories} setCategories={setCategories} query={query} errorText={errorText} productCard={productCard} setProductCard={setProductCard} handleAddProduct={handleAddProduct} />
			{loading && <Loading />}
			{(reboot || error?.includes('Упс что-то пошло не так!')) && < SuccessfullRequest id={query} text={`Карточка успешно создана`} />}
			{(reboot || error?.includes('Упс что-то пошло не так!')) && query && < SuccessfullRequest id={query} text={`Карточка успешно изменена`} />}
		</div>
	)
}

export default AddingProduct
