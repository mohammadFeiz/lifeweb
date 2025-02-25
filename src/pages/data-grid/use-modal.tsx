import { useState } from "react"

const useModal = () => {
    const [text, setText] = useState<string>('')
    const changeText = (text: string) => {
        setText(text)
    }
    const render = () => {
        return (
            <div className={`modal ${!!text ? 'visible' : 'hidden'}`} onClick={() => changeText('')}>
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={(e) => {
                            e.stopPropagation()
                            changeText('')
                        }}>&times;</span>
                    </div>
                    <div className="modal-body" onClick={(e) => e.stopPropagation()}>
                        <p dangerouslySetInnerHTML={{ __html: text }} />
                    </div>
                </div>
            </div>
        )
    }
    return { text, changeText, render }
}
export default useModal