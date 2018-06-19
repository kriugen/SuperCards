import * as React from 'react'

type Props = {
    maxHeight: number,
    maxWidth: number,
    text?: string,
    onImageSelected: (el: HTMLInputElement) => void,
    image: string,
}

const ImageUpload = (props: Props) => { 
    
    const { maxWidth, 
            maxHeight, 
            text = 'Click here to select image', 
            onImageSelected, 
            image } = props

    var buttonStyle = {
        borderWidth: 2,
        borderColor: 'black',
        borderStyle: 'dashed',
        borderRadius: 4,
        height: maxHeight,
        width: maxWidth,
        position: 'relative' as 'relative', //see https://github.com/Microsoft/TypeScript/issues/11465
    }

    var inputStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
    }

    var imageStyle = {
        maxWidth,
        maxHeight,
        border: '1px dashed',
    }

    var fileInput = (style: Object) => <input style={style} id="file-input" type="file" 
                                    onChange={e => onImageSelected(e.target)}/>

    if (image && image.length > 0) {
        return (
            <div>
                <label htmlFor="file-input">
                    <img style={imageStyle} src={image}/>
                </label>
                {fileInput({display: 'none'})}
            </div>
        )
    }

    return (
        <div>
            <button style={buttonStyle}>
                {text}
                {fileInput(inputStyle)}
            </button>
        </div>
    )
}

export default ImageUpload