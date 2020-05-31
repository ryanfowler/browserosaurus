import cc from 'classcat'
import React, { useCallback } from 'react'
import { useRecoilValue } from 'recoil'

import { browsersAtom, favBrowserIdAtom } from '../atoms'
import { setFav } from '../sendToMain'

const TheMenu: React.FC = () => {
  const browsers = useRecoilValue(browsersAtom)
  const favBrowserId = useRecoilValue(favBrowserIdAtom)

  const handleFavChange = useCallback((event) => {
    setFav(event.target.value)
  }, [])

  return (
    <div
      className="absolute top-0 left-0 right-0 p-1"
      style={{ bottom: '-16px' }}
    >
      <div className="w-full h-full bg-grey-800 rounded overflow-y-auto overflow-x-hidden border border-grey-300 shadow-xl">
        <div className="p-4 grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-grey-500 mb-2 font-semibold">Favourite</h2>
            <div className="font-bold text-sm">
              {browsers.map((browser, i) => {
                const isStriped = Boolean((i + 1) % 2)
                return (
                  <label
                    key={browser.id}
                    className={cc([
                      'block py-2 px-3 space-x-2 rounded',
                      { 'bg-grey-700': isStriped },
                    ])}
                  >
                    <input
                      checked={favBrowserId === browser.id}
                      name="browser-fav"
                      onChange={handleFavChange}
                      type="radio"
                      value={browser.id}
                    />
                    <span>{browser.name}</span>
                  </label>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TheMenu
