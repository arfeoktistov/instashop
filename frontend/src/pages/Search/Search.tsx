import { Axios } from 'axios';
import React, { useEffect, useState } from 'react';

interface ImagesObj {
	blobUrl: string
	file: File
}

const App = () => {
	// Стэйт для хранения файлов и пребразованных картинок в локальный url
	const [files, setFiles] = useState<ImagesObj[]>([])
	// Стэйт для записи и отрисовки локальных ссылок на картинки
	const [previewImg, setPreviewImg] = useState<string[]>([])
	// Стэйт для хранения всех картинок в типе файл , для отправки на сервер
	const [filesReq, setFilesReq] = useState<File[]>([])

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

	// const handleSend = () => {
	// 	Axios.patch(`http://45.90.35.207:8080/api/products/products/${25}/`, {
	// 		"name": "RATATA",
	// 		"description": "ifhdh dbvugdfg dvfgbud",
	// 		"price": "200000.00",
	// 		"sub_category": {
	// 			"name": "Футболки"
	// 		},
	// 		seller: 9,
	// 		image: filesReq[0],
	// 		images: filesReq.slice(1)
	// 	}, {
	// 		headers: {
	// 			"Content-Type": "multipart/form-data"
	// 		}
	// 	})
	// }

	return (
		<div>
			<input onChange={onSelectImage} type="file" multiple accept='image/*' />
			{previewImg.map((url, i) => <img width={100} height={100} key={i} src={url} />)}
		</div>
	);
};

export default App;