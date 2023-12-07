"use client"

import Link from 'next/link'

export const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className=''>
      <h1 className=''>
        <span className=''>{type} Post</span>
      </h1>
      <p className=''>
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className=''
      >
        <label htmlFor="">
          <span className=''>Your AI prompt</span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your prompt here...'
            required
            className=''
          />
        </label>

        <label htmlFor="">
          <span className=''>
            Tag {` `}
            <span className=''>(#product, #webdevelopment, #idea) </span>
          </span>
          <textarea
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder='#tag'
            required
            className=''
          />
        </label>

        <div className=''>
          <Link href="/" className=''>Cancel</Link>
          <button type="submit" disabled={submitting} className=''>
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}
