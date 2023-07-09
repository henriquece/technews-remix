import type { FC } from 'react'
import { useState } from 'react'
import styles from './styles.module.css'
import type { Story } from '~/services/hackerNews'
import {
  TextField,
  links as textFieldLinks
} from '~/components/commons/TextField'
import { Button, links as buttonLinks } from '~/components/commons/Button'
import { NewsCard, links as newsCardLinks } from '~/components/NewsCard'

interface MainProps {
  stories: Story[]
  isLoadingMoreStories: boolean
  loadMoreStories: () => void
}

export const links = () => [
  { rel: 'stylesheet', href: styles },
  ...textFieldLinks(),
  ...newsCardLinks(),
  ...buttonLinks()
]

export const Main: FC<MainProps> = ({
  stories,
  isLoadingMoreStories,
  loadMoreStories
}) => {
  const [filterValue, setFilterValue] = useState('')

  const storiesWithVisibility = stories.map((story) => ({
    ...story,
    isVisible: story.title.toLowerCase().includes(filterValue.toLowerCase())
  }))

  return (
    <main className={styles.main}>
      <div className={styles['filter-textfield-wrapper']}>
        <TextField
          placeholder="Filter articles"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>
      <div className={styles['news-cards']}>
        {storiesWithVisibility.map((story) => (
          <NewsCard key={story.id} story={story} />
        ))}
      </div>
      <Button
        label="Load more"
        loading={isLoadingMoreStories}
        onClick={loadMoreStories}
      />
    </main>
  )
}
