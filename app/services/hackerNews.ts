import type { ResponseInterceptor } from '~/config/request'
import request from '~/config/request'
import { hackerNewsApiUrl } from '~/config/urls'

export type TopStories = string[]

export const getTopStoriesUrl = `${hackerNewsApiUrl}/topstories.json`

export const getTopStories = async () =>
  request.get<unknown, ResponseInterceptor<TopStories>>(getTopStoriesUrl)

export interface Story {
  id: string
  title: string
  url: string
  time: number
}

export const getStoryUrl = (id: string) => `${hackerNewsApiUrl}/item/${id}.json`

export const getStory = async (id: string) =>
  request.get<unknown, ResponseInterceptor<Story>>(getStoryUrl(id))
