'use client'
import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Menu, X, Linkedin, Github } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import useSWR from 'swr'
import { getUserInfo } from '../../../../sanity/lib/queries'
import { fetcher } from '../../../../sanity/lib/client'
import { UserInfo } from '../../../../sanity/lib/types/userInfo'
import { navItems } from '@/lib/navItems'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

function Navbar({ className }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: userInfo, isLoading: userInfoLoading } = useSWR<UserInfo>(
    getUserInfo,
    fetcher
  )

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 bg-zinc-100/30 backdrop-blur-[7px] border-b-[0.5px] border-b-zinc-50',
        className
      )}
    >
      <nav
        className='flex items-center justify-between p-6 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <Link href='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Ilhan Buhic</span>
            <h1 className='text-2xl text-zinc-950'>Ilhan Buhic</h1>
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Menu className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div className='hidden lg:flex lg:gap-x-3'>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                ' text-[15px] leading-6 text-zinc-900 hover:text-zinc-700 hover:bg-zinc-300/50 '
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end gap-2'>
          {userInfo?.githubUrl && (
            <Link target='_blank' href={userInfo?.githubUrl}>
              <Github size={25} />
            </Link>
          )}
          {userInfo?.linkedInUrl && (
            <Link target='_blank' href={userInfo.linkedInUrl}>
              <Linkedin size={25} />
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-50' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <a href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Ilhan Buhic</span>
              <h1 className='text-2xl text-zinc-950'>Ilhan Buhic</h1>
            </a>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-zinc-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <X className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-zinc-900 hover:bg-gray-50'
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

export default Navbar
