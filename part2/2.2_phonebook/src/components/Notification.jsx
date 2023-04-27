export default function Notification({ message, isError }) {
  if (message === null) return null

  const classString = isError ? 'notice error' : 'notice'

  return (
    <div className={classString}>
      {message}
    </div>
  )
}