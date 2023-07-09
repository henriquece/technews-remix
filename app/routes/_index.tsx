import { useState } from 'react'
import type { V2_MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Header, links as headerLinks } from '~/components/Header'
import { Main, links as mainLinks } from '~/components/Main'
import { getTopStories } from '~/services/hackerNews'
import { loadStories, pageSize } from '~/utils/loadStories'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Tech News' }]
}

export const links = () => {
  return [...headerLinks(), ...mainLinks()]
}

export const loader = async () => {
  const { data: topStoriesIds } = await getTopStories()

  const initialStories = await loadStories(topStoriesIds, 0)

  return { topStoriesIds, initialStories }
}

export default function Index() {
  const { initialStories, topStoriesIds } = useLoaderData<typeof loader>()

  const [stories, setStories] = useState(initialStories)
  const [isLoadingMoreStories, setIsLoadingMoreStories] = useState(false)
  const [pageValue, setPageValue] = useState(0)

  const loadMoreStories = async () => {
    setIsLoadingMoreStories(true)

    const newStories = [...stories]

    newStories.push(...(await loadStories(topStoriesIds, pageValue + pageSize)))

    setStories(newStories)
    setPageValue((prevState) => (prevState += pageSize))
    setIsLoadingMoreStories(false)
  }

  return (
    <>
      <Header />
      <Main
        stories={stories}
        isLoadingMoreStories={isLoadingMoreStories}
        loadMoreStories={loadMoreStories}
      />
    </>
  )
}
