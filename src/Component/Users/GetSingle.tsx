// (no React hooks needed here)
import { GetSingleUser } from "../../Hooks/UserHook";
import { getUserFromToken } from "../Cart/decodeJwt";

const GetSingle = () => {
  let token: string | null = null
  const rawSession = sessionStorage.getItem('sessionData')
  if (rawSession) {
    try {
      const parsed = JSON.parse(rawSession as string)
      token = parsed?.token ?? rawSession
    } catch {
      token = rawSession
    }
  }
  if (!token) token = sessionStorage.getItem('authToken')
  const UID = getUserFromToken(token).id;
  const id = UID || 0;
  const { data: user, isLoading, isError } = GetSingleUser(id);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError) return <div className="p-4 text-red-600">Error loading user</div>;


  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">User Details</h1>
        <div className="flex items-center space-x-3">
          <label className="text-sm text-gray-600 px-2">User ID</label>
          {id}
        </div>
      </div>

      

      {user ? (
        <div className="bg-white border rounded-md shadow-sm p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-2">
              <div className="text-lg font-medium text-gray-900">{user.username}</div>
              <div className="text-sm text-gray-600">Email: {user.email}</div>
              <div className="text-sm text-gray-600">Phone: {user.phone}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">ID</div>
              <div className="text-lg font-semibold">{user.id}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-50 text-gray-600 text-center">No user found for this ID.</div>
      )}
    </div>
  );
};

export default GetSingle;
