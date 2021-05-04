import { useState } from 'react'
import { Session, User, Provider } from '@supabase/supabase-js'
import { Link, routes, navigate } from '@redwoodjs/router'

import { useAuth } from '@redwoodjs/auth'
import { Toaster, toast } from '@redwoodjs/web/toast'

const Auth: React.FunctionComponent = ({ showSignUp = false }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { logIn, signUp, isAuthenticated } = useAuth()

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Toaster />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to={routes.home()}>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
        </Link>

        <div>
          {showSignUp ? (
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create an account
            </h2>
          ) : (
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          )}
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            {showSignUp ? (
              <Link
                to={routes.logIn()}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already have an account?
              </Link>
            ) : (
              <Link
                to={routes.signUp()}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Create a new account!
              </Link>
            )}
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
          <div className="mt-2">
            {!showSignUp ? (
              <button
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={
                  (!email.length || !password.length) && !isAuthenticated
                }
                onClick={async () => {
                  if (email.length) {
                    try {
                      toast.loading('Logging in...')

                      const response = (await logIn({
                        email,
                        password,
                      })) as void | Promise<{
                        session: Session | null
                        user: User | null
                        provider?: Provider
                        url?: string | null
                        error: Error | null
                        data: Session | null // Deprecated
                      }>

                      if (response && response['error']) {
                        throw new Error(response['error'].message)
                      }

                      toast.dismiss()
                      resetForm()
                      navigate(routes.home())
                    } catch (e) {
                      toast.dismiss()
                      toast.error(e.message)
                    }
                  }
                }}
              >
                {isAuthenticated ? 'Log Out' : 'Log In'}
              </button>
            ) : (
              !isAuthenticated && (
                <button
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={
                    (!email.length || !password.length) && !isAuthenticated
                  }
                  onClick={async () => {
                    if (!isAuthenticated && email.length && password.length) {
                      try {
                        toast.loading('Signing up...')

                        const response = (await signUp({
                          email,
                          password,
                        })) as void | Promise<{
                          user: User | null
                          session: Session | null
                          error: Error | null
                          data: Session | User | null // Deprecated
                        }>

                        if (response && response['error']) {
                          throw new Error(response['error'].message)
                        }

                        toast.dismiss()
                        resetForm()
                        navigate(routes.home())
                      } catch (e) {
                        toast.dismiss()
                        toast.error(e.message)
                      }
                    }
                  }}
                >
                  Sign Up
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
