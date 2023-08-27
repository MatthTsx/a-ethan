import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Loading from '~/layout/components/utils/Loading'
import Header from '~/layout/layout/Header'
import GeralLayout from '~/layout/layout/geralLayout'
import { api } from '~/utils/api'
import sleep from '~/utils/scripts/sleep'

function User() {
    const session = useSession()
    const id = useRouter().asPath.replace("/profile/","")
    const user = api.profile.getProfile.useQuery({id})
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
      if(user.status == "loading" || !loading) return
      // setLoading(false)
      sleep(750).then(() => setLoading(false))
    }, [user])

  return (
    <>
        <Header name='p'/>
        <GeralLayout session={session.data!}>
            <div className='bg-black rounded-md w-full h-full p-4'>
              <Main/>
            </div>
        </GeralLayout>
    </>
  )

  function Main() {
    return (
      <div className='w-full flex h-full gap-4'>
        <div className='w-[30%] h-full rounded-md flex-shrink-0 gap-2 flex flex-col'>

          {loading ?
          <Loading width='100%' height='9rem' type={1}/>
          :<div className='flex w-full h-36 p-2 gap-4 rounded-md scale-[0.975] opacity-70
          hover:scale-100 hover:opacity-100 transition-all items-center
          bg-gradient-to-tr from-neutral-900/60 to-neutral-900'>
            <Image width={75} height={75} src={user.data?.image!} alt='profile'
            className='w-24 h-24 object-contain rounded-xl'/>
            <p className='font-semibold text-xl'>{user.data?.name!}</p>
          </div>
          }

          {loading ? 
          <Loading height='100%' width='100%' type={2}/>
          :
          <div className='flex w-full h-full p-2 gap-4 rounded-md scale-[0.975] opacity-70
          hover:scale-100 hover:opacity-100 transition-all
          bg-gradient-to-tr from-neutral-900/60 to-neutral-900'
          >
            <Image width={75} height={75} src={user.data?.image!} alt='profile'
            className='w-24 h-24 object-contain rounded-xl'/>
            <p className='text-black'>AAdjawjd</p>
          </div>
          }
        </div>

        <div className='w-full h-full bg-blue-500'>
          User
        </div>
      </div>
    )
  }

}


export default User