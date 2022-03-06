export interface ProjectObject {
	id: string,
	title: string,
	color: string,
	featured_image?: string,
	abstract?: string,
	description?: string,
	article?: Array<{
		text: string
	}>
}
