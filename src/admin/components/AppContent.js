import { CContainer } from '@coreui/react'
import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

// routes config
import Loader from 'components/Loader'
import { useSelector } from 'react-redux'
import routes from '../routes'

const AppContent = () => {
  const { data } = useSelector((state) => state.auth)
  const filteredRoutes = routes.filter((route) => route.role.includes(data?.role))
  return (
    <CContainer lg>
      <Suspense fallback={<Loader />}>
        <Switch>
          {filteredRoutes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              )
            )
          })}
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
