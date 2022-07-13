import React, { Component, ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Rest = {
  locale?: string
  href?: string
}

interface Props {
  children: ReactNode,
  skipLocaleHandling: boolean,
  rest: Rest
}

const LinkComponent: React.FC<Props> = function ({ children, skipLocaleHandling, ...rest }) {
  const router = useRouter()
  console.log(typeof(rest)) // 추후에 error handling할 것
  const locale = rest.locale || router.query.locale || ''

  let href = rest.href || router.asPath
  if (href.indexOf('http') === 0) skipLocaleHandling = true
  if (locale && !skipLocaleHandling) {
    href = href
      ? `/${locale}${href}`
      : router.pathname.replace('[locale]', locale)
  }

  return (
    <>
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    </>
  )
}

export default LinkComponent
