
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';


 async function AdminLayout ({children}) {
  const session = await auth.api.getSession({
      headers: await headers(),
    });
    const User = session?.user;
    if(User?.role !== 'Admin'){
      redirect('/unauthorized')
    }
  return children 
}

export default AdminLayout 