"use client"

import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  const [copied, setCopied] = useState()

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(""), 3000)
  }

  return (
    <div className="">
      <div className="">
        <div className="">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className=""
          />

          <div>
            <h3 className="">{post.creator.username}</h3>
            <p>{post.creator.email}</p>
          </div>
        </div>

        <div onClick={handleCopy}>
          <Image
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p>{post.prompt}</p>
      <p onClick={() => handleTagClick && handleTagClick(post.tag)}>{post.tag}</p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div>
          <p onClick={handleEdit}>Edit</p>
          <p onClick={handleDelete}>Delete</p>
        </div>
      )}
    </div>
  )
}

export default PromptCard