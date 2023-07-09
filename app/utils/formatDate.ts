const addZeroBefore = (number: number) => `${number < 10 ? '0' : ''}${number}`

export const formatDate = (time: number) => {
	const currentTime = new Date()
	const currentDate = currentTime.getDate()
	const currentMonth = currentTime.getMonth()
	const currentYear = currentTime.getFullYear()

	const storyTime = new Date(time * 1000)
	const storyDate = storyTime.getDate()
	const storyMonth = storyTime.getMonth()
	const storyYear = storyTime.getFullYear()

	if (storyDate === currentDate && storyMonth === currentMonth && storyYear === currentYear) {
		return 'Today'
	} else {
		return `${addZeroBefore(storyMonth)}/${addZeroBefore(storyDate)}`
	}
}
