import React, { useEffect, useState } from 'react';

export default function ImagePortrait({ fileName, chemin }) {
    const [media, setMedia] = useState(null);

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await import(`../assets/${chemin}/${fileName}`);
                const mediaPath = response.default;
    
                // Vérifier si le fichier est une vidéo en fonction de l'extension du fichier
                const isVideo = /\.(mp4)$/i.test(mediaPath);
                const isImage = /\.(jpg|jpeg|png|gif)$/i.test(mediaPath);
    
                if (isVideo) {
                    setMedia({ type: 'video', src: mediaPath });
                } else if (isImage) {
                    setMedia({ type: 'image', src: mediaPath });
                }
            } catch (err) {
                console.error('Erreur lors du chargement du média :', err);
            }
        };
    
        fetchMedia();
    }, [fileName, chemin]);

    return (
        <>
            {media && (
                <>
                    {media.type === 'image' ? (
                        <img src={media.src} alt="" />
                    ) : (
                        <video controls>
                            <source src={media.src} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </>
            )}
        </>
    );
                    }