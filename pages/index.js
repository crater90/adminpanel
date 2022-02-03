import Head from 'next/head'
import Banner from '../components/Banner';
import { signIn, signOut, useSession } from 'next-auth/react';
import Login from '../components/Login';

export default function Home() {
  const {data: session} = useSession();
 if(!session){
   return <Login/>
 }
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
                  1
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

//  export async function getServerSideProps(ctx) {
//    const session = await getSession(ctx)
//    if (!session) {
//      return {
//       redirect: {
//       destination: 'api/auth/signin', //redirect user to homepage
//       permanent: false,
//       }
//      }
//     }
//    return {
//      props: {
//        user: session.user,
//      },
//    }
//  }