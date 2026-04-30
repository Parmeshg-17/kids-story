import { useReadingProgress } from '../hooks/useReadingProgress'

export default function ReadingProgressBar() {
  const progress = useReadingProgress()
  return (
    <div
      id="reading-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  )
}
