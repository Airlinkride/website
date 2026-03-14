export default function Track({ params }) {

  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold">
        Tracking Ride {params.id}
      </h1>

      <p className="mt-4">
        Your driver will arrive soon.
      </p>
    </div>
  )
}