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
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import {
    FaAlignLeft,
    FaAlignCenter,
    FaAlignRight,
    FaAlignJustify,
    FaImage
} from 'react-icons/fa'

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
            Image,
            TextAlign.configure({
                types: ['heading', 'paragraph'], // jekhane alignment chaibe
            }),
        ],
        editorProps: {
            attributes: {
                class: 'min-h-[300px] focus:outline-none prose max-w-none ',
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
        <div className="grid grid-cols-2 items-start gap-5 mt-6 p-4 border rounded shadow-sm bg-white">
            <div>
                {/* Toolbar */}
                <div className="flex flex-wrap gap-4 pb-2">
                    <button onClick={() => applyStyle(() => editor.chain().toggleBold().run())}><FaBold /></button>
                    <button onClick={() => applyStyle(() => editor.chain().toggleItalic().run())}><FaItalic /></button>
                    <button onClick={() => applyStyle(() => editor.chain().toggleUnderline().run())}><FaUnderline /></button>
                    <button onClick={() => applyStyle(() => editor.chain().toggleStrike().run())}><FaStrikethrough /></button>

                    {/* Headings */}
                    <button onClick={() => applyStyle(() => editor.chain().toggleHeading({ level: 1 }).run())}>
                        <p /> H1
                    </button>
                    <button onClick={() => applyStyle(() => editor.chain().toggleHeading({ level: 2 }).run())}>
                        <p className="text-sm" /> H2
                    </button>
                    <button onClick={() => applyStyle(() => editor.chain().toggleHeading({ level: 3 }).run())}>
                        <p className="text-xs" /> H3
                    </button>

                    <button onClick={() => applyStyle(() => editor.chain().toggleBulletList().run())}><FaListUl /></button>
                    <button onClick={() => applyStyle(() => editor.chain().toggleOrderedList().run())}><FaListOl /></button>
                    <button onClick={() => applyStyle(() => editor.chain().toggleBlockquote().run())}><FaQuoteRight /></button>
                    <button onClick={() => applyStyle(() => editor.chain().toggleCodeBlock().run())}><FaCode /></button>
                    <button onClick={() => applyStyle(() => editor.chain().undo().run())}><FaUndo /></button>
                    <button onClick={() => applyStyle(() => editor.chain().redo().run())}><FaRedo /></button>
                    <button onClick={() => applyStyle(() => editor.chain().setTextAlign('left').run())}>
                        <FaAlignLeft />
                    </button>
                    <button onClick={() => applyStyle(() => editor.chain().setTextAlign('center').run())}>
                        <FaAlignCenter />
                    </button>
                    <button onClick={() => applyStyle(() => editor.chain().setTextAlign('right').run())}>
                        <FaAlignRight />
                    </button>
                    <button onClick={() => applyStyle(() => editor.chain().setTextAlign('justify').run())}>
                        <FaAlignJustify />
                    </button>
                    <button
                        onClick={() => {
                            const url = prompt('Enter image URL')
                            if (url) {
                                editor.chain().focus().setImage({ src: url }).run()
                            }
                        }}
                    >
                        <FaImage />
                    </button>
                </div>

                {/* Editor */}
                <EditorContent editor={editor} className="border rounded p-2 min-h-[200px] [&_img]:w-full [&_img]:h-[400px]" />
            </div>

            {/* Preview */}
            <div>
                <h3 className="text-lg font-semibold pb-1">Live Preview</h3>
                <div className="border bg-gray-50 rounded p-4 prose max-w-none [&_img]:w-full [&_img]:h-[400px]" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    )
}

export default Tiptap
