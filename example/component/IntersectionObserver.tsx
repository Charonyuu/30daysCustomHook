import * as React from 'react'
import useGetComments from './useGetComments'

export default function IntersectionObserverExample() {
    const { loading, comments, intersectioningRef } = useGetComments()

    return (
        <div>
            {comments.map((data, index) => {
                if (comments.length - 1 === index) {
                    return (
                        <div ref={intersectioningRef}>
                            <p style={{ fontSize: '16px', fontWeight: 600 }}>現在的postId: {data.postId}</p>
                            <p style={{ fontSize: '14px', fontWeight: 500, color: 'blue' }}>我的Id: {data.id}</p>
                            <p style={{ fontSize: '14px', fontWeight: 500, color: 'blue' }}>我的name: {data.name}</p>
                            <p style={{ fontSize: '10px' }}>我的email: {data.email}</p>
                            <p style={{ fontSize: '8px' }}>我的body: {data.body}</p>
                            {loading ? <p style={{ fontSize: '30px', color: 'red' }}>loading...</p> : null}
                        </div>
                    )
                }
                return (
                    <div>
                        <p style={{ fontSize: '16px', fontWeight: 600 }}>現在的postId: {data.postId}</p>
                        <p style={{ fontSize: '14px', fontWeight: 500, color: 'blue' }}>我的Id: {data.id}</p>
                        <p style={{ fontSize: '14px', fontWeight: 500, color: 'blue' }}>我的name: {data.name}</p>
                        <p style={{ fontSize: '10px' }}>我的email: {data.email}</p>
                        <p style={{ fontSize: '8px' }}>我的body: {data.body}</p>
                    </div>
                )
            })}
        </div>
    )
}
