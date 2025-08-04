
import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [image, setImage] = useState(null)
  const [frame, setFrame] = useState('/frames/frame1.png')

  const frames = ['/frames/frame1.png', '/frames/frame2.png', '/frames/frame3.png']

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Image Frame Generator</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
      <div className="flex space-x-4 mb-6">
        {frames.map((f, idx) => (
          <button
            key={idx}
            onClick={() => setFrame(f)}
            className={\`border p-1 rounded \${frame === f ? 'border-blue-500' : 'border-gray-300'}\`}
          >
            <Image src={f} alt={\`Frame \${idx}\`} width={80} height={80} />
          </button>
        ))}
      </div>
      {image && (
        <div className="relative w-[300px] h-[300px]">
          <Image src={image} alt="Uploaded" layout="fill" objectFit="cover" className="rounded" />
          <Image src={frame} alt="Frame" layout="fill" objectFit="cover" className="absolute top-0 left-0 pointer-events-none" />
        </div>
      )}
    </main>
  )
}
