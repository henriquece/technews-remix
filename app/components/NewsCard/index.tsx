import type { FC } from 'react'
import { useEffect, useState } from 'react'
import type { Story } from '~/services/hackerNews'
import { getSiteHtml } from '~/services/scrape'
import { formatDate } from '~/utils/formatDate'
import { getStorySource } from '~/utils/getStorySource'
import styles from './styles.module.css'

type StoryWithVisibility = Story & { isVisible: boolean }

interface NewsCardProps {
  story: StoryWithVisibility
}

export const links = () => [{ rel: 'stylesheet', href: styles }]

export const NewsCard: FC<NewsCardProps> = ({ story }) => {
  const [loading, setLoading] = useState(true)
  const [imageSrc, setImageSrc] = useState('/no-image.jpeg')

  useEffect(() => {
    const getOgImage = async () => {
      const { data, success } = await getSiteHtml(story.url)

      if (success) {
        const html = new DOMParser().parseFromString(data, 'text/html')

        const ogImageTag: HTMLMetaElement | null = html.querySelector(
          'meta[property="og:image"]'
        )

        const ogImage = ogImageTag?.content

        if (ogImage && ogImage.startsWith('https')) {
          setImageSrc(ogImage)
        }
      }
      setLoading(false)
    }

    getOgImage()
  })

  return (
    <a
      className={`${styles.a} ${!story.isVisible ? styles['not-visible'] : ''}`}
      href={story.url}
      target="_blank"
      rel="noreferrer"
    >
      <article className={styles.article}>
        <h3 className={styles.h3} title={story.title}>
          {story.title}
        </h3>
        <div className={styles['time-and-source']}>
          <time>{formatDate(story.time)}</time>
          <span className={styles['time-and-source-separator']}>•</span>
          <span>{story.url ? getStorySource(story.url) : 'no source'}</span>
        </div>
        <div className={styles['image-wrapper']}>
          {loading ? (
            <div className={styles.skeleton} />
          ) : (
            <img className={styles.img} src={imageSrc} alt={story.title} />
          )}
        </div>
      </article>
    </a>
  )
}
