import Head from 'next/head'
import Banner from '../components/Banner';
import { signIn, signOut, getSession } from 'next-auth/react';

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Bannner */}
            <Banner/>
              <div className="grid grid-cols-3 gap-6">
                <div className= "bg-gray-500 p-2">
                  <button onClick={signOut} className='btn'>click to signout</button>
                </div>
                <div className= "bg-gray-500 p-2">
                  2
                </div>
                <div className= "bg-gray-500 p-2">
                  3
                </div>
              </div>          
          </div>
        </main>
      {/* </div> */}
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  if (!session) {
    return {
     redirect: {
     destination: 'api/auth/signin', //redirect user to homepage
     permanent: false,
     }
    }
   }
  return {
    props: {
      user: session.user,
    },
  }
}