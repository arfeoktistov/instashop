import React, { ChangeEventHandler, FC, useEffect, useRef, useState } from 'react'
import s from './AddPhoto.module.scss'
import camera from '../../../assets/PersonalProfile/camera.png'
interface AddPhotoProps {
	setFilesReq: (e: File[]) => void
	errorText: string
}
interface ImagesObj {
	blobUrl: string
	file: File
}
const AddPhoto: FC<AddPhotoProps> = ({ setFilesReq, errorText }) => {
	const filePickerLeft = useRef<HTMLInputElement>(null)
	// Стэйт для хранения файлов и пребразованных картинок в локальный url
	const [files, setFiles] = useState<ImagesObj[]>([])
	// Стэйт для записи и отрисовки локальных ссылок на картинки
	const [previewImg, setPreviewImg] = useState<string[]>([])
	// Стэйт для хранения всех картинок в типе файл , для отправки на сервер

	// Функция принимающая все картинки от пользователя и записывающая 
	// в состояния картинки
	const onSelectImage = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		// Хранилище всех картинок но с обрезкой не более 6 штук
		const files = Array.from(e.target.files || []).slice(0, 6);

		// Тут записываем и сами файлы и ссылку blob(локальную)
		setFiles(files.map((file) => ({
			file,
			blobUrl: URL.createObjectURL(new Blob([file]))
		})));
		// Тут записываем сами файли в стэйт для отправки
		setFilesReq([...files])
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
			<div onClick={handlePickLeft} className={errorText.includes('Добавьте фото!') ? `${s.error_text} ${s.add_photo}` : s.add_photo}>
				<img src={camera} alt='camera' />
				<p>Добавить фото</p>
				<input ref={filePickerLeft} onChange={onSelectImage} className={s.hidden} type='file' multiple accept='image/*' />
			</div>
			{previewImg.map((url, i) => <img width={100} height={100} key={i} src={url} />)}
		</div>
	)
}

export default AddPhoto
