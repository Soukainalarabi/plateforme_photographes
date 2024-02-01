import { useEffect, useState } from 'react'

export default function ImagePortrait (fileName) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [image, setImage] = useState(true)

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await import(`../assets/photographersid/${fileName}`) // change relative path to suit your needs
                setImage(response.default)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchImage()
    }, [fileName])

    return {
        loading,
        error,
        image,
    }
}

