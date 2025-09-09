import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Cart from './_componenet/Cart'

export default async function Page() {
  const session = await getServerSession(authOptions)

  // ✅ حماية الصفحة
  if (!session) {
    redirect('/auth/login')
  }

  return (
    <>
      <Cart />
    </>
  )
}
