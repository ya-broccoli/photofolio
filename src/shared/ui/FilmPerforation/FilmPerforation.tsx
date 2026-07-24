type FilmPerforationProps = React.SVGProps<SVGSVGElement>

export const FilmPerforation = (props: FilmPerforationProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 17 10"
        fill="none"
        {...props}
    >
        <rect
            x="3.5"
            y="1"
            width="10"
            height="8"
            rx="0.25"
            fill="currentColor"
        />
    </svg>
)
