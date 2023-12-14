import { useEffect, useRef, useState } from "react"
import formatDuration from "../utils/formatDuration"
import { formatTimeAgo } from "../utils/formatTimeAgo"

type VideoGridItemProps = {
    id: string
    title: string
    channel: {
        id: string
        name: string
        profileUrl: string
    }
    views: number
    postedAt: Date
    duration: number
    thumbnailUrl: string
    videoUrl: string
}

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
    notation: 'compact'
})


const VideoGridItem = ({ id, title, channel, views, postedAt, duration, thumbnailUrl, videoUrl }: VideoGridItemProps) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null)
    
    useEffect(() => {
        if(videoRef.current == null) return
        if(isVideoPlaying) {
            videoRef.current.currentTime = 0;
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }

    }, [isVideoPlaying])
    
    
    return (
        <div className='flex flex-col gap-2' 
            onMouseLeave={() => setIsVideoPlaying(false)} 
            onMouseEnter={() => setIsVideoPlaying(true)}>
            <a href={`/watch?v=${id}`} className='relative aspect-video'>
                <img src={thumbnailUrl} 
                    className={`block w-full h-full object-cover rounded-xl transition-[border-radius] duration-200 ${isVideoPlaying ? 'rounded-none' : 'rounded-x'}`} />
                <div className='absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-.5 rounded'>
                    {formatDuration(duration)}
                </div>
                <video className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${isVideoPlaying ? 'opacity-100 delay-200' : 'opacity-0'}`} ref={videoRef} muted playsInline src={videoUrl} />
            </a>
            <div className='flex gap2'>
                <a href={`/@${channel.id}`} className='flex-shrink-0'>
                    <img className='w-12 h-12 rounded-full' src={channel.profileUrl} alt="" />
                </a>
                <div className='flex flex-col'>
                    <a className='font-bold' href={`/watch?v=${id}`}>
                        {title}
                    </a>
                    <a href={`/@${channel.id}`} className='text-secondary-text text-sm'>
                        {channel.name}
                    </a>
                    <div className='text-secondary-text text-sm'>
                        {VIEW_FORMATTER.format(views)} Views · {formatTimeAgo(postedAt)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoGridItem