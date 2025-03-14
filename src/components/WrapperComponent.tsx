import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';

// Lazy load components
const UsersComponent = lazy(() => import('./dynamic/UsersComponent'));
const PostsComponent = lazy(() => import('./dynamic/PostsComponent'));

const queryClient = new QueryClient();

interface WrapperComponentProps {
  componentType: string;
}

const componentMap = {
  users: UsersComponent,
  posts: PostsComponent,
};

export default function WrapperComponent({ componentType }: WrapperComponentProps) {
  const DynamicComponent = componentMap[componentType as keyof typeof componentMap] || UsersComponent;

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="p-4">Loading component...</div>}>
        <DynamicComponent />
      </Suspense>
    </QueryClientProvider>
  );
}