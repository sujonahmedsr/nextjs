'use client'

import React, { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaUndo,
  FaRedo,
  FaQuoteRight,
  FaListUl,
  FaListOl,
  FaCode
} from 'react-icons/fa'
import { MdTitle } from 'react-icons/md'

const Tiptap = () => {
  const [html, setHtml] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Underline,
      Placeholder.configure({
        placeholder: 'Start writing your blog here...',
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: '<p>Hello World! 🌎️</p>',
    editorProps: {
      attributes: {
        class: 'min-h-[300px] p-4 focus:outline-none prose max-w-none',
      },
    },
    onUpdate({ editor }) {
      setHtml(editor.getHTML())
    },
  })

  if (!editor) return null

  const applyStyle = (styleFn) => {
    styleFn()
    editor.commands.focus()
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 border rounded shadow-sm bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b pb-2 mb-4">
        <button onClick={() => applyStyle(() => editor.chain().toggleBold().run())}><FaBold /></button>
        <button onClick={() => applyStyle(() => editor.chain().toggleItalic().run())}><FaItalic /></button>
        <button onClick={() => applyStyle(() => editor.chain().toggleUnderline().run())}><FaUnderline /></button>
        <button onClick={() => applyStyle(() => editor.chain().toggleStrike().run())}><FaStrikethrough /></button>

        {/* Headings */}
        <button onClick={() => applyStyle(() => editor.chain().toggleHeading({ level: 1 }).run())}>
          <MdTitle /> H1
        </button>
        <button onClick={() => applyStyle(() => editor.chain().toggleHeading({ level: 2 }).run())}>
          <MdTitle className="text-sm" /> H2
        </button>
        <button onClick={() => applyStyle(() => editor.chain().toggleHeading({ level: 3 }).run())}>
          <MdTitle className="text-xs" /> H3
        </button>

        <button onClick={() => applyStyle(() => editor.chain().toggleBulletList().run())}><FaListUl /></button>
        <button onClick={() => applyStyle(() => editor.chain().toggleOrderedList().run())}><FaListOl /></button>
        <button onClick={() => applyStyle(() => editor.chain().toggleBlockquote().run())}><FaQuoteRight /></button>
        <button onClick={() => applyStyle(() => editor.chain().toggleCodeBlock().run())}><FaCode /></button>
        <button onClick={() => applyStyle(() => editor.chain().undo().run())}><FaUndo /></button>
        <button onClick={() => applyStyle(() => editor.chain().redo().run())}><FaRedo /></button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="border rounded p-2 min-h-[200px]" />

      {/* Preview */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
        <div className="border bg-gray-50 rounded prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}

export default Tiptap
