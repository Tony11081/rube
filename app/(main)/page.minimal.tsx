export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Digital Store
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Premium digital resources and templates
        </p>
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="font-semibold text-green-800">🚀 Deployment Successful!</h2>
            <p className="text-green-600">Your digital store is now live</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const revalidate = 300