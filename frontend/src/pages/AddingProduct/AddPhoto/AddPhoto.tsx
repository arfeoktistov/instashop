import React, { ChangeEventHandler, FC, useEffect, useRef, useState } from 'react'
import s from './AddPhoto.module.scss'
import camera from '../../../assets/PersonalProfile/camera.png'
interface ImagesObj {
	blobUrl: string
	file: File
}
interface AddPhotoProps {
	setFilesReq: (e: File[]) => void
	setErrorText: (e: string) => void
	setPreviewImg: (e: string[]) => void
	previewImg: string[]
	errorText: string
	setFiles: (e: ImagesObj[]) => void
	files: ImagesObj[]
	deleteImg: (url: string) => void
}

const AddPhoto: FC<AddPhotoProps> = ({ deleteImg, setFilesReq, errorText, setErrorText, previewImg, setPreviewImg, files, setFiles }) => {
	const filePickerLeft = useRef<HTMLInputElement>(null)

	// Функция принимающая все картинки от пользователя и записывающая 
	// в состояния картинки
	const onSelectImage = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		// Хранилище всех картинок но с обрезкой не более 6 штук
		if (e.target.files) {
			if (e.target.files.length > 1 && e.target.files.length < 7) {

				const files = Array.from(e.target.files || []).slice(0, 6);
				// Тут записываем и сами файлы и ссылку blob(локальную)
				setFiles(files.map((file) => ({
					file,
					blobUrl: URL.createObjectURL(new Blob([file]))
				})));
				// Тут записываем сами файли в стэйт для отправки
				setFilesReq([...files])
				setErrorText('')
			} else {
				setErrorText('Картинки должны быть от 2 до 6')
			}
		}
	}, [])

	useEffect(() => {
		// отслеживаем изменения массива с файлами и записываем локальные ссылки (blob)
		setPreviewImg([...files].map(file => file.blobUrl))
	}, [files])

	const handlePickLeft = () => {
		if (filePickerLeft.current) {
			filePickerLeft.current.focus()
			filePickerLeft.current.click()
		}
	}

	return (
		<div className={s.AddPhoto}>
			<div onClick={handlePickLeft} className={errorText.includes('Картинки должны быть от 2 до 6') ? `${s.error_text} ${s.add_photo}` : s.add_photo}>
				<img src={camera} alt='camera' />
				<p>Добавить фото</p>
				<input ref={filePickerLeft} onChange={onSelectImage} className={s.hidden} type='file' multiple accept='image/*' />
			</div>
			{previewImg.map((url, i) => <div key={i} className={s.images_download} onClick={() => deleteImg(url)}><img src={url} /></div>)}
		</div>
	)
}

export default AddPhoto
