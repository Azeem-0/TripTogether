import AnimatedCursor from "react-animated-cursor";
function CustomCursor() {
    return (
        <AnimatedCursor
            innerSize={8}
            outerSize={35}
            innerScale={1}
            outerScale={2}
            outerAlpha={0}
            hasBlendMode={true}
            innerStyle={{
                backgroundColor: 'var(--cursor-color)'
            }}
            outerStyle={{
                border: '3px solid var(--cursor-color)'
            }}
        />
    )
}
export default CustomCursor