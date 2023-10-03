import * as React from 'react'
import { useUploadProgress } from '../../src'

export default function AxiosProgress() {
    const { progress, uploadFile } = useUploadProgress()
    const [file, setFile] = React.useState<File | null>(null)
    React.useEffect(() => {
        if (!file) return
        uploadFile(file)
    }, [file])

    return (
        <div>
            <input type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files![0])} />
            {progress}%
        </div>
    )
}
