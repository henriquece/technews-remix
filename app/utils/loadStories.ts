import { getStory, type TopStories } from '~/services/hackerNews'

export const pageSize = 8

export const loadStories = async (topStoriesIds: TopStories, pageValue: number) => {
	const fetchedStories = await Promise.all(
		(topStoriesIds || []).slice(pageValue, pageValue + pageSize).map((story) => getStory(story))
	)

	return fetchedStories.map((story) => {
		const storyData = story.data

		return {
			id: storyData.id,
			title: storyData.title,
			url: storyData.url,
			time: storyData.time
		}
	})
}
