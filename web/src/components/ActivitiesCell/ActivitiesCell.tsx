import { formatDistanceToNow } from 'date-fns'
import { toast } from '@redwoodjs/web/toast'

export const QUERY = gql`
  query ActivitiesQuery {
    activities {
      orbitId
      createdAt
      updatedAt
      orbitSyncAt
      orbitUpdatedAt
      occurredAt
      action
      key
      type
      tags
      url
      member {
        email
        name
        avatarUrl
      }
      activityType {
        name
      }
    }
  }
`

export const Loading = () => {
  toast.loading('Loading activities...')
  return <div></div>
}

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

const Feed = ({ activityItems }) => {
  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {activityItems.map((activityItem) => (
          <li key={activityItem.key} className="py-4">
            <div className="flex space-x-3">
              {activityItem.member.avatarUrl && (
                <img
                  className="h-6 w-6 rounded-full"
                  src={activityItem.member.avatarUrl}
                  alt=""
                />
              )}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">
                    {activityItem.member.name || activityItem.member.email}
                  </h3>
                  <time className="text-sm text-gray-500">
                    {formatDistanceToNow(
                      new Date(Date.parse(activityItem.createdAt)),
                      {
                        addSuffix: true,
                      }
                    )}
                  </time>
                </div>
                <p className="text-sm text-gray-500">
                  {activityItem.action} {activityItem.type}
                </p>
                <p className="text-sm text-gray-500">
                  {activityItem.tags?.map((tag) => {
                    return (
                      <span
                        key={`${activityItem.key}=${tag}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    )
                  })}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const Success = ({ activities }) => {
  toast.dismiss()
  toast.success(`Fetched ${activities?.length} activities`)

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Feed activityItems={activities} />
    </div>
  )
}
