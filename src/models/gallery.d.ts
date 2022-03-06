export interface ImageObject {
	id: string,
	title: string,
	description: string,
	width: number,
	height: number,
	color: string
}

export interface GalleryObject {
	id: number,
	title: string,
	description: description,
	subtitle: string,
	color: string,
	images: Array<{
		directus_files_id: ImageObject
	}>
}
