'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import logo from '../../assets/images/imgi_133_shopify-logo.png'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { CartRes } from '../cart/typescript/cart.interface'

export default function Navbar() {
  const { data: session, status } = useSession()

  const { data } = useQuery<CartRes>({
    queryKey: ['cart'],
    enabled: status === 'authenticated',
    queryFn: async () => {
      const res = await fetch('/api/cart', { cache: 'no-store' })
      if (!res.ok) return { numOfCartItems: 0 }
      return res.json()
    },
  })

  const [isOpen, setOpen] = useState(false)

  const links = [{ path: '/product', element: 'product' }]

  const auths = [
    { path: '/auth/login', element: 'login' },
    { path: '/auth/register', element: 'register' },
    { path: '/cart', element: 'cart' },
    { path: '/wishlist', element: 'wishlist' },
    { path: '/brands', element: 'brands' },
  ]

  function handleLogOut() {
    signOut({ callbackUrl: '/' })
  }

  // 🎨 كلاس مشترك للينكات
  const navLinkClass =
    'block py-2 px-3 text-gray-500 rounded-sm md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500'

  return (
    <div>
      <nav className="bg-light w-full border-gray-200 mb-4 dark:bg-gray-900">
        <div className="flex flex-wrap md:flex-nowrap gap-5 items-center justify-between mx-auto p-4">
          {/* اللوجو + لينكات الديسكتوب */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <Image className="h-8 w-auto" src={logo} alt="logo" width={40} height={40} />
              <span className="text-black self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Shopify
              </span>
            </Link>

            {/* لينك Product على الديسكتوب */}
            <ul className="hidden md:flex font-medium flex-row gap-5">
              {links.map(link => (
                <li key={link.path}>
                  <Link href={link.path} className={navLinkClass}>
                    {link.element.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* زرار الموبايل */}
          <button
            onClick={() => setOpen(o => !o)}
            type="button"
            className="md:hidden inline-flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* الجزء اليمين (ديسكتوب) */}
          <ul className="hidden md:flex font-medium flex-row gap-5">
            {status === 'unauthenticated' ? (
              <>
                {auths.map(link => (
                  <li key={link.path}>
                    <Link href={link.path} className={navLinkClass}>
                      {link.element.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </>
            ) : (
              <>
                <li>
                  <Link href={`/cart`} className={navLinkClass}>
                    Cart <i className="fa-solid fa-cart-shopping" /> {data?.numOfCartItems ?? 0}
                  </Link>
                </li>

                <li>
                  <Link href="/wishlist" className={navLinkClass}>
                    WISHLIST
                  </Link>
                </li>

                <li className="cursor-pointer" onClick={handleLogOut}>
                  <span className={navLinkClass}>Log Out</span>
                </li>
                <li className={navLinkClass}>Hi {session?.user?.name}</li>
                {session?.user?.image && (
                  <li>
                    <Image className="size-[20px] rounded-full" src={session?.user?.image} alt="image" />
                  </li>
                )}
              </>
            )}
          </ul>

          {/* منيو الموبايل */}
          <div id="mobile-menu" className={`${isOpen ? 'block' : 'hidden'} basis-full md:hidden`}>
            <ul className="mt-3 border-t pt-3 flex flex-col gap-3">
              {links.map(link => (
                <li key={link.path}>
                  <Link href={link.path} className={navLinkClass} onClick={() => setOpen(false)}>
                    {link.element.toUpperCase()}
                  </Link>
                </li>
              ))}

              {status === 'unauthenticated' ? (
                <>
                  {auths.map(link => (
                    <li key={link.path}>
                      <Link href={link.path} className={navLinkClass} onClick={() => setOpen(false)}>
                        {link.element.toUpperCase()}
                      </Link>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  <li>
                    <Link href={`/cart`} className={navLinkClass} onClick={() => setOpen(false)}>
                      Cart <i className="fa-solid fa-cart-shopping" /> {data?.numOfCartItems ?? 0}
                    </Link>
                  </li>

                  <li>
                    <Link href="/wishlist" className={navLinkClass} onClick={() => setOpen(false)}>
                      WISHLIST
                    </Link>
                  </li>

                  <li>
                    <button className={navLinkClass} onClick={handleLogOut}>
                      Log Out
                    </button>
                  </li>
                  <li className={navLinkClass}>Hi {session?.user?.name}</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
