import TopNavbar from '@/components/core/top-navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full flex flex-col gap-4'>
        <TopNavbar />
        {children}
    </div>
  )
}
