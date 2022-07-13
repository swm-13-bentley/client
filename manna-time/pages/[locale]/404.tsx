import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'

import Link from '../../components/Link'
import { NextPage } from 'next'

const Homepage: NextPage = function() {
  const { t } = useTranslation(['404', 'common', 'footer'])

  return (
    <>
      <h1>404 | 존재하지 않는 페이지 입니다</h1>
    </>
  )
}

export default Homepage

const getStaticProps = makeStaticProps(['404', 'common', 'footer'])
export { getStaticPaths, getStaticProps }
