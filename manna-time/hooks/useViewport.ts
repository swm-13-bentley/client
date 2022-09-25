import { userAgentState } from '@/src/state/UserAgent';
import MobileDetect from 'mobile-detect';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRecoilValue } from 'recoil';

export type Viewport = 'mobile' | 'desktop';

function useViewport(): Viewport {
  const md = new MobileDetect(useRecoilValue(userAgentState));
  const isDesktop = useMediaQuery({
    query: `(min-width: 1000px)`,
  });
  const initialViewPort = md.mobile() ? `mobile` : `desktop`;

  const [viewport, setViewport] = useState<Viewport>(initialViewPort);

  useEffect(() => {
    setViewport(isDesktop ? `desktop` : `mobile`);
  }, [isDesktop]);

  return viewport;
}

export default useViewport;
