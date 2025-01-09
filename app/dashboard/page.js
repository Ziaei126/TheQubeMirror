import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Staff Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/dashboard/term_register">
          <div className="bg-pastel-orange text-white p-6 rounded-lg text-center cursor-pointer hover:bg-blue-600">
            Term Register
          </div>
        </Link>
        <a
          href="/golden_rules.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pastel-orange text-white p-6 rounded-lg text-center cursor-pointer hover:bg-blue-600"
        >
          Golden Rules
        </a>
        {/* <Link href="/calendar">
          <div className="bg-pastel-orange text-white p-6 rounded-lg text-center cursor-pointer hover:bg-blue-600">
            Calendar
          </div>
        </Link> */}
        <Link href="/dashboard/registrations">
          <div className="bg-pastel-orange text-white p-6 rounded-lg text-center cursor-pointer hover:bg-blue-600">
            Registrations
          </div>
        </Link>
        {/* <Link href="/page5">
          <div className="bg-pastel-orange text-white p-6 rounded-lg text-center cursor-pointer hover:bg-blue-600">
            Incident Report
          </div>
        </Link> */}
        
      </div>
    </div>
  )
}