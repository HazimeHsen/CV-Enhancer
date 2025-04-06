import { CvEnhancer } from "@/components/cv-enhancer"

export default function EnhancerPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">CV Enhancer</h1>
          <p className="mt-2 text-xl text-gray-500">
            Upload your CV and job description to get a tailored CV and cover letter
          </p>
        </div>

        <CvEnhancer />
      </div>
    </main>
  )
}

