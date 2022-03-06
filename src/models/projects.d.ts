export interface ProjectObject {
	id: string,
	title: string,
	color: string,
	featured_image?: string,
	abstract?: string,
	article?: Array<{
		text: string
	}>
}
