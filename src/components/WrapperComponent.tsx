import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { lazy, Suspense } from 'react'

// Lazy load components
const UsersComponent = lazy(() => import('@/components/dynamic/UsersComponent'))
const PostsComponent = lazy(() => import('@/components/dynamic/PostsComponent'))
const TestComponent = lazy(() => import('@/components/dynamic/TestComponent'))

const queryClient = new QueryClient()

interface WrapperComponentProps {
  componentType: string
  useQueryString?: boolean
  additionalProps?: Record<string, any>
}

const componentMap = {
  users: UsersComponent,
  posts: PostsComponent,
  test: TestComponent,
}

export default function WrapperComponent({
  componentType,
  useQueryString = true,
  additionalProps = {},
}: WrapperComponentProps) {
  const DynamicComponent =
    componentMap[componentType as keyof typeof componentMap] || UsersComponent

  // Renderizza il componente in base al flag useQueryString
  const renderComponent = () => {
    if (useQueryString) {
      return (
        <QueryClientProvider client={queryClient}>
          <DynamicComponent {...additionalProps} />
        </QueryClientProvider>
      )
    } else {
      return <DynamicComponent {...additionalProps} />
    }
  }

  return (
    <Suspense fallback={<div className="p-4">Loading component...</div>}>
      {renderComponent()}
    </Suspense>
  )
}
